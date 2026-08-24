const placementYears = [
  {
    year: "2027",
    description:
      "View placement records, shortlisted candidates, and offer details.",
    path: "/placements/2027/index.html",
  },
  {
    year: "2026",
    description:
      "Explore placement outcomes and company-wise records for this batch.",
    path: "/placements/2026/index.html",
  },
  {
    year: "2025",
    description:
      "View the placement history and opportunities recorded for this batch.",
    path: "/placements/2025/index.html",
  },
  {
    year: "2024",
    description:
      "View the placement history and opportunities recorded for this batch.",
    path: "/placements/2024/index.html",
  },
];

function PlacementHistory() {
  return (
    <section id="placements" className="placements">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-number">02</span>

          <div>
            <p className="section-eyebrow">PLACEMENT RECORDS</p>
            <h2>Placement history.</h2>
          </div>
        </div>

        <div className="placement-years">
          {placementYears.map((placement) => (
            <a
              key={placement.year}
              href={placement.path}
              className="placement-year-card"
            >
              <div className="placement-year-card__top">
                <span className="placement-year-card__label">
                  BATCH
                </span>

                <span
                  className="placement-year-card__arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <div className="placement-year-card__content">
                <h3>{placement.year}</h3>

                <p>{placement.description}</p>

                <span className="placement-year-card__action">
                  View records <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlacementHistory;