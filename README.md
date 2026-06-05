# BYN Dynasty Apparel Digital Catalog

A simple, mobile friendly GitHub Pages website for browsing BYN Dynasty Apparel digital catalogs. The site is static, fast, and built with plain HTML, CSS, and JavaScript. It is intended for catalog browsing only; it is not an ecommerce store, login portal, CRM, or messaging integration.

## How to view the site locally

Open `index.html` directly in a browser, or run a small local web server from the repository root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## How to update the logo

Replace the file at:

```text
assets/logo.png
```

Keep the same filename and path so the website continues to load the logo without code changes. Use a web-friendly PNG with a transparent background when possible.

## How to replace PDFs

Catalog PDF files live in:

```text
assets/pdfs/
```

Current PDF files:

- `assets/pdfs/kidswear-may-2026.pdf`
- `assets/pdfs/menswear-may-2026.pdf`
- `assets/pdfs/womenswear-may-2026.pdf`

To replace a catalog, upload the new PDF using the same filename. If you change a filename, update the matching `pdfPath` value in `catalog-data.js`.

## How to update catalog metadata

Edit `catalog-data.js`. Each catalog object includes:

- `id`
- `title`
- `description`
- `category`
- `tags`
- `keywords`
- `pdfPath`
- `thumbnailPath`

The search box checks catalog titles, descriptions, categories, tags, and keywords. The filter buttons match categories, tags, and keywords.

## How to enable GitHub Pages

1. Push this repository to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings** > **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch you want to publish, usually `main`.
6. Select the repository root folder, `/`.
7. Save the settings.
8. GitHub will provide a Pages URL after the first deployment finishes.

## Folder structure

```text
.
├── index.html              # Main catalog website page
├── style.css               # Mobile first visual styling
├── script.js               # Search, filtering, and PDF viewer behavior
├── catalog-data.js         # Catalog records and PDF metadata
├── README.md               # Project documentation
└── assets/
    ├── logo.png
    ├── kidswear-flyer.png
    ├── kidswear-hero.png
    └── pdfs/
        ├── kidswear-may-2026.pdf
        ├── menswear-may-2026.pdf
        └── womenswear-may-2026.pdf
```

## Maintenance notes

- Keep the site static and GitHub Pages compatible.
- Do not delete or rename existing assets unless you also update every reference in the code.
- Compress images and PDFs when possible to keep the page quick on mobile connections.
- Test the PDF viewer on iPhone, Android, tablet, and desktop browsers when catalogs are updated.
- Some mobile browsers may open PDFs in their own viewer instead of embedding them. The site includes a direct PDF fallback link for those cases.
