param(
  [string]$CatalogPath = "TALOS_CATALOGO_ITENS_POR_RARIDADE.docx",
  [string]$SystemPath = "TALOS_SISTEMA_v6_COMPLETO (1).docx"
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

$systemXml = Read-DocxXml $SystemPath
$paragraphs = @(Get-DocxParagraphs $systemXml)

function Find-ParagraphIndex {
  param(
    [string]$Pattern,
    [int]$Start = 0
  )

  for ($i = $Start; $i -lt $paragraphs.Count; $i++) {
    if ($paragraphs[$i] -match $Pattern) {
      return $i
    }
  }

  return -1
}

function Get-ParagraphSlice {
  param(
    [int]$Start,
    [int]$End
  )

  if ($Start -lt 0 -or $End -lt $Start) {
    return @()
  }

  return @($paragraphs[$Start..$End])
}

$mechanicsStart = Find-ParagraphIndex '^MECÂNICAS DO SISTEMA$'
$originsStart = Find-ParagraphIndex '^ORIGENS$'
$evolutionStart = Find-ParagraphIndex '^Evolução e Multiclasse$'
$shikataIntroStart = Find-ParagraphIndex '^Shikata$' $evolutionStart
$firstShikataStart = Find-ParagraphIndex '^SHIKATA DO ' $shikataIntroStart

$shikataIdMap = @{
  "GUERREIRO" = "guerreiro"
  "LADINO" = "ladino"
  "INCLEMENTE" = "inclemente"
  "CAÇADOR" = "cacador"
  "VANGUARDA" = "vanguarda"
  "MONGE" = "monge"
  "NECROMANTE" = "necromante"
  "MAGO" = "mago"
  "FEITICEIRO" = "feiticeiro"
  "BARDO" = "bardo"
  "PALADINO" = "paladino"
  "ESPADACHIM" = "espadachim"
  "CEIFEIRO" = "ceifeiro"
  "BRUXO" = "bruxo"
  "FULGOR" = "fulgor"
  "SENTINELA" = "sentinela"
  "SPELLSTEALER" = "spellstealer"
  "HEMOMANTE" = "hemomante"
  "LANCEIRO" = "lanceiro"
  "MANIPULADOR DE ESSÊNCIA" = "manipulador-essencia"
  "INVOCADOR FUNÉREO" = "invocador-funereo"
}

$excludedShikatas = @("DEVASTADOR " + "PACTUAL")

$shikataStarts = New-Object System.Collections.Generic.List[int]
for ($i = 0; $i -lt $paragraphs.Count; $i++) {
  if ($paragraphs[$i] -match '^SHIKATA DO ') {
    $shikataStarts.Add($i)
  }
}

$shikatas = New-Object System.Collections.Generic.List[object]
for ($i = 0; $i -lt $shikataStarts.Count; $i++) {
  $start = $shikataStarts[$i]
  $end = if ($i + 1 -lt $shikataStarts.Count) { $shikataStarts[$i + 1] - 1 } else { $paragraphs.Count - 1 }
  $rawName = ($paragraphs[$start] -replace '^SHIKATA DO ', '').Trim()
  if ($excludedShikatas -contains $rawName) {
    continue
  }

  $id = $shikataIdMap[$rawName]
  if (-not $id) {
    $slug = $rawName.ToLowerInvariant()
    $slug = $slug -replace "\s+", "-"
    $slug = $slug -replace "[^a-z0-9-]", ""
    $id = $slug
  }

  $summary = ""
  if ($start + 1 -le $end) { $summary = $paragraphs[$start + 1] }

  $shikatas.Add([ordered]@{
    id = $id
    name = (Get-Culture).TextInfo.ToTitleCase($rawName.ToLowerInvariant())
    title = $paragraphs[$start]
    summary = $summary
    content = Get-ParagraphSlice $start $end
  })
}

$reference = [ordered]@{
  sourceDocuments = @(
    $SystemPath,
    $CatalogPath
  )
  counts = [ordered]@{
    normalItems = $items.Count - $itemSets.Count
    itemSets = $itemSets.Count
    catalogEntries = $items.Count
    shikatas = $shikatas.Count
  }
  mechanics = Get-ParagraphSlice $mechanicsStart ($originsStart - 1)
  origins = Get-ParagraphSlice $originsStart ($evolutionStart - 1)
  evolution = Get-ParagraphSlice $evolutionStart ($firstShikataStart - 1)
  shikatas = $shikatas
}

Write-Json $reference "src/data/talos_reference.json"

Write-Host "Updated src/data/items_raw.json ($($items.Count) catalog entries)"
Write-Host "Updated src/data/item_sets_raw.json ($($itemSets.Count) sets)"
Write-Host "Updated src/data/talos_reference.json ($($shikatas.Count) shikata sections)"
