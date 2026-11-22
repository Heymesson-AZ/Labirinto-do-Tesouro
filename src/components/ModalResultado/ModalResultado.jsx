import { useEffect } from "react";
import { TENTATIVAS } from "../../logic/mapa";
import styles from "./ModalResultado.module.css";

export function ModalResultado({
  aberto,
  resultado,
  jogador,
  tentativas,
  jogadas,
  aoIniciar,
  aoVerPlacar,
  aoFechar,
}) {
  useEffect(() => {
    if (!aberto) return;

    function lidarComTecla(evento) {
      if (evento.key === "Escape") {
        aoFechar();
      }
    }

    window.addEventListener("keydown", lidarComTecla);
    return () => window.removeEventListener("keydown", lidarComTecla);
  }, [aberto, aoFechar]);

  if (!aberto || !resultado) return null;

  const venceu = resultado === "Vitória";

  return (
    <div
      className={styles.overlay}
      onClick={aoFechar}
      role="presentation"
    >
      <div
        className={`${styles.modal} ${venceu ? styles.vitoria : styles.derrota}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-resultado-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button
          type="button"
          className={styles.botaoFechar}
          onClick={aoFechar}
          aria-label="Fechar janela de resultado"
        >
          ×
        </button>

        <div className={styles.iconeWrapper}>
          <span className={styles.icone} aria-hidden="true">
            {venceu ? "🏆" : "💀"}
          </span>
        </div>

        <span className={styles.etiqueta}>
          {venceu ? "Tesouro encontrado!" : "Fim de jogo"}
        </span>

        <h2 id="modal-resultado-titulo" className={styles.titulo}>
          {venceu ? `Parabéns, ${jogador}!` : `Não foi dessa vez, ${jogador}`}
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
            onClick={aoIniciar}
            autoFocus
          >
            ▶️ Iniciar nova partida
          </button>
          <button
            type="button"
            className={styles.botaoPlacar}
            onClick={aoVerPlacar}
          >
            🏆 Ver placar
          </button>
        </div>
      </div>
    </div>
  );
}
