# TES Borovets - Exely Booking Engine integration

This is the isolated public repository for the Exely Booking Engine integration on `tes-borovets.com`.
It contains only the publishable TES Borovets website. It does not contain the WelcomeBook Agency source,
other websites, payment functions, account credentials, or deployment tokens.

**Exely implementers:** start with [EXELY-HANDOVER.md](EXELY-HANDOVER.md). It contains the complete
editing and testing instructions.

No invitation, repository permission, Pull Request, or approval is required to implement and test the
integration. Download the self-service ZIP from the GitHub Releases page, extract it, edit it locally,
and run `npm run preview`. When the work is complete, return the finished ZIP or a link to an Exely-owned
fork. WelcomeBook Agency involvement is needed only if publication to the live website is requested.

Release downloads: `https://github.com/BukiZvqra/tes-borovets-exely/releases`

Optional fork link: `https://github.com/BukiZvqra/tes-borovets-exely/fork`

## How changes are saved and built

1. Download and extract the self-service ZIP, or fork this repository into an Exely-owned GitHub account.
2. Edit the integration files under `site/`.
3. Run `npm run preview` and complete the booking-flow tests.
4. Keep the completed project in the Exely-owned workspace and send the finished ZIP or fork URL when done.

The package contains no deployment credentials and cannot modify the preview or live website.

Do not request repository or Netlify access. Do not add passwords, API keys, Exely account credentials,
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
