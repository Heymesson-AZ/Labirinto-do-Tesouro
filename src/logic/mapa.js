// Mapa do jogo

// Variáveis globais que serão exportadas para outros módulos
export const TAMANHOMAPA = 8;
export const TENTATIVAS = 10;

const INICIO = 0; // Canto superior esquerdo
const PROPORCAO_SEGURAS = 0.7; // 70% das casas restantes são seguras (~30% armadilhas)

// Embaralha uma lista de forma uniforme (algoritmo Fisher-Yates)
function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// Calcula a distância (em passos no grid) entre duas casas para dar dicas de proximidade
export function calcularDistancia(idOrigem, idDestino) {
  const linhaOrigem = Math.floor(idOrigem / TAMANHOMAPA);
  const colunaOrigem = idOrigem % TAMANHOMAPA;
  const linhaDestino = Math.floor(idDestino / TAMANHOMAPA);
  const colunaDestino = idDestino % TAMANHOMAPA;

  return (
    Math.abs(linhaOrigem - linhaDestino) +
    Math.abs(colunaOrigem - colunaDestino)
  );
}

// Retorna uma dica de "quente ou frio" conforme a proximidade do tesouro
export function obterDicaProximidade(idCasa, casas) {
  const casaTesouro = casas.find((casa) => casa.tipo === "tesouro");
  if (!casaTesouro) return "";

  const distancia = calcularDistancia(idCasa, casaTesouro.id);

  if (distancia <= 2) {
    return "🔥 Muito quente! O tesouro está bem perto!";
  }
  if (distancia <= 4) {
    return "🌡️ Quente! Você está se aproximando do tesouro.";
  }
  if (distancia <= 6) {
    return "🧭 Morno... continue explorando pela região.";
  }
  return "❄️ Frio! O tesouro está mais longe daqui.";
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

  // 1 posição para o tesouro, 70% das demais para caminhos seguros e o restante para armadilhas
  const posicaoTesouro = posicoesEmbaralhadas[0];
  const quantidadeSeguras = Math.floor(
    (posicoesEmbaralhadas.length - 1) * PROPORCAO_SEGURAS,
  );
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
