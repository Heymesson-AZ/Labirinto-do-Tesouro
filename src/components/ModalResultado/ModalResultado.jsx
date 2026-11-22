import { useEffect, useState } from "react";
import { TENTATIVAS } from "../../logic/mapa";
import { Ranking } from "../Ranking/Ranking";
import styles from "./ModalResultado.module.css";

export function ModalResultado({
  aberto,
  resultado,
  jogador,
  tentativas,
  jogadas,
  historico,
  aoLimparHistorico,
  aoIniciar,
  aoFechar,
}) {
  const [mostrandoPlacar, setMostrandoPlacar] = useState(false);

  useEffect(() => {
    if (!aberto) return;

    function lidarComTecla(evento) {
      if (evento.key === "Escape") {
        setMostrandoPlacar(false);
        aoFechar();
      }
    }

    window.addEventListener("keydown", lidarComTecla);
    return () => window.removeEventListener("keydown", lidarComTecla);
  }, [aberto, aoFechar]);

  if (!aberto || !resultado) return null;

  const venceu = resultado === "Vitória";

  function lidarComFechar() {
    setMostrandoPlacar(false);
    aoFechar();
  }

  function lidarComIniciar() {
    setMostrandoPlacar(false);
    aoIniciar();
  }

  return (
    <div
      className={styles.overlay}
      onClick={lidarComFechar}
      role="presentation"
    >
      <div
        className={`${styles.modal} ${venceu ? styles.vitoria : styles.derrota} ${mostrandoPlacar ? styles.modalLargo : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-resultado-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button
          type="button"
          className={styles.botaoFechar}
          onClick={lidarComFechar}
          aria-label="Fechar janela de resultado"
        >
          ×
        </button>

        {mostrandoPlacar ? (
          <div className={styles.visaoPlacar}>
            <h2 id="modal-resultado-titulo" className={styles.tituloPlacar}>
              Placar Geral
            </h2>
            <Ranking
              historico={historico}
              aoLimpar={aoLimparHistorico}
              embutido
            />
            <div className={styles.acoesPlacar}>
              <button
                type="button"
                className={styles.botaoPlacar}
                onClick={() => setMostrandoPlacar(false)}
              >
                ← Voltar ao resultado
              </button>
              <button
                type="button"
                className={styles.botaoIniciar}
                onClick={lidarComIniciar}
              >
                ▶️ Iniciar nova partida
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.iconeWrapper}>
              <span className={styles.icone} aria-hidden="true">
                {venceu ? "🏆" : "💀"}
              </span>
            </div>

            <span className={styles.etiqueta}>
              {venceu ? "Tesouro encontrado!" : "Fim de jogo"}
            </span>

            <h2 id="modal-resultado-titulo" className={styles.titulo}>
              {venceu
                ? `Parabéns, ${jogador}!`
                : `Não foi dessa vez, ${jogador}`}
            </h2>

            <p className={styles.descricao}>
              {venceu
                ? "Você seguiu as pistas com maestria e encontrou o tesouro escondido no labirinto."
                : "Suas tentativas acabaram, mas revelamos onde o tesouro estava escondido no mapa."}
            </p>

            <div className={styles.estatisticas}>
              <div className={styles.cardStat}>
                <span className={styles.statRotulo}>Tentativas restantes</span>
                <strong className={styles.statValor}>
                  ❤️ {tentativas}/{TENTATIVAS}
                </strong>
              </div>
              <div className={styles.cardStat}>
                <span className={styles.statRotulo}>Casas exploradas</span>
                <strong className={styles.statValor}>🧭 {jogadas}</strong>
              </div>
            </div>

            <div className={styles.acoes}>
              <button
                type="button"
                className={styles.botaoIniciar}
                onClick={lidarComIniciar}
                autoFocus
              >
                ▶️ Iniciar nova partida
              </button>
              <button
                type="button"
                className={styles.botaoPlacar}
                onClick={() => setMostrandoPlacar(true)}
              >
                🏆 Ver placar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
