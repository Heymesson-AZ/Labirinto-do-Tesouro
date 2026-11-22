import { useState } from "react";
import { criarTabuleiro, TENTATIVAS } from "./logic/mapa";
import {
  carregarHistorico,
  salvarHistorico,
  limparHistoricoStorage,
} from "./logic/ranking";
import { Cabecalho } from "./components/Cabecalho/Cabecalho";
import { FormularioJogador } from "./components/FormularioJogador/FormularioJogador";
import { Placar } from "./components/Placar/Placar";
import { Tabuleiro } from "./components/Tabuleiro/Tabuleiro";
import { Ranking } from "./components/Ranking/Ranking";
import styles from "./App.module.css";

const MENSAGEM_INICIAL =
  "Clique nas casas para encontrar o caminho até o tesouro!";

export default function App() {
  const [jogador, setJogador] = useState("");
  const [casas, setCasas] = useState(criarTabuleiro);
  const [tentativas, setTentativas] = useState(TENTATIVAS);
  const [mensagem, setMensagem] = useState(MENSAGEM_INICIAL);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [historico, setHistorico] = useState(carregarHistorico);

  function registrarPartida(resultado, tentativasRestantes) {
    const novoRegistro = {
      id: Date.now(),
      nome: jogador,
      tentativas: tentativasRestantes,
      resultado,
    };

    setHistorico((anterior) => {
      const atualizado = [novoRegistro, ...anterior];
      salvarHistorico(atualizado);
      return atualizado;
    });
  }

  function iniciarJogo(nomeJogador) {
    setJogador(nomeJogador);
    reiniciarJogo();
  }

  function trocarJogador() {
    setJogador("");
    reiniciarJogo();
  }

  function limparHistorico() {
    setHistorico([]);
    limparHistoricoStorage();
  }

  function lidarComClique(id) {
    if (fimDeJogo) return;

    const casaClicada = casas[id];
    if (casaClicada.revelada) return;

    const novasCasas = casas.map((casa) =>
      casa.id === id ? { ...casa, revelada: true } : casa,
    );
    setCasas(novasCasas);

    if (casaClicada.tipo === "tesouro") {
      setMensagem(`🎉 Parabéns, ${jogador}! Você encontrou o tesouro!`);
      setFimDeJogo(true);
      registrarPartida("Vitória", tentativas);
    } else if (casaClicada.tipo === "armadilha") {
      const novasTentativas = tentativas - 1;
      setTentativas(novasTentativas);

      if (novasTentativas === 0) {
        setMensagem(`💀 Game Over, ${jogador}! Suas tentativas acabaram.`);
        setFimDeJogo(true);
        registrarPartida("Derrota", 0);
      } else {
        setMensagem("💥 Você caiu em uma armadilha! Tente outra casa.");
      }
    } else {
      setMensagem("✅ Caminho seguro! Continue explorando.");
    }
  }

  function reiniciarJogo() {
    setCasas(criarTabuleiro());
    setTentativas(TENTATIVAS);
    setMensagem(MENSAGEM_INICIAL);
    setFimDeJogo(false);
  }

  return (
    <main className={styles.container}>
      <Cabecalho />
      {!jogador ? (
        <FormularioJogador aoIniciar={iniciarJogo} />
      ) : (
        <>
          <Placar
            jogador={jogador}
            tentativas={tentativas}
            mensagem={mensagem}
            aoReiniciar={reiniciarJogo}
            aoTrocarJogador={trocarJogador}
          />
          <Tabuleiro casas={casas} aoClicarCasa={lidarComClique} />
        </>
      )}
      <Ranking historico={historico} aoLimpar={limparHistorico} />
    </main>
  );
}