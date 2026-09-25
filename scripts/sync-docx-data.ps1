param(
  [string]$CatalogPath = "TALOS_CATALOGO_ITENS_POR_RARIDADE.docx"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-DocxXml {
  param([string]$Path)

  $resolved = Resolve-Path $Path
  $zip = [IO.Compression.ZipFile]::OpenRead($resolved)
  try {
    $entry = $zip.Entries | Where-Object { $_.FullName -eq "word/document.xml" }
    if (-not $entry) {
      throw "word/document.xml not found in $Path"
    }

    $reader = [IO.StreamReader]::new($entry.Open())
    try {
      [xml]$xml = $reader.ReadToEnd()
      return $xml
    }
    finally {
      $reader.Close()
    }
  }
  finally {
    $zip.Dispose()
  }
}

function Get-ParagraphText {
  param($Paragraph)

  return (($Paragraph.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.'#text' }) -join '').Trim()
}

function Get-CellText {
  param($Cell)

  $paragraphs = @(
    $Cell.SelectNodes('.//*[local-name()="p"]') |
      ForEach-Object { Get-ParagraphText $_ } |
      Where-Object { $_.Trim().Length -gt 0 }
  )

  if ($paragraphs.Count -gt 0) {
    return ($paragraphs -join "`n").Trim()
  }

  return (($Cell.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.'#text' }) -join '').Trim()
}

function Get-DocxParagraphs {
  param($Xml)

  return @(
    $Xml.SelectNodes('//*[local-name()="p"]') |
      ForEach-Object { Get-ParagraphText $_ } |
      Where-Object { $_.Trim().Length -gt 0 }
  )
}

function Get-TableRows {
  param($Table)

  return @(
    $Table.SelectNodes('./*[local-name()="tr"]') |
      ForEach-Object {
        [pscustomobject]@{
          cells = @(
          $_.SelectNodes('./*[local-name()="tc"]') |
            ForEach-Object { Get-CellText $_ }
          )
        }
      }
  )
}

function Get-Damage {
  param([string]$Stats)

  if ($Stats -match '(?i)Dano:\s*([^|\r\n]+)') {
    return $matches[1].Trim()
  }

  return ""
}

function Write-Json {
  param(
    [Parameter(Mandatory=$true)]$Value,
    [Parameter(Mandatory=$true)][string]$Path
  )

  $json = $Value | ConvertTo-Json -Depth 100
  [IO.File]::WriteAllText((Join-Path (Get-Location) $Path), $json, [Text.UTF8Encoding]::new($false))
}

$catalogXml = Read-DocxXml $CatalogPath
$catalogTables = @($catalogXml.SelectNodes('//*[local-name()="tbl"]'))

$itemTableMeta = @(
  @{ rarity = "Lixo"; category = "Arma" },
  @{ rarity = "Lixo"; category = "Equipamento" },
  @{ rarity = "Lixo"; category = "Consumível" },

  @{ rarity = "Comum"; category = "Arma" },
  @{ rarity = "Comum"; category = "Escudo" },
  @{ rarity = "Comum"; category = "Armadura" },
  @{ rarity = "Comum"; category = "Equipamento" },
  @{ rarity = "Comum"; category = "Consumível" },

  @{ rarity = "Raro"; category = "Arma" },
  @{ rarity = "Raro"; category = "Escudo" },
  @{ rarity = "Raro"; category = "Armadura" },
  @{ rarity = "Raro"; category = "Equipamento" },
  @{ rarity = "Raro"; category = "Consumível" },

  @{ rarity = "Épico"; category = "Arma" },
  @{ rarity = "Épico"; category = "Escudo" },
  @{ rarity = "Épico"; category = "Armadura" },
  @{ rarity = "Épico"; category = "Equipamento" },
  @{ rarity = "Épico"; category = "Consumível" },

  @{ rarity = "Lendário"; category = "Arma" },
  @{ rarity = "Lendário"; category = "Escudo" },
  @{ rarity = "Lendário"; category = "Armadura" },
  @{ rarity = "Lendário"; category = "Equipamento" },
  @{ rarity = "Lendário"; category = "Consumível" },

  @{ rarity = "Pacto"; category = "Arma" },
  @{ rarity = "Pacto"; category = "Armadura" },
  @{ rarity = "Pacto"; category = "Equipamento" },
  @{ rarity = "Pacto"; category = "Consumível" },

  @{ rarity = "Divino"; category = "Arma" },
  @{ rarity = "Divino"; category = "Escudo" },
  @{ rarity = "Divino"; category = "Armadura" },
  @{ rarity = "Divino"; category = "Equipamento" },
  @{ rarity = "Divino"; category = "Consumível" }
)

$items = New-Object System.Collections.Generic.List[object]
$normalTableStart = 1

for ($metaIndex = 0; $metaIndex -lt $itemTableMeta.Count; $metaIndex++) {
  $table = $catalogTables[$normalTableStart + $metaIndex]
    $rows = @(Get-TableRows $table)
  $meta = $itemTableMeta[$metaIndex]

  for ($rowIndex = 1; $rowIndex -lt $rows.Count; $rowIndex++) {
    $row = @($rows[$rowIndex].cells)
    if ($row.Count -lt 4) { continue }

    $name = $row[0].Trim()
    if (-not $name) { continue }

    $stats = $row[1].Trim()
    $cost = $row[2].Trim()
    $effect = $row[3].Trim()

    $items.Add([ordered]@{
      id = $items.Count
      name = $name
      category = $meta.category
      rarity = $meta.rarity
      cost = $cost
      damage = Get-Damage $stats
      stats = $stats
      desc = $effect
    })
  }
}

$setTable = $catalogTables[$catalogTables.Count - 1]
$setRows = @(Get-TableRows $setTable)
$itemSets = New-Object System.Collections.Generic.List[object]

for ($rowIndex = 1; $rowIndex -lt $setRows.Count; $rowIndex++) {
  $row = @($setRows[$rowIndex].cells)
  if ($row.Count -lt 3) { continue }

  $name = $row[0].Trim()
  if (-not $name) { continue }

  $junction = $row[1].Trim()
  $effect = $row[2].Trim()
  $components = @(
    $junction -split '\+' |
      ForEach-Object { $_.Trim() } |
      Where-Object { $_.Length -gt 0 }
  )

  $setRecord = [ordered]@{
    id = $itemSets.Count
    name = $name
    category = "Conjunto"
    rarity = "Conjunto"
    cost = ""
    damage = ""
    stats = $junction
    components = $components
    desc = $effect
  }

  $itemSets.Add($setRecord)
  $items.Add([ordered]@{
    id = $items.Count
    name = $name
    category = "Conjunto"
    rarity = "Conjunto"
    cost = ""
    damage = ""
    stats = $junction
    components = $components
    desc = $effect
  })
}

Write-Json $items "src/data/items_raw.json"
Write-Json $itemSets "src/data/item_sets_raw.json"

Write-Host "Updated src/data/items_raw.json ($($items.Count) catalog entries)"
Write-Host "Updated src/data/item_sets_raw.json ($($itemSets.Count) sets)"
Write-Host "Shikatas are not generated by this script. Run: python scripts/extract_shikatas_v6.py"
