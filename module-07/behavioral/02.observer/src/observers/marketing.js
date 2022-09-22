export default class Marketing {
  update({ id, username }) {
    console.log(`[${id}] - [marketing] welcome [${username}]!`);
  }
}

/**
 * Update eh responsavel por gerenciar suas proprias execptions
 * Nao deve ter await no notify por que a responsabilidade do notify eh so emitir eventos
 * Soh notificar todo mundo
 */
