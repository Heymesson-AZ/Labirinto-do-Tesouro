import styles from "./Placar.module.css";

export function Placar({
  jogador,
  tentativas,
  mensagem,
  aoReiniciar,
  aoTrocarJogador,
}) {
  return (
    <section className={styles.placar}>
      <div className={styles.linhaJogador}>
        <span className={styles.jogador}>
          👤 Jogador: <strong>{jogador}</strong>
        </span>
        <button className={styles.botaoTrocar} onClick={aoTrocarJogador}>
          Trocar jogador
        </button>
      </div>
      <div className={styles.topo}>
        <span className={styles.tentativas}>
          ❤️ Tentativas: <strong>{tentativas}</strong>
        </span>
        <button className={styles.botaoReiniciar} onClick={aoReiniciar}>
          🔄 Reiniciar
        </button>
      </div>
      <p className={styles.mensagem}>{mensagem}</p>
    </section>
  );
}
