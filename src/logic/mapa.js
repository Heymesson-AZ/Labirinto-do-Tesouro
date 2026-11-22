// Mapa do jogo

// Variáveis globais que serão exportadas para outros módulos
export const TAMANHOMAPA = 8;
export const TENTATIVAS = 5;

const INICIO = 0; // Canto superior esquerdo

// Embaralha uma lista de forma uniforme (algoritmo Fisher-Yates)
function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// Função para criar o tabuleiro com posições embaralhadas dentro do tamanho definido
export function criarTabuleiro() {
  const totalCasas = TAMANHOMAPA * TAMANHOMAPA;

  // Garante que todas as posições fiquem entre 1 e totalCasas - 1 (0 é o início)
  const posicoesDisponiveis = [];
  for (let i = 1; i < totalCasas; i++) {
    posicoesDisponiveis.push(i);
  }

  const posicoesEmbaralhadas = embaralhar(posicoesDisponiveis);

  // 1 posição para o tesouro, ~45% das demais para acertos (seguro) e o resto para erros (armadilha)
  const posicaoTesouro = posicoesEmbaralhadas[0];
  const quantidadeSeguras = Math.floor((posicoesEmbaralhadas.length - 1) * 0.45);
  const posicoesSeguras = new Set(
    posicoesEmbaralhadas.slice(1, 1 + quantidadeSeguras),
  );

  const casas = [];
  for (let i = 0; i < totalCasas; i++) {
    let tipo = "armadilha";

    if (i === INICIO) {
      tipo = "inicio";
    } else if (i === posicaoTesouro) {
      tipo = "tesouro";
    } else if (posicoesSeguras.has(i)) {
      tipo = "seguro";
    }

    casas.push({
      id: i,
      tipo,
      revelada: i === INICIO, // Só o inicial é revelado no início do jogo
    });
  }

  return casas;
}
