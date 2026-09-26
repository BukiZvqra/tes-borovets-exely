# Exely implementation handover

This public repository is the self-service workspace for the Exely Booking Engine integration on
`tes-borovets.com`. It contains only files that are already publishable as part of the public website.
It is isolated from all other WelcomeBook Agency projects and does not provide access to the live
Netlify website, any other repository, or any account credential.

## 1. Create your editable copy

No invitation or special repository access is required.

Use either option:

### Fastest option — ZIP

1. Open `https://github.com/BukiZvqra/tes-borovets-exely/releases`.
2. Download the attached self-service ZIP and extract it.
3. Edit and test the extracted project locally. No GitHub account is needed.
4. When finished, send the completed ZIP back to the website owner.

### Optional option — Exely-owned fork

1. Sign in to a GitHub account controlled by Exely.
2. Open `https://github.com/BukiZvqra/tes-borovets-exely` and select **Fork**.
3. Keep **Copy the `exely-integration` branch only** enabled.
4. Edit, commit, and test entirely inside the Exely-owned fork.
5. When finished, send the fork URL to the website owner. An upstream Pull Request is optional, not required.

GitHub permanently saves each submitted commit and keeps its history. Editing a file without selecting
**Commit changes** does not save the change to the repository.

## 2. Website structure

Only edit publishable website files under `site/` unless a build fix is agreed in advance.

- Bulgarian pages: `site/`
- English pages: `site/en/`
- Bulgarian apartment pages: `site/property/`
- English apartment pages: `site/en/property/`
- Shared stylesheet: `site/assets/style.css`
- Images: external Cloudinary URLs already present in the HTML
- Bulgarian booking page to create: `site/booking/index.html`
- English booking page to create: `site/en/booking/index.html`

The initial `site/` directory is an exact snapshot of the current production website. Preserve its
layout, navigation, responsive behaviour, SEO metadata, analytics, forms, language links, and URLs.

## 3. Required Exely integration

Implement all supplied Exely components in both languages:

1. Add the Bulgarian `head_script` before `</head>` on Bulgarian pages.
2. Add the English `head_script` before `</head>` on pages under `site/en/`.
3. Add `search_form.2.0` in the agreed availability-search section.
4. Add `booking_engine.2.0` to the new Bulgarian and English booking pages.
5. Connect every relevant Book now button to the correct Exely room and offer IDs.
6. Keep the normal URL format:
   `/booking/?room-type=<id>&special-offer=<id>`

If a supplied Exely value is a credential rather than public browser-side configuration, do not add it
to this repository. Contact WelcomeBook Agency before continuing.

## 4. Files and behaviour that must be preserved

Do not remove or replace:

- canonical URLs, Open Graph tags, hreflang tags, or JSON-LD;
- `site/sitemap.xml`, `site/robots.txt`, or `site/_redirects`;
- Netlify form names, fields, and attributes;
- existing Bulgarian/English navigation and language switching;
- existing responsive styling, telephone links, or enquiry flows.

Do not commit passwords, API keys, Exely account credentials, guest information, test reservations
containing personal data, deployment tokens, or unrelated files.

## 5. Save and validate the work

For each logical change:

1. Select **Commit changes** in GitHub, or commit and push with Git locally.
2. Use a clear commit message, for example `Add Exely booking engine pages`.
3. Run `npm run preview` and complete the local tests below.
4. When the implementation is ready, open the upstream Pull Request described in section 7.
5. Wait for the Pull Request check **Validate and package TES Borovets** to finish successfully.
6. If it fails, open the failed step, correct the reported issue in the fork, and push again.

The successful workflow creates a downloadable artifact named `tes-borovets-build`. This automatic
build contains no deployment credential and cannot modify either the preview or the live website.

For a local check, Node.js 20 or newer is sufficient. Build and start the included test server:

```bash
npm run preview
```

Then open `http://127.0.0.1:4173`. The command rebuilds the complete site before every preview and
does not need Netlify access or any additional package. Press `Ctrl+C` to stop it. If the Exely test
environment restricts allowed domains, Exely is responsible for permitting this local test origin or
for using its own isolated staging environment.

## 6. Minimum testing before delivery

Test at desktop and mobile widths in both Bulgarian and English:

- availability search opens and returns the expected flow;
- `/booking/` and `/en/booking/` load without JavaScript errors;
- at least one apartment-specific button passes the correct room ID;
- back navigation and language switching remain functional;
- the enquiry forms and existing links still work;
- no secret or personal guest data appears in the files or commit history.

Do not make a real charge. If Exely requires an end-to-end test reservation, use Exely's approved test
procedure and cancel the reservation immediately after verification.

## 7. Finish the work

1. Complete all local or Exely staging tests.
2. Run `npm run build` once more and confirm that it passes.
3. Keep the completed source, including the updated `site/` directory, in the delivery package.
4. Send the finished ZIP or Exely-owned fork URL together with the tested booking flows.

No upstream Pull Request or WelcomeBook Agency approval is required for Exely to implement and test the
integration. Publication to `tes-borovets.com` is a separate production action because this handover
intentionally contains no production credential.

Preview environment: `https://tes-borovets-exely-preview.netlify.app`

Production environment: `https://tes-borovets.com`

The preview URL currently shows the verified production baseline. Exely may use its own isolated staging
environment in addition to the included local preview.
