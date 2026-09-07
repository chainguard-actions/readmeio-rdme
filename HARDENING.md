<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.0** was hardened automatically. 9 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of pinned 40-character commit SHAs, making them vulnerable to supply-chain attacks. Unpinned references: actions/checkout@v6, actions/setup-node@v6, readmeio/rdme@next

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:38`
- `.github/workflows/ci.yml:39`

### unpinned-uses (severity: high)

Workflow references actions using mutable version tags instead of pinned 40-character commit SHAs. Unpinned references: actions/checkout@v6, github/codeql-action/init@v4, github/codeql-action/analyze@v4

Locations:

- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:26`

### unpinned-uses (severity: high)

Workflow references actions using mutable tags and branch names instead of pinned 40-character commit SHAs. Unpinned references: actions/checkout@v6, jacobtomlinson/gha-find-replace@v3, readmeio/rdme@main

Locations:

- `.github/workflows/docs.yml:17`
- `.github/workflows/docs.yml:38`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:83`

### unpinned-uses (severity: high)

Workflow references an action using a mutable version tag instead of a pinned 40-character commit SHA. Unpinned reference: amannn/action-semantic-pull-request@v6

Locations:

- `.github/workflows/lint-pr-title.yml:14`

### unpinned-uses (severity: high)

Workflow references actions using mutable tags and a branch name instead of pinned 40-character commit SHAs. Unpinned references: actions/checkout@v6, actions/setup-node@v6, ad-m/github-push-action@master

Locations:

- `.github/workflows/release.yml:21`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:47`
- `.github/workflows/release.yml:57`

### unpinned-uses (severity: high)

Workflow references an action using a mutable version tag instead of a pinned 40-character commit SHA. Unpinned reference: actions/checkout@v6

Locations:

- `.github/workflows/simple.yml:14`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and no job-level permissions: keys on any job. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/ci.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and no job-level permissions: keys on any job. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/docs.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and no job-level permissions: keys on any job. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 6 unpinned-uses findings and 3 missing-permissions findings across 6 workflow files:
- ci.yml: Pinned actions/checkout@v6→SHA, actions/setup-node@v6→SHA (×4 total occurrences), readmeio/rdme@next→SHA; added top-level 'permissions: contents: read'
- codeql-analysis.yml: Pinned actions/checkout@v6→SHA, github/codeql-action/init@v4→SHA, github/codeql-action/analyze@v4→SHA (already had job-level permissions)
- docs.yml: Pinned actions/checkout@v6→SHA, jacobtomlinson/gha-find-replace@v3→SHA (×2), readmeio/rdme@main→SHA; added top-level 'permissions: contents: read'
- lint-pr-title.yml: Pinned amannn/action-semantic-pull-request@v6→SHA (already had permissions block)
- release.yml: Pinned actions/checkout@v6→SHA, actions/setup-node@v6→SHA (×2), ad-m/github-push-action@master→SHA (already had permissions block)
- simple.yml: Pinned actions/checkout@v6→SHA; added top-level 'permissions: contents: read'
All SHA pins use the format 'owner/repo@<full-40-char-sha> # tag-name' for readability.

