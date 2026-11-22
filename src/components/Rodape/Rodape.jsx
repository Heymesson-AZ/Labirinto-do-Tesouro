import styles from "./Rodape.module.css";

const LINK_REPOSITORIO = "https://github.com/Heymesson-AZ/Labirinto-do-Tesouro";
const LINK_PERFIL = "https://github.com/Heymesson-AZ";
const TECNOLOGIAS = ["React", "Vite", "JavaScript", "CSS Modules", "LocalStorage"];

export function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.rodape}>
      <div className={styles.container}>
        <div className={styles.grade}>
          <div className={styles.colunaSobre}>
            <div className={styles.marca}>
              <span className={styles.logo} aria-hidden="true">
                🗺️
              </span>
              <div>
                <h2 className={styles.titulo}>Labirinto do Tesouro</h2>
                <span className={styles.subtitulo}>Jogo web interativo</span>
              </div>
            </div>
            <p className={styles.descricao}>
              Um desafio de exploração desenvolvido em React e Vite. A cada
              partida, um novo labirinto é embaralhado aleatoriamente: siga as
              dicas de proximidade para encontrar o tesouro, desvie das
              armadilhas e dispute as melhores marcas no placar local.
            </p>
            <ul className={styles.listaTags} aria-label="Tecnologias utilizadas">
              {TECNOLOGIAS.map((tech) => (
                <li key={tech} className={styles.tag}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colunaLinks}>
            <h3 className={styles.tituloSecao}>Desenvolvimento</h3>
            <p className={styles.desenvolvedor}>
              Criado por{" "}
              <a
                className={styles.linkPerfil}
                href={LINK_PERFIL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Heymesson Azevêdo
              </a>
            </p>
            <p className={styles.textoRepo}>
              Confira o código-fonte, acompanhe melhorias ou contribua
              diretamente pelo repositório oficial no GitHub.
            </p>
            <a
              className={styles.botaoGithub}
              href={LINK_REPOSITORIO}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.iconeGithub}
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39 0.6 0.11 0.82-0.26 0.82-0.58 0-0.29-0.01-1.05-0.02-2.06-3.34 0.73-4.04-1.61-4.04-1.61-0.55-1.39-1.33-1.76-1.33-1.76-1.09-0.74 0.08-0.73 0.08-0.73 1.2 0.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 0.11-0.78 0.42-1.3 0.76-1.6-2.67-0.3-5.47-1.33-5.47-5.93 0-1.31 0.47-2.38 1.24-3.22-0.12-0.3-0.54-1.52 0.12-3.18 0 0 1.01-0.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23 0.66 1.66 0.24 2.88 0.12 3.18 0.77 0.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92 0.43 0.37 0.81 1.1 0.81 2.22 0 1.61-0.01 2.9-0.01 3.29 0 0.32 0.22 0.7 0.82 0.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63 0.5 12 0.5z" />
              </svg>
              Acessar repositório no GitHub
            </a>
          </div>
        </div>

        <div className={styles.barraInferior}>
          <span>
            © {anoAtual} Labirinto do Tesouro · Heymesson Azevêdo
          </span>
          <span className={styles.detalheInferior}>
            Feito com React &amp; Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
