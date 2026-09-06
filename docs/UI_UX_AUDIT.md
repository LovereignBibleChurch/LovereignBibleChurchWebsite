# Lovereign Bible Church Website — UI/UX Audit

## Scope

This audit covers the public site routes in this repository: Home, Our Story, Founder, Branches, Books, Media, Give and Contact. Dashboard, sidebar, data-table and authenticated settings screens are not present in this project and have not been fabricated into the audit.

## A. AI Slop Inventory

| Page | Component | Problem | Severity | Replacement |
| --- | --- | --- | --- | --- |
| All public pages | Global visual utilities | Purple glass, blur, glow and gradient utilities are used as a default surface treatment. | High | A dark editorial palette, thin rules and a small gold accent system. |
| Home | Hero | Auto-advancing, word-by-word animated hero with multiple gradients and decorative indicator effects distracts from the actual welcome message. | High | Calm image-led hero with a single overlay, deliberate type and user-controlled slide selection. |
| Home | Promo modal and ribbon | A forced modal plus a persistent promo ribbon interrupt the first visit before a visitor can orient themselves. | High | Retain promotion as ordinary content in the Books section; remove the forced interrupt. |
| Home | Service schedule | Every service is presented as a floating rounded glass card. | Medium | A compact, divided schedule list optimised for scanning time and location. |
| Home | Online Community | Animated count-up metrics (2,000+, 1,500+, 500+) have no verified CMS source and present content volume as decoration. | Critical | A simple list of actual platforms; introduce CMS-backed counts only if a reliable source is defined. |
| Home / Media | Carousels | Multiple auto-playing regions compete for attention and introduce motion without an explicit visitor request. | High | Use static/scrollable collections; if a carousel remains, make controls explicit and stop auto-advance. |
| All public pages | Navigation | Translucent floating header and rounded active pills duplicate the same decorative surface language. | Medium | A stable header with an active underline and concise mobile disclosure menu. |
| All public pages | Footer | Glass icon buttons, decorative orbs and unlabelled visual inputs make a functional contact form look ornamental. | High | Semantic footer columns, visible focus state, labelled inputs and direct contact links. |
| Branches / media / shop | Directory cards | Many cards use the same floating glass treatment regardless of whether visitors are scanning people, media or products. | Medium | Use a small set of content-specific patterns: divided lists for directories, image-led tiles for media, product grid only for commerce. |
| Home | Testimony Corner | Nested translucent cards, automatic scrolling, decorative quote medallions and multiple controls create a dense, competing hierarchy. | Medium | One readable featured testimony with explicit previous/next controls and a text link to submit a testimony. |

## B. Data Integrity Issues

| Page | Data | Problem | Expected Source | Recommendation |
| --- | --- | --- | --- | --- |
| Home / Media | Content-library counts | `2,000+`, `1,500+`, and `500+` are static component values, not a Sanity query. | CMS or platform API | Do not show counts until they can be maintained from a verified source. Removed from home. |
| Home / all hero pages | Hero text | Several hero titles repeat generic phrases such as “the model church”; current relevance cannot be determined from the route. | CMS editorial content | Move hero copy to Sanity and publish only campaign-specific messages. |
| Home | Events | Event metadata comes from Sanity. The public page showed a dated “New Books Available” item, including `TBA`, so its accuracy depends on content maintenance. | Sanity event records | Add event publishing ownership, end dates and validation for time, location and registration link. |
| Books / media | Legacy arrays | `booksData`, `messagesData`, `eventsData`, and `testimonyData` contain static records and dates. Some are currently used as fallback or featured data. | Sanity or another owned catalogue | Treat static records as seed content only; migrate editorially managed catalogues to CMS before claiming live completeness. |
| Footer | Contact form provider configuration | EmailJS identifiers are embedded in the client bundle. That is not fabricated data, but it couples production contact behaviour to source code. | Environment variables / server route | Move provider configuration and delivery handling to a server-side route before production hardening. |

## C. Component Replacements

`glass card → divided content list → the visitor compares the actual service details, not containers.`

`gradient hero type → solid editorial typography over a restrained image overlay → legibility and the message carry the hierarchy.`

`forced promo modal → in-flow bookstore feature → promotion remains visible without blocking a visitor.`

`animated invented metric → verified metric or no metric → trust is not traded for decoration.`

`active navigation pill → active underline → navigation state remains clear without adding another floating object.`

## D. Design System

- **Typography:** Playfair Display for headings; Inter for interface and body copy. H1 40–60px, H2 36–48px, H3 18–24px, body 16–18px, labels 12px with controlled letter spacing.
- **Spacing:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112px.
- **Colours:** canvas `#0b0b0a`, surface `#121210`, elevated surface `#181816`, text `#f5f0e6`, muted `#aaa69d`, border `rgba(245,240,230,.14)`, accent gold `#d8b267`, error `#e36d67`.
- **Radius & elevation:** 4px standard; 8px only when an image clipping need exists; borders before shadows; no default shadows.
- **Buttons & inputs:** Rectangular, 40–44px touch height, visible focus ring, clear primary gold action and text/underline secondary action. Inputs use labels, correct autocomplete and inline status feedback.
- **Navigation:** stable header, underline denotes the active route, mobile disclosure is a simple vertical list.
- **Lists & cards:** lists for schedules/platforms/directories; cards only when a cover image, product or event needs a bounded visual unit.
- **Motion:** opacity/transform only, under 200ms for interactions. No auto-advance or decorative continuous motion. Respect `prefers-reduced-motion`.
- **Loading & empty states:** concise state-specific copy, no spinning spectacle; give visitors an action only when one is meaningful.

## E. Page-by-Page Redesign

### Home

- Remove the forced promo modal, confetti dependency and unverified content counts.
- Keep the welcome, schedule, events, bookstore, media and testimony content.
- Use a calm hero, an in-flow bookstore feature, a divided schedule, and an editorial two-column welcome section.

### Our Story & Founder

- Retain genuine leadership and founder information.
- Consolidate repeated hero treatment to the same calm system. Replace decorative profile cards with an editorial portrait-and-biography layout where the amount of content calls for it.

### Branches

- Retain branch search and service data.
- Replace glass cards with a readable directory list; details belong in the detail surface, not hidden in a visually identical grid item.

### Books & Shop

- Keep covers and transactional controls.
- Use product tiles only in catalogue views, then a content-first book detail view. Do not use the same card visual for informational content.

### Media

- Keep streaming destinations and CMS-backed sermon/gallery content.
- Use a platform list, clear tabs or filters with URL state, and media tiles where imagery adds useful recognition.

### Give & Contact

- Retain giving methods and contact workflow.
- Prioritise trustworthy copy, clear payment method separation, labelled forms and direct fallbacks rather than decorative panels.

## Implementation Status

Implemented in the shared shell and highest-traffic home path:

- restrained global tokens and reduced-motion behaviour;
- non-glass, non-gradient navigation with accessible mobile state;
- skip link and correct dark browser colour scheme;
- redesigned hero, welcome, schedule, bookstore feature, community list and footer;
- removal of forced homepage promo modal and unverified content-library counts;
- contact-form labels, input types, autocomplete and live submission feedback.

The remaining route-specific components should now be consolidated against these shared tokens rather than redesigned independently.
