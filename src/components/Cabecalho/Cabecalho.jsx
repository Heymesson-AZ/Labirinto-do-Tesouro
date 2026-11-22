import styles from './Cabecalho.module.css';

export function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <h1 className={styles.titulo}>🗺️ Labirinto do Tesouro</h1>
      <p className={styles.instrucao}>
        Siga as dicas de proximidade para descobrir o caminho até o tesouro, desviando das armadilhas antes que suas tentativas acabem.
      </p>
    </header>
  );
}