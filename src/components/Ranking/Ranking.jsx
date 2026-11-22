import { TENTATIVAS } from "../../logic/mapa";
import styles from "./Ranking.module.css";

export function Ranking({ historico, aoLimpar, destaque = false, ref }) {
  // Ordena vitórias primeiro (com mais tentativas restantes no topo) e derrotas abaixo
  const ordenado = [...historico].sort((a, b) => {
    if (a.resultado !== b.resultado) {
      return a.resultado === "Vitória" ? -1 : 1;
    }
    if (b.tentativas !== a.tentativas) {
      return b.tentativas - a.tentativas;
    }
    return b.id - a.id;
  });

  return (
    <section
      ref={ref}
      className={`${styles.ranking} ${destaque ? styles.destaque : ""}`}
    >
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>🏆 Placar de Jogadores</h2>
        {historico.length > 0 && (
          <button className={styles.botaoLimpar} onClick={aoLimpar}>
            Limpar
          </button>
        )}
      </div>

      {ordenado.length === 0 ? (
        <p className={styles.vazio}>Nenhuma partida registrada ainda.</p>
      ) : (
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Jogador</th>
              <th>Tentativas</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {ordenado.map((registro) => (
              <tr key={registro.id}>
                <td className={styles.nome}>{registro.nome}</td>
                <td>
                  ❤️ {registro.tentativas}/{registro.maxTentativas ?? TENTATIVAS}
                </td>
                <td>
                  <span
                    className={
                      registro.resultado === "Vitória"
                        ? styles.vitoria
                        : styles.derrota
                    }
                  >
                    {registro.resultado === "Vitória"
                      ? "🏆 Vitória"
                      : "💀 Derrota"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
