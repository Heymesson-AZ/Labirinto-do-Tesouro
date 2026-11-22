import { useState } from "react";
import styles from "./FormularioJogador.module.css";

export function FormularioJogador({ aoIniciar }) {
  const [nome, setNome] = useState("");

  function lidarComEnvio(evento) {
    evento.preventDefault();
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;

    aoIniciar(nomeLimpo);
    setNome("");
  }

  return (
    <form className={styles.formulario} onSubmit={lidarComEnvio}>
      <label className={styles.rotulo} htmlFor="nome-jogador">
        👤 Digite seu nome para jogar
      </label>
      <div className={styles.grupo}>
        <input
          id="nome-jogador"
          type="text"
          className={styles.input}
          placeholder="Seu nome..."
          value={nome}
          // onChange é um evento que ocorre quando o valor do input muda, e o setNome atualiza o estado com o novo valor
          onChange={(e) => setNome(e.target.value)} // e.target.value é o valor atual do input
          maxLength={30}
          autoFocus
        />
        <button type="submit" className={styles.botao} disabled={!nome.trim()}>
          ▶️ Começar
        </button>
      </div>
    </form>
  );
}
