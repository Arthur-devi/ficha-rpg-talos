// Tabelas de evolução canônicas do TALOS v6.
// Geradas diretamente de TALOS_SISTEMA_v6_COMPLETO.docx no Lote 07.
import { SHIKATA_EVOLUCOES_V6 } from './shikatas_v6.generated.js';

export const EVOLUCOES = SHIKATA_EVOLUCOES_V6;

export function getEvolucao(shikataId, nomeHabilidade) {
  return EVOLUCOES[shikataId]?.[nomeHabilidade] || null;
}
