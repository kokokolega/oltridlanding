# Project memory

## Product intent & audience

- Project name/brand: **OLTRID**
- Multi-section website with a landing page and several informational pages; includes a comparison section/panel.

## Brand personality & voice

- Not yet inferred beyond brand name usage; no copy tone guidance established.

## Visual design & UX direction

- Logo asset: `/home/project/OLTRID logo with text (1).png`, placed in public assets; used with accompanying text.
- Logo appears consistently in:
  - Landing page main navigation/header
  - Landing page footer
  - Comparison section/card
  - Shared informational-page header
- Shared root layout does not contain the site header; route pages own their own navigation/header markup (some duplication across pages).

## Decisions, constraints & rationale

- Single logo source replaced everywhere to keep branding consistent across landing nav, footer, comparison card, and informational pages.
- Old logo references fully removed; build verified after replacement.
- Tech stack: Vite + React.

## Open questions & assumptions

- No authoritative `.bolt/prompt` exists yet; no global instructions or explicit design system constraints have been provided.
- Logo sizing/aspect-ratio rules and responsive breakpoints not specified — current replacements assume existing markup dimensions are acceptable.
- Whether to refactor duplicated header/nav markup into a shared component is unresolved.