function Navbar() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <button
          type="button"
          className="navbar__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
        >
          VISION
        </button>

        <nav className="navbar__links" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => scrollToSection("important-links")}
          >
            Links
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("placements")}
          >
            Placements
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("hr-network")}
          >
            Network
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;