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
- **Tabuleiro dinâmico e embaralhado:** grade configurável via `TAMANHOMAPA` (atualmente `8×8`), com embaralhamento uniforme (algoritmo Fisher-Yates) das posições do tesouro, das casas seguras e das armadilhas a cada nova partida.
- **Regras e feedback em tempo real:** contador de tentativas restantes (`5` por partida), mensagens de status a cada jogada e detecção automática de vitória ou Game Over.
- **Reinício rápido:** botão **Reiniciar** que gera um novo tabuleiro embaralhado mantendo o jogador atual.
- **Placar de jogadores (`Ranking`):** salva automaticamente cada partida no `localStorage` com nome do jogador, tentativas restantes e resultado (**Vitória** ou **Derrota**), ordenado por melhor desempenho e com botão para limpar o histórico.
- **Interface centralizada e responsiva:** layout escuro com largura alinhada entre cabeçalho, controles, tabuleiro e placar, adaptando o tamanho dos quadrados automaticamente ao número de colunas.

## Como jogar

1. Digite seu nome e clique em **Começar**.
2. A casa inicial (`🚩`) começa revelada no canto superior esquerdo.
3. Clique nas casas ocultas para descobrir o que há escondido:
   - `✅` **Caminho seguro:** você continua explorando sem perder tentativas.
   - `💣` **Armadilha:** você perde `1` tentativa. Se chegar a `0`, é **Game Over**.
   - `💎` **Tesouro:** você vence a partida e seu resultado é salvo no **Placar de Jogadores**.

## Estrutura do projeto

```text
src/
├── components/
│   ├── Cabecalho/          # Título e instruções do jogo
│   ├── FormularioJogador/  # Entrada do nome do jogador
│   ├── Placar/             # Jogador atual, tentativas, reiniciar e mensagem
│   ├── Quadrado/           # Célula individual do tabuleiro
│   ├── Ranking/            # Placar geral com histórico de partidas
│   └── Tabuleiro/          # Grade dinâmica de quadrados
├── logic/
│   ├── mapa.js             # Configuração do mapa e embaralhamento do tabuleiro
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
