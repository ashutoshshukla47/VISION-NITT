function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <p className="footer__label">STUDENT PLACEMENT INITIATIVE</p>

            <h2>
              VISION<span>.</span>
            </h2>

            <p className="footer__description">
              Connecting opportunities with potential and helping create
              stronger pathways between students and organizations.
            </p>
          </div>

          <div className="footer__message">
            <span>BUILT FOR</span>
            <strong>
              Better
              <br />
              opportunities.
            </strong>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} VISION</p>

          <p>
            Made with <span aria-label="love">♥</span> by the VISION Team
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;