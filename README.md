# 🗺️ Labirinto do Tesouro

## Objetivo

O **Labirinto do Tesouro** é um jogo de tabuleiro interativo feito com React onde o jogador precisa explorar uma grade oculta, encontrar o tesouro (`💎`) e evitar armadilhas (`💣`) antes que suas tentativas acabem.

## Tecnologias

- React 19
- JavaScript (ES Modules)
- HTML5
- CSS Modules
- Vite
- Web Storage API (`localStorage`)

## Funcionalidades

- **Identificação do jogador:** formulário inicial para informar o nome antes de jogar e opção de **Trocar jogador** a qualquer momento.
- **Tabuleiro dinâmico e embaralhado:** grade configurável via `TAMANHOMAPA` (atualmente `8×8`), com embaralhamento uniforme (algoritmo Fisher-Yates) de `1` tesouro, `70%` de casas seguras e `~30%` de armadilhas a cada nova partida.
- **Regras, dicas e feedback em tempo real:** contador de tentativas restantes (`10` por partida), dicas de proximidade (*muito quente*, *quente*, *morno* e *frio*) ao encontrar caminhos seguros, revelação do tesouro em caso de Game Over e detecção automática de vitória ou derrota.
- **Reinício rápido:** botão **Reiniciar** que gera um novo tabuleiro embaralhado mantendo o jogador atual.
- **Placar de jogadores (`Ranking`):** salva automaticamente cada partida no `localStorage` com nome do jogador, tentativas restantes e resultado (**Vitória** ou **Derrota**), ordenado por melhor desempenho e com botão para limpar o histórico.
- **Modal interativa de fim de partida:** ao vencer ou sofrer Game Over, exibe o resultado com estatísticas da partida e ações rápidas para **Iniciar nova partida** ou **Ver placar**.
- **Rodapé institucional de página web:** visível na tela inicial (oculto durante a partida), com apresentação do projeto, tecnologias utilizadas, créditos do desenvolvedor e link direto para o repositório no GitHub.
- **Interface centralizada e responsiva:** layout escuro com largura alinhada entre cabeçalho, controles, tabuleiro, placar e rodapé, adaptando o tamanho dos quadrados automaticamente ao número de colunas.

## Como jogar

1. Digite seu nome e clique em **Começar**.
2. A casa inicial (`🚩`) começa revelada no canto superior esquerdo.
3. Clique nas casas ocultas para descobrir o que há escondido:
   - `✅` **Caminho seguro:** você continua explorando sem perder tentativas e recebe uma dica de proximidade do tesouro (`🔥`, `🌡️`, `🧭` ou `❄️`).
   - `💣` **Armadilha:** você perde `1` tentativa. Se chegar a `0`, é **Game Over** e o tesouro é revelado no mapa.
   - `💎` **Tesouro:** você vence a partida e seu resultado é salvo no **Placar de Jogadores**.

## Estrutura do projeto

```text
src/
├── components/
│   ├── Cabecalho/          # Título e instruções do jogo
│   ├── FormularioJogador/  # Entrada do nome do jogador
│   ├── ModalResultado/     # Modal interativa com resultado e ações ao fim do jogo
│   ├── Placar/             # Jogador atual, tentativas, reiniciar e mensagem
│   ├── Quadrado/           # Célula individual do tabuleiro
│   ├── Ranking/            # Placar geral com histórico de partidas
│   ├── Rodape/             # Apresentação do projeto, desenvolvedor e link do GitHub
│   └── Tabuleiro/          # Grade dinâmica de quadrados
├── logic/
│   ├── mapa.js             # Configuração do mapa, embaralhamento e dicas de proximidade
│   └── ranking.js          # Leitura e salvamento do histórico no localStorage
├── App.jsx                 # Estado principal e regras do jogo
├── App.module.css          # Layout principal centralizado
├── index.css               # Estilos globais
└── main.jsx                # Ponto de entrada da aplicação
```

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/Heymesson-AZ/Labirinto-do-Tesouro.git
   cd Labirinto-do-Tesouro
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Para gerar a versão de produção:

   ```bash
   npm run build
   ```
