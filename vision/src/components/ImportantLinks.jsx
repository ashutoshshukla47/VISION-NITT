import { EXTERNAL_LINKS } from "../config/links";

const links = [
  {
    number: "01",
    title: "Share a Lead",
    description:
      "Know a company that could be a great fit for our campus? Share the company and HR contact details with the VISION team.",
    label: "Submit Details",
    href: EXTERNAL_LINKS.submitLead,
  },
  {
    number: "02",
    title: "View Responses",
    description:
      "Explore the company information and placement leads contributed by the VISION community.",
    label: "View Responses",
    href: EXTERNAL_LINKS.viewResponses,
  },
];

function ImportantLinks() {
  return (
    <section id="important-links" className="important-links">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-number">01</span>

          <div>
            <p className="section-eyebrow">CONTRIBUTE</p>
            <h2>Important links.</h2>
          </div>
        </div>

        <div className="important-links__grid">
          {links.map((link) => (
            <a
              key={link.number}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card__top">
                <span className="link-card__number">{link.number}</span>

                <span className="link-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className="link-card__content">
                <h3>{link.title}</h3>

                <p>{link.description}</p>

                <span className="link-card__action">
                  {link.label}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImportantLinks;