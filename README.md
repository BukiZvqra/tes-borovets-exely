# TES Borovets - Exely Booking Engine integration

This is the isolated public repository for the Exely Booking Engine integration on `tes-borovets.com`.
It contains only the publishable TES Borovets website. It does not contain the WelcomeBook Agency source,
other websites, payment functions, account credentials, or deployment tokens.

**Exely implementers:** start with [EXELY-HANDOVER.md](EXELY-HANDOVER.md). It contains the complete
access, editing, validation, testing, and delivery procedure.

No invitation is required. Use **Fork** to create your own editable copy, implement and test the
integration there, and return the finished work with a Pull Request to `exely-integration`.

Direct fork link: `https://github.com/BukiZvqra/tes-borovets-exely/fork`

## How changes are saved and built

1. Fork this repository and work from the `exely-integration` branch in your fork.
2. Edit or upload the integration files under `site/` in the fork.
3. Select **Commit changes** in GitHub. The commit permanently saves the change and its history.
4. Build and test the website in the fork with `npm run preview`.
5. Open a Pull Request from the fork into `BukiZvqra/tes-borovets-exely:exely-integration`. GitHub
   automatically validates the submitted website and creates a downloadable `tes-borovets-build` package.
6. WelcomeBook Agency publishes the verified package to the isolated Netlify preview website.
7. The live website is published only after preview testing and approval by the repository owner.

The automatic build uses no deployment credentials and cannot modify the preview or live website. Preview
publication deliberately remains an owner-controlled approval step.

Do not request repository or Netlify access. Do not commit directly to `main`. Do not add passwords, API keys, Exely account credentials,
guest data, or other secrets to this repository.

## Local build

No dependencies are required beyond Node.js 20 or newer.

```bash
npm run build
```

The command validates the site and creates a byte-verified `dist/` directory. Netlify publishes `dist/`.

To build and open a local test server at `http://127.0.0.1:4173`:

```bash
npm run preview
```

## Exely integration map

The website is static. Bulgarian pages are under `site/`; English pages are under `site/en/`.

| Exely component | Location |
|---|---|
| Bulgarian `head_script` | Before `</head>` on Bulgarian HTML pages |
| English `head_script` | Before `</head>` on HTML pages under `site/en/` |
| `search_form.2.0` | The page section where availability search should appear |
| `booking_engine.2.0` | New `site/booking/index.html` and `site/en/booking/index.html` pages |
| Room links | `/booking/?room-type=<id>&special-offer=<id>` |

Apartment pages are under `site/property/` and `site/en/property/`. Add the matching Exely room ID to
each relevant booking button. Preserve canonical URLs, hreflang, Open Graph metadata, JSON-LD,
`site/sitemap.xml`, `site/robots.txt`, `site/_redirects`, and the Netlify form attributes.

Images load from Cloudinary through absolute URLs. `site/assets/` contains the website stylesheet.

## Production baseline

The initial `site/` directory is an exact snapshot of the current production deployment
`6aae7eb86ac48d9c4ad65c2d`. This avoids replacing the live website with the older clean-build handover.
