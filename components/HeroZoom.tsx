export function HeroZoom() {
  return (
    <>
      <div
        className="w-full overflow-hidden"
        style={{ position: "fixed", inset: 0, zIndex: 0, height: "100svh" }}
        aria-hidden="true"
      >
        <div className="hero-static-bg absolute inset-0" />
      </div>
      <section data-nav-section="hero" className="relative h-svh w-full">
        <img
          src="/logo/stackBranco.webp"
          alt="Stack"
          aria-hidden="true"
          className="hero-logo-mobile"
        />

        <p className="hero-copy-mobile" aria-hidden="true">
          Transformamos ideias em <strong>experi&ecirc;ncias digitais</strong>
        </p>

        <img
          src="/stackmobilehero.webp"
          alt=""
          aria-hidden="true"
          className="hero-mockup-mobile"
        />

        <svg
          className="hero-scroll-hint"
          aria-hidden="true"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <path d="M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z" />
        </svg>
      </section>
    </>
  );
}
