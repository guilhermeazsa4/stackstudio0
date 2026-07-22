const projects = [
  { name: "NPG Capital", link: "npg.app", href: "https://npm-capital.vercel.app/", type: "Site institucional", image: "/npm.webp" },
  { name: "Lumi", link: "", href: "", type: "Aplicativo educacional", image: "/lumimobile2.webp" },
  { name: "Editora Haus", link: "editorahaus.app", href: "https://editora-haus.vercel.app/livros", type: "Loja online", image: "/editorahaust.webp" },
];

function PortfolioCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      {project.image ? (
        <img className="portfolio-cell-media" src={project.image} alt={project.name} loading="lazy" decoding="async" />
      ) : (
        <div className="portfolio-cell-media portfolio-cell-media-placeholder" />
      )}
      <div className="portfolio-cell-caption">
        <span className="portfolio-cell-caption-name">{project.name}</span>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            {project.link}
          </a>
        ) : (
          <span>{project.link}</span>
        )}
        <span>{project.type}</span>
      </div>
    </>
  );
}

export function PortfolioScroll() {
  return (
    <section id="next" data-nav-section="portfolio" className="portfolio-editorial">
      <div className="portfolio-editorial-inner">
        <p className="studio-statement">
          <span className="studio-statement-emoji">&#128640;</span>
          Criamos <strong className="studio-statement-strong">experi&ecirc;ncias</strong> digitais onde cada detalhe existe por um motivo. Menos excesso, mais inten&ccedil;&atilde;o.
        </p>

        <div className="portfolio-grid-2x2">
          <div className="portfolio-cell portfolio-cell-a">
            <PortfolioCard project={projects[0]} />
          </div>

          <div className="portfolio-cell portfolio-cell-c">
            <PortfolioCard project={projects[2]} />
          </div>

          <div className="portfolio-cell portfolio-cell-bd">
            <PortfolioCard project={projects[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
