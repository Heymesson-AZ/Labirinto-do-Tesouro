const CHAVE_STORAGE = "labirinto_do_tesouro_historico";

export function carregarHistorico() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function salvarHistorico(historico) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));
  } catch {
    // Ignora erros de armazenamento indisponível
  }
}

export function limparHistoricoStorage() {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
  } catch {
    // Ignora erros de armazenamento indisponível
  }
}
