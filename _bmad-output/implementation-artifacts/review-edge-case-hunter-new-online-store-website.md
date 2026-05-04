# Edge Case Hunter Review Prompt

Use the `bmad-review-edge-case-hunter` skill in a fresh session.

You may inspect the project files. Focus on edge cases and methodical failure modes, not broad product opinions.

## Files To Inspect

- `index.html`
- `styles.css`
- `script.js`

## Change Summary

This change adds a dependency-free static playful clothing store website with product cards, a cart drawer, quantity controls, checkout form validation, shipping/tax/total calculations, and a demo order confirmation.

Version control is unavailable, so baseline is `NO_VCS`.

## Review Task

Find edge cases that could break or degrade the user experience. Pay special attention to:
- Empty cart checkout behavior
- Quantity increments, decrements, and item removal
- Shipping recalculation and free shipping threshold behavior
- Form validation for required fields and invalid email
- Cart/confirmation overlay state interactions
- Mobile layout, text overflow, and control sizing
- Keyboard and screen reader usability

Return findings only. For each finding, include file path, line or selector/function if possible, severity, and a concise fix recommendation.

If there are no findings, say so clearly and mention any residual risk.
