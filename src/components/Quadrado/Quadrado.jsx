// importacao do arquivo de estilos CSS para o componente Quadrado
import styles from "./Quadrado.module.css";

const ROTULOS_TIPO = {
  inicio: "Início",
  seguro: "Caminho seguro",
  armadilha: "Armadilha",
  tesouro: "Tesouro",
};

// funcao do componente Quadrado que recebe as propriedades casa, fimDeJogo e aoClicar
export function Quadrado({ casa, fimDeJogo, aoClicar }) {
  // funcao utilitaria para colocar icones de acordo com o tipo de casa
  function obterIcone() {
    if (!casa.revelada) return "";
    if (casa.tipo === "inicio") return "🚩";
    if (casa.tipo === "seguro") return "✅";
    if (casa.tipo === "armadilha") return "💣";
    if (casa.tipo === "tesouro") return "💎";
  }

  // classe CSS que sera aplicada ao quadrado com base no estado da casa (revelada ou nao)
  const classeEstado = casa.revelada ? styles[casa.tipo] : styles.oculta;
  const rotulo = casa.revelada ? ROTULOS_TIPO[casa.tipo] : "Casa oculta";

  return (
    <button
      className={`${styles.quadrado} ${classeEstado}`}
      onClick={() => aoClicar(casa.id)}
      disabled={casa.revelada || fimDeJogo}
      aria-label={rotulo}
    >
      {obterIcone()}
    </button>
  );
}
