# Blind Hunter Review Prompt

Use the `bmad-review-adversarial-general` skill in a fresh session.

You receive only this best-effort diff summary. Do not inspect the workspace or the spec.

## Diff Summary

Version control is unavailable, so baseline is `NO_VCS`.

New files added:
- `index.html` -- single-page clothing storefront structure, product section, cart drawer, checkout form, confirmation modal, and script/style references.
- `styles.css` -- responsive playful storefront styles, product card mockups, cart panel, checkout form, confirmation modal, and mobile breakpoints.
- `script.js` -- product catalog data, product rendering, cart state, quantity changes, subtotal/tax/shipping/total calculations, checkout validation, confirmation, and cart reset.

Spec file updated:
- `_bmad-output/implementation-artifacts/spec-new-online-store-website.md` -- status changed through `ready-for-dev`, `in-progress`, and now `in-review`; `baseline_commit: 'NO_VCS'`; implementation checklist marked complete.

## Review Task

Act as a blind adversarial reviewer. Look for likely bugs, behavioral risks, accessibility concerns, state bugs, checkout/cart edge cases, and UI issues that are plausible from this diff summary alone.

Return findings only. For each finding, include:
- Severity: high, medium, or low
- Category: likely bug, missing behavior, accessibility, UX, maintainability, or uncertainty
- Why it matters
- What to inspect or fix

If there are no credible findings from the summary alone, say so clearly.
