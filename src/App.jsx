import { useRef, useState } from "react";
import {
  criarTabuleiro,
  obterDicaProximidade,
  TENTATIVAS,
} from "./logic/mapa";
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
import { ModalResultado } from "./components/ModalResultado/ModalResultado";
import { Rodape } from "./components/Rodape/Rodape";
import styles from "./App.module.css";

const MENSAGEM_INICIAL =
  "Clique nas casas para explorar o labirinto e seguir as dicas até o tesouro!";

export default function App() {
  const [jogador, setJogador] = useState("");
  const [casas, setCasas] = useState(criarTabuleiro);
  const [tentativas, setTentativas] = useState(TENTATIVAS);
  const [jogadas, setJogadas] = useState(0);
  const [mensagem, setMensagem] = useState(MENSAGEM_INICIAL);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [resultadoPartida, setResultadoPartida] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);
  const [destacarRanking, setDestacarRanking] = useState(false);
  const [historico, setHistorico] = useState(carregarHistorico);
  const rankingRef = useRef(null);

  function registrarPartida(resultado, tentativasRestantes) {
    const novoRegistro = {
      id: Date.now(),
      nome: jogador,
      tentativas: tentativasRestantes,
      maxTentativas: TENTATIVAS,
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

  function verPlacar() {
    setModalAberta(false);
    setDestacarRanking(true);

    requestAnimationFrame(() => {
      rankingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    window.setTimeout(() => {
      setDestacarRanking(false);
    }, 1800);
  }

  function lidarComClique(id) {
    if (fimDeJogo) return;

    const casaClicada = casas[id];
    if (casaClicada.revelada) return;

    const novasJogadas = jogadas + 1;
    setJogadas(novasJogadas);

    if (casaClicada.tipo === "tesouro") {
      const novasCasas = casas.map((casa) =>
        casa.id === id ? { ...casa, revelada: true } : casa,
      );
      setCasas(novasCasas);
      setMensagem(`🎉 Parabéns, ${jogador}! Você encontrou o tesouro!`);
      setFimDeJogo(true);
      setResultadoPartida("Vitória");
      setModalAberta(true);
      registrarPartida("Vitória", tentativas);
    } else if (casaClicada.tipo === "armadilha") {
      const novasTentativas = tentativas - 1;
      setTentativas(novasTentativas);

      if (novasTentativas === 0) {
        // Revela a armadilha clicada e mostra onde o tesouro estava escondido
        const novasCasas = casas.map((casa) =>
          casa.id === id || casa.tipo === "tesouro"
            ? { ...casa, revelada: true }
            : casa,
        );
        setCasas(novasCasas);
        setMensagem(
          `💀 Game Over, ${jogador}! Suas tentativas acabaram. O tesouro foi revelado no mapa.`,
        );
        setFimDeJogo(true);
        setResultadoPartida("Derrota");
        setModalAberta(true);
        registrarPartida("Derrota", 0);
      } else {
        const novasCasas = casas.map((casa) =>
          casa.id === id ? { ...casa, revelada: true } : casa,
        );
        setCasas(novasCasas);
        const textoTentativas =
          novasTentativas === 1 ? "tentativa" : "tentativas";
        setMensagem(
          `💥 Você caiu em uma armadilha! Restam ${novasTentativas} ${textoTentativas}.`,
        );
      }
    } else {
      const novasCasas = casas.map((casa) =>
        casa.id === id ? { ...casa, revelada: true } : casa,
      );
      setCasas(novasCasas);
      const dica = obterDicaProximidade(id, novasCasas);
      setMensagem(`✅ Caminho seguro! ${dica}`);
    }
  }

  function reiniciarJogo() {
    setCasas(criarTabuleiro());
    setTentativas(TENTATIVAS);
    setJogadas(0);
    setMensagem(MENSAGEM_INICIAL);
    setFimDeJogo(false);
    setResultadoPartida(null);
    setModalAberta(false);
  }

  return (
    <div className={styles.pagina}>
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
            <Tabuleiro
              casas={casas}
              fimDeJogo={fimDeJogo}
              aoClicarCasa={lidarComClique}
            />
          </>
        )}
        <Ranking
          ref={rankingRef}
          historico={historico}
          aoLimpar={limparHistorico}
          destaque={destacarRanking}
        />
      </main>

      {!jogador && <Rodape />}

      <ModalResultado
        aberto={modalAberta}
        resultado={resultadoPartida}
        jogador={jogador}
        tentativas={tentativas}
        jogadas={jogadas}
        aoIniciar={reiniciarJogo}
        aoVerPlacar={verPlacar}
        aoFechar={() => setModalAberta(false)}
      />
    </div>
  );
}