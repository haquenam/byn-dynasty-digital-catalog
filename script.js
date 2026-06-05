const catalogGrid = document.querySelector("#catalogs");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#catalog-search");
const filterButtons = document.querySelectorAll(".filter-button");
const viewer = document.querySelector("#viewer");
const viewerTitle = document.querySelector("#viewer-title");
const pdfObject = document.querySelector("#pdf-object");
const pdfFallback = document.querySelector("#pdf-fallback");
const closeViewer = document.querySelector("#close-viewer");

let activeFilter = "All";

function normalize(value) {
  return String(value).toLowerCase().trim();
}

function catalogSearchText(catalog) {
  return [
    catalog.title,
    catalog.description,
    catalog.category,
    ...catalog.tags,
    ...catalog.keywords,
  ]
    .map(normalize)
    .join(" ");
}

function matchesFilter(catalog) {
  if (activeFilter === "All") {
    return true;
  }

  const filter = normalize(activeFilter);
  return (
    normalize(catalog.category) === filter ||
    catalog.tags.some((tag) => normalize(tag) === filter) ||
    catalog.keywords.some((keyword) => normalize(keyword) === filter)
  );
}

function matchesSearch(catalog) {
  const query = normalize(searchInput.value);
  return !query || catalogSearchText(catalog).includes(query);
}

function renderCatalogs() {
  const filteredCatalogs = catalogs.filter((catalog) => matchesFilter(catalog) && matchesSearch(catalog));

  catalogGrid.innerHTML = filteredCatalogs.map(createCatalogCard).join("");
  emptyState.hidden = filteredCatalogs.length > 0;
}

function createCatalogCard(catalog) {
  const tags = catalog.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  return `
    <article class="catalog-card">
      <img class="card-image" src="${catalog.thumbnailPath}" alt="${catalog.title} catalog preview" loading="lazy" />
      <div class="card-body">
        <h3>${catalog.title}</h3>
        <p>${catalog.description}</p>
        <div class="tag-list" aria-label="Catalog tags">${tags}</div>
        <div class="card-actions">
          <button class="primary-button" type="button" data-catalog-id="${catalog.id}">Browse Catalog</button>
          <a class="download-link" href="${catalog.pdfPath}" target="_blank" rel="noopener" download>Download PDF</a>
        </div>
      </div>
    </article>
  `;
}

function openCatalog(catalog) {
  viewerTitle.textContent = catalog.title;
  pdfObject.data = catalog.pdfPath;
  pdfFallback.href = catalog.pdfPath;
  viewer.hidden = false;
  viewer.scrollIntoView({ behavior: "smooth", block: "start" });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderCatalogs();
  });
});

searchInput.addEventListener("input", renderCatalogs);

catalogGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-catalog-id]");
  if (!button) {
    return;
  }

  const selectedCatalog = catalogs.find((catalog) => catalog.id === button.dataset.catalogId);
  if (selectedCatalog) {
    openCatalog(selectedCatalog);
  }
});

closeViewer.addEventListener("click", () => {
  viewer.hidden = true;
  pdfObject.data = "";
  document.querySelector("#catalogs").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderCatalogs();
