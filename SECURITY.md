# Security Policy

## Scope

This public repository is a showcase build and does not include full production backend logic.

Even so, security hygiene is enforced:

- No production secrets should be committed.
- No personal user data should be stored in repository history.
- No private keys or internal credentials should be present in code or docs.

## Reporting a Vulnerability

Please report security issues privately to the repository owner via GitHub private contact channels.

Do not open public issues for active vulnerabilities that may expose users or infrastructure.

## Secret Handling Rules

- Use `.env.example` for placeholders only.
- Keep `.env` local and untracked.
- Rotate any token that was ever accidentally exposed.
- Re-check repository history before major public updates.

## Public vs Private Boundary

Public repository includes:

- UI showcase.
- Integration contracts.
- Mock/demo-safe logic.

Private repository includes:

- Production infrastructure.
- Internal orchestration.
- Proprietary algorithms and confidential business logic.
