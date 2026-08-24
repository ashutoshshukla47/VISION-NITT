function Hero() {
  const scrollToLinks = () => {
    document.getElementById("important-links")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToPlacements = () => {
    document.getElementById("placements")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <p className="hero__eyebrow">
          STUDENT-DRIVEN PLACEMENT INITIATIVE
        </p>

        <h1 className="hero__title">
          Connecting
          <br />
          Opportunities.
          <br />
          Creating Possibilities.
        </h1>

        <div className="hero__bottom">
          <p className="hero__description">
            VISION connects organizations with emerging talent and helps create
            stronger placement opportunities for students.
          </p>

          <div className="hero__actions">
            <button
              type="button"
              className="button button--primary"
              onClick={scrollToLinks}
            >
              Explore VISION
              <span aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={scrollToPlacements}
            >
              View Placements
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;