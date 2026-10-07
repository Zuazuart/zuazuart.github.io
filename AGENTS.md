# Repository guidance

## Project and layout

Zuazuart is the public website for a professional tattoo artist specializing primarily in black-and-grey realism and color realism. It is a bilingual portfolio and inquiry site served as static files through GitHub Pages. `CNAME` specifies `www.zuazuart.com`.

- Root HTML pages are Spanish; `en/` contains the corresponding English pages.
- `style.css` and `script.js` are shared by both languages.
- `images/` contains site photography, `assets/` contains additional assets, and `forms/` contains release-form PDFs. Some images and icons also exist at the root; check references before moving or deleting duplicates.
- There is no package manifest, dependency installation, build step, or automated test suite in the repository.

## Development

Use the existing checkout. Cloud tasks are already isolated; create a Git worktree only if the user requests one.

From the repository root, start a local server:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Keep the server in a persistent session. Inspect an occupied port before reusing it; do not stop unrelated processes. Cloud onboarding does not support user-facing localhost preview links; use loopback requests for internal checks.

## Editing conventions

Keep changes focused and preserve the existing plain HTML, CSS, and JavaScript approach. Avoid adding frameworks, build tools, or dependencies unless the task requires them. Existing files have mixed formatting and line endings; avoid whole-file formatting churn.

For shared content or navigation changes, update the corresponding Spanish and English pages. Preserve language-specific copy, `lang` attributes, language-switch destinations, canonical URLs, alternate-language metadata, and relative asset paths (`../` in English pages).

Maintain responsive layouts and accessibility: semantic elements, image alternative text, form labels, keyboard navigation, visible focus, ARIA state updates, dialog focus restoration, and reduced-motion support. Shared JavaScript runs across different pages, so handle missing page-specific elements safely.

Do not invent business terms, prices, contact details, or strategy requirements. Business strategy is managed separately in the ChatGPT Project “Zuazuart CEO/CFO Strategy.” Its recommendations are the source of business direction, subject to the customer experience veto below. Do not assume access to that project; when necessary, request only the non-confidential implementation requirements needed for the task.

## Permanent operating principles

### 1. CEO / business direction

Business strategy determines the outcomes the website should achieve. Prioritize qualified tattoo inquiries, bookings, brand authority, premium positioning, portfolio discovery, and measurable conversion. Treat the website as a business asset, not only a visual portfolio.

### 2. Customer experience veto

Do not implement a technically correct or conversion-focused change if it materially damages customer comfort, trust, clarity, accessibility, or usability. Do not blindly implement CEO/CFO recommendations when their implementation would create a poor customer experience.

Never use aggressive popups, fake scarcity, fake countdown timers, manipulative urgency, misleading pricing, dark patterns, unnecessary booking steps, excessive calls to action, intrusive animations, or clutter that competes with the tattoo portfolio.

### 3. Premium UX

Keep the experience professional, minimalist, elegant, trustworthy, calm, visually focused on the artwork, easy to understand, and easy to navigate.

### 4. Booking experience

Optimize the journey: Portfolio → Trust → Project information → Tattoo inquiry → Confirmation.

Keep forms as short as practical while collecting the information genuinely needed to evaluate a tattoo project.

### 5. Mobile first

Check every meaningful change on mobile as well as desktop. Pay particular attention to navigation, text readability, buttons and tap targets, portfolio images, forms, booking flow, and loading performance. If the required checks cannot run, state the validation gap before review; do not claim the change is fully validated.

### 6. Performance

This is an image-heavy tattoo portfolio. Protect page speed and avoid unnecessary JavaScript, oversized assets, layout shifts, or dependencies unless they provide meaningful business or customer value.

### 7. Accessibility

Preserve or improve semantic HTML, keyboard accessibility, readable contrast, labels, appropriate alternative text, and understandable navigation.

### 8. Change control

For meaningful website changes, inspect the existing implementation first, avoid unnecessary rewrites of functioning areas, make the smallest reliable change that accomplishes the business goal, test relevant pages and interactions, explain what changed and why, and keep changes reversible.

Do not deploy significant customer-facing changes directly to production without review. Prefer branch → implementation → testing → review/PR → approval → merge. Do not merge or deploy without the required approval.

### 9. Protect production

Unless the task specifically requires changing them, preserve `CNAME` and domain configuration, working booking/contact forms, existing navigation, any analytics or tracking integrations, SEO metadata, and the bilingual English-Spanish structure.

### 10. Privacy

This is a public GitHub repository. Never place private CEO/CFO information in repository files, commit messages, or public PR descriptions: personal finances, cash balances, private revenue figures, confidential pricing strategy, passwords, credentials, API secrets, or private customer information.

Translate business instructions into implementation requirements without copying confidential strategy into public files.

### 11. Decision rule

When increasing conversion conflicts with preserving customer trust, prefer the solution that builds long-term trust while still supporting the business objective.

## Validation

For JavaScript changes, run from the repository root:

```sh
node --check script.js
```

For page or asset changes, request the affected pages through the local server and verify expected content, local links, and asset availability. Check both language versions. Browser testing, when available, should cover the affected interaction and mobile layout; a syntax check alone does not verify behavior.

Relevant interactions include the mobile menu, portfolio filters, image dialogs, and booking-file validation (at most 10 files and 10 MB total). Form submission on `localhost` and `127.0.0.1` is intercepted by `script.js` to avoid sending inquiries. Current HTML forms use FormSubmit; the JavaScript also contains a separate Formspree-specific branch. Do not assume that branch handles FormSubmit. Do not submit live inquiries during routine testing.

Inspect `git diff --check`, `git diff`, and `git status --short` before finishing. Preserve user changes and keep generated outputs out of commits. Do not claim production delivery, deployment, or browser behavior was verified unless those checks actually ran.
