# Acceptance Auditor Review Prompt

Use a fresh session.

You may inspect the project files and must read the spec before reviewing.

## Required Inputs

- Spec: `_bmad-output/implementation-artifacts/spec-new-online-store-website.md`
- Implementation files:
  - `index.html`
  - `styles.css`
  - `script.js`

## Review Task

Audit the implementation against the spec's frozen intent, boundaries, I/O matrix, tasks, acceptance criteria, design notes, and verification section.

Check for:
- Direct spec violations
- Missing acceptance criteria
- Behavior that contradicts "no real payment" or "works by opening HTML directly"
- Whether the first screen exposes the shopping experience rather than only marketing
- Whether the playful design is varied and not a generic single-hue template
- Whether checkout validation and confirmation behavior satisfy the I/O matrix
- Whether responsive layout and controls plausibly avoid overlap

Classify each finding as one of:
- `intent_gap`
- `bad_spec`
- `patch`
- `defer`
- `reject`

Return findings only, with file path, line/section where possible, classification, severity, and exact recommended remediation.

If the implementation satisfies the spec, say there are no findings and list any test gaps.
