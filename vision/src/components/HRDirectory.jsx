import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

const EXCEL_FILE_PATH = "/data/hr-contacts.xlsx";
const CONTACTS_PER_PAGE = 10;

function normalizeValue(value) {
  return String(value ?? "").trim();
}

function HRDirectory() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadContacts() {
    if (contacts.length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(EXCEL_FILE_PATH);

      if (!response.ok) {
        throw new Error("Failed to load the HR contact directory.");
      }

      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, {
        type: "array",
      });

      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        throw new Error("The Excel file does not contain any sheets.");
      }

      const worksheet = workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      const formattedContacts = rows
  .map((row) => ({
    companyName: normalizeValue(row["Company Name"]),
    location: normalizeValue(row.Location),
    email: normalizeValue(row.Email),
  }))
  .filter(
    (contact) =>
      contact.companyName ||
      contact.location ||
      contact.email
  );

      setContacts(formattedContacts);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Something went wrong while loading the HR directory."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function openDirectory() {
    setIsOpen(true);
    setCurrentPage(1);

    await loadContacts();
  }

  function closeDirectory() {
    setIsOpen(false);
    setSearchQuery("");
    setCurrentPage(1);
  }

  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) =>
      [
  contact.companyName,
  contact.location,
  contact.email,
].some(
        (value) => value.toLowerCase().includes(query)
      )
    );
  }, [contacts, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * CONTACTS_PER_PAGE;

  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + CONTACTS_PER_PAGE
  );

  const showingFrom =
    filteredContacts.length === 0 ? 0 : startIndex + 1;

  const showingTo = Math.min(
    startIndex + CONTACTS_PER_PAGE,
    filteredContacts.length
  );

  return (
    <section id="hr-network" className="hr-directory">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-number">03</span>

          <div>
            <p className="section-eyebrow">PROFESSIONAL NETWORK</p>
            <h2>HR network.</h2>
          </div>
        </div>

        <div className="hr-directory__intro">
          <p>
            Explore our professional network and discover HR contacts
            across different companies and locations.
          </p>

          <button
            type="button"
            className="button button--primary"
            onClick={openDirectory}
          >
            Explore HR Network
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="hr-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hr-modal-title"
        >
          <div className="hr-modal__backdrop" onClick={closeDirectory} />

          <div className="hr-modal__content">
            <div className="hr-modal__header">
              <div>
                <p className="section-eyebrow">PROFESSIONAL NETWORK</p>
                <h2 id="hr-modal-title">HR directory.</h2>
              </div>

              <button
                type="button"
                className="hr-modal__close"
                onClick={closeDirectory}
                aria-label="Close HR directory"
              >
                ×
              </button>
            </div>

            {!isLoading && !error && (
              <div className="hr-modal__toolbar">
                <div className="hr-directory__search">
                  <span aria-hidden="true">⌕</span>

                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search company, location or email"
                    aria-label="Search HR contacts"
                  />
                </div>

                <span className="hr-directory__count">
                  {filteredContacts.length}{" "}
                  {filteredContacts.length === 1
                    ? "contact"
                    : "contacts"}
                </span>
              </div>
            )}

            <div className="hr-modal__body">
              {isLoading && (
                <div className="hr-directory__state">
                  <p>Loading professional network...</p>
                </div>
              )}

              {!isLoading && error && (
                <div className="hr-directory__state">
                  <p>{error}</p>
                </div>
              )}

              {!isLoading &&
                !error &&
                filteredContacts.length === 0 && (
                  <div className="hr-directory__state">
                    <p>No contacts found matching your search.</p>
                  </div>
                )}

              {!isLoading &&
                !error &&
                paginatedContacts.length > 0 && (
                  <>
                    <div className="hr-directory__table-wrapper">
                      <table className="hr-directory__table">
                        <thead>
                          <tr>
                            <th>Company Name</th>
                            <th>Location</th>
                            <th>Email</th>
                          </tr>
                        </thead>

                        <tbody>
                          {paginatedContacts.map(
                            (contact, index) => (
                              <tr key={`${contact.companyName}-${startIndex + index}`}>
  <td>{contact.companyName || "—"}</td>
  <td>{contact.location || "—"}</td>
  <td>
    {contact.email ? (
      <a href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    ) : (
      "—"
    )}
  </td>
</tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="hr-pagination">
                      <span className="hr-pagination__info">
                        Showing {showingFrom}–{showingTo} of{" "}
                        {filteredContacts.length}
                      </span>

                      <div className="hr-pagination__controls">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              safeCurrentPage - 1
                            )
                          }
                          disabled={safeCurrentPage === 1}
                          aria-label="Previous page"
                        >
                          ←
                        </button>

                        <span>
                          {safeCurrentPage} / {totalPages}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              safeCurrentPage + 1
                            )
                          }
                          disabled={
                            safeCurrentPage === totalPages
                          }
                          aria-label="Next page"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HRDirectory;