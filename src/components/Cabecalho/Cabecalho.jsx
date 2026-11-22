import styles from './Cabecalho.module.css';

export function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <h1 className={styles.titulo}>🗺️ Labirinto do Tesouro</h1>
      <p className={styles.instrucao}>
        Descubra o caminho seguro até o tesouro desviando das armadilhas antes que suas tentativas acabem.
      </p>
    </header>
  );
}