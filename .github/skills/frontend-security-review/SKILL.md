---
name: frontend-security-review
description: 'Review React, TypeScript, JavaScript, and browser-facing code for XSS, unsafe DOM/URL use, client-side data exposure, secrets, privacy, and relevant web security controls. Use when implementing or reviewing front-end features, forms, client-side storage, links, or security-sensitive browser flows.'
user-invocable: false
---

# Front-end Security Review

Use this skill for a focused, read-only security review of browser-side application code. It is adapted from [security-review in github/awesome-copilot](https://github.com/github/awesome-copilot/tree/main/skills/security-review), distributed under the repository's [MIT license](https://github.com/github/awesome-copilot/blob/main/LICENSE).

Use [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/tree/v5.0.0) as the versioned security verification reference and the [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) for implementation guidance. This review does not certify ASVS compliance; assess only controls applicable to the code and deployment context in scope.

## Review Scope

1. Identify the browser entry points and follow user-controlled data to relevant rendering or navigation sinks. Read neighboring code only as needed to verify the flow.
2. Review React/DOM rendering for unsafe HTML, untrusted rich text, unsafe URL schemes, scriptable attributes, and client-side injection. Account for framework escaping and sanitization before reporting.
3. Review form handling and validation. Treat browser validation as user experience, not as a trust boundary; if server-side enforcement is outside the repository, record that limit instead of assuming it is absent.
4. Review links, redirects, `target="_blank"`, `postMessage`, and cross-origin communication for untrusted destinations, origin checks, and opener access where applicable.
5. Review browser storage, client bundles, environment variables, telemetry, errors, and logs for credentials or unnecessary personal data. Values exposed to browser code are not secrets.
6. Review dependency metadata only when dependencies or lockfiles are in scope. Do not claim a vulnerability from age alone; require an advisory or other verifiable evidence.
7. Treat CSP, cookies, CORS, CSRF, authentication, authorization, rate limiting, and transport security as server/deployment controls unless this repository owns their configuration. Mark unavailable context as a question or limitation, not a confirmed finding.

## Finding Rules

- Report only evidence-based vulnerabilities or material security gaps in the scoped code. Separate confirmed findings from assumptions and questions.
- For each finding include severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, or `INFO`), confidence, file and line, attack preconditions, affected data or capability, and a minimal remediation.
- Trace a plausible attacker-controlled path to an impact. Do not report a dangerous-looking API when the input is demonstrably trusted or safely handled.
- Do not add product requirements, authentication schemes, storage policies, or backend behavior that the specifications and repository do not establish.
- Do not modify files. Return `PASS`, `FINDINGS`, or `NOT_APPLICABLE`, plus scope and limitations.
