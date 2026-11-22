import { TAMANHOMAPA } from '../../logic/mapa';
import { Quadrado } from '../Quadrado/Quadrado';
import styles from './Tabuleiro.module.css';

export function Tabuleiro({ casas, aoClicarCasa }) {
  return (
    <div
      className={styles.tabuleiro}
      style={{ '--colunas': TAMANHOMAPA }}
    >
      {casas.map((casa) => (
        <Quadrado key={casa.id} casa={casa} aoClicar={aoClicarCasa} />
      ))}
    </div>
  );
}
