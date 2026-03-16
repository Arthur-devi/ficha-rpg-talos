import { useState, useCallback } from 'react';

const defaultCharacter = {
  // Identity
  name: '',
  player: '',
  nivel: 1,
  origem: '',
  shikata: '',
  subclasse: '',
  profissao: '',
  tendencia: '',
  deus: '',

  // Backstory
  tracos: '',
  ideais: '',
  vinculos: '',
  defeitos: '',
  vicios: '',

  // Attributes (base values set by player)
  attrs: {
    forca: 0,
    magia: 0,
    constituicao: 0,
    inteligencia: 0,
    percepcao: 0,
    destreza: 0,
    carisma: 0,
    defesa: 0,
    sorte: 0,
  },

  // HP
  hpMax: 12,
  hpAtual: 12,
  hpTemp: 0,

  // Mana
  manaMax: 0,
  manaAtual: 0,

  // CA
  caBase: 8,
  caBonus: 0,

  // Other derived
  deslocamento: 2,
  limiteCansaco: 4,
  cansacoAtual: 0,
  xp: 0,
  inspiracao: 0,

  // Perícias
  pericias: [],

  // Inventory
  inventario: [], // { itemId, qty, equipped, slot, notes }
  equippedSlots: {}, // slot -> itemId

  // Active states
  estados: [],

  // Notes
  notas: '',
  moedas: { pc: 0, pp: 0, po: 0, pd: 0 },
};

export function useCharacter() {
  const [char, setChar] = useState(() => {
    try {
      const saved = localStorage.getItem('talos_char_draft');
      if (saved) return { ...defaultCharacter, ...JSON.parse(saved) };
    } catch {}
    return defaultCharacter;
  });

  const update = useCallback((path, value) => {
    setChar(prev => {
      const next = deepSet({ ...prev }, path, value);
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const updateAttr = useCallback((attr, value) => {
    setChar(prev => {
      const next = { ...prev, attrs: { ...prev.attrs, [attr]: Number(value) || 0 } };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const exportChar = useCallback(() => {
    const blob = new Blob([JSON.stringify(char, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name || 'personagem'}-talos.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [char]);

  const importChar = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const merged = { ...defaultCharacter, ...data };
        setChar(merged);
        localStorage.setItem('talos_char_draft', JSON.stringify(merged));
      } catch {
        alert('Arquivo inválido. Certifique-se de importar um arquivo de personagem TALOS.');
      }
    };
    reader.readAsText(file);
  }, []);

  const addInventoryItem = useCallback((item) => {
    setChar(prev => {
      const exists = prev.inventario.find(i => i.itemId === item.id);
      let newInv;
      if (exists) {
        newInv = prev.inventario.map(i => i.itemId === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        newInv = [...prev.inventario, { itemId: item.id, qty: 1, equipped: false, slot: null, notes: '' }];
      }
      const next = { ...prev, inventario: newInv };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const removeInventoryItem = useCallback((itemId) => {
    setChar(prev => {
      const next = { ...prev, inventario: prev.inventario.filter(i => i.itemId !== itemId) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const equipItem = useCallback((itemId, slot) => {
    setChar(prev => {
      const newSlots = { ...prev.equippedSlots };
      // Unequip from previous slot if any
      Object.keys(newSlots).forEach(s => { if (newSlots[s] === itemId) delete newSlots[s]; });
      if (slot) newSlots[slot] = itemId;
      const newInv = prev.inventario.map(i =>
        i.itemId === itemId ? { ...i, equipped: !!slot, slot } : i
      );
      const next = { ...prev, equippedSlots: newSlots, inventario: newInv };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleEstado = useCallback((estadoId) => {
    setChar(prev => {
      const has = prev.estados.includes(estadoId);
      const next = { ...prev, estados: has ? prev.estados.filter(e => e !== estadoId) : [...prev.estados, estadoId] };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const togglePericia = useCallback((pericia) => {
    setChar(prev => {
      const has = prev.pericias.includes(pericia);
      const next = { ...prev, pericias: has ? prev.pericias.filter(p => p !== pericia) : [...prev.pericias, pericia] };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Derived stats
  const getMod = (attrVal) => Math.floor(attrVal / 2);

  // Total magia = base + INT÷2 (conversão automática do sistema)
  const magiaFromInt = Math.floor(char.attrs.inteligencia / 2);
  const magiaTotal = char.attrs.magia + magiaFromInt;

  const derived = {
    modForca: getMod(char.attrs.forca),
    modMagia: getMod(magiaTotal),   // modificador usa magia total (com bônus INT)
    modCon: getMod(char.attrs.constituicao),
    modInt: getMod(char.attrs.inteligencia),
    modPer: getMod(char.attrs.percepcao),
    modDes: getMod(char.attrs.destreza),
    modCar: getMod(char.attrs.carisma),
    modDef: getMod(char.attrs.defesa),
    modSor: getMod(char.attrs.sorte),
    // Int -> Magia bonus: 2 INT = 1 Magia
    magiaFromInt,
    magiaTotal,
    // Destreza -> Deslocamento: 5 DES = +1
    deslocamentoBonus: Math.floor(char.attrs.destreza / 5),
    // CON -> Limite Cansaço: 2 CON = +1
    limiteCansacoBonus: Math.floor(char.attrs.constituicao / 2),
    // CA = 8 + mod DES (limit 4) + mod CON (limit 4)
    caTotal: 8 + Math.min(getMod(char.attrs.destreza), 4) + Math.min(getMod(char.attrs.constituicao), 4) + char.caBonus,
    // HP base = 12 + mod CON
    hpBase: 12 + getMod(char.attrs.constituicao),
    // Mana = magia total (base + INT÷2)
    manaBase: magiaTotal,
  };

  return { char, update, updateAttr, exportChar, importChar, addInventoryItem, removeInventoryItem, equipItem, toggleEstado, togglePericia, derived };
}

function deepSet(obj, path, value) {
  if (typeof path === 'string') {
    const parts = path.split('.');
    if (parts.length === 1) return { ...obj, [path]: value };
    const [head, ...rest] = parts;
    return { ...obj, [head]: deepSet(obj[head] || {}, rest.join('.'), value) };
  }
  return obj;
}