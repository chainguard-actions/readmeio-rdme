<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.5

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.5** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable version tags or branch names instead of full 40-character commit SHA hashes. This exposes the workflow to supply-chain attacks if the referenced tag or branch is updated with malicious code.

Failing references in ci.yml: actions/checkout@v7, actions/setup-node@v7 (multiple), readmeio/rdme@next.
Failing references in codeql-analysis.yml: actions/checkout@v7, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3.
Failing references in docs.yml: actions/checkout@v7, jacobtomlinson/gha-find-replace@v3 (twice), readmeio/rdme@main.
Failing references in lint-pr-title.yml: amannn/action-semantic-pull-request@v6.
Failing references in release.yml: actions/checkout@v7, actions/setup-node@v7, ad-m/github-push-action@master.
Failing references in simple.yml: actions/checkout@v7.

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:39`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:51`
- `.github/workflows/ci.yml:57`
- `.github/workflows/ci.yml:97`
- `.github/workflows/codeql-analysis.yml:19`
- `.github/workflows/codeql-analysis.yml:22`
- `.github/workflows/codeql-analysis.yml:27`
- `.github/workflows/docs.yml:18`
- `.github/workflows/docs.yml:43`
- `.github/workflows/docs.yml:51`
- `.github/workflows/docs.yml:72`
- `.github/workflows/lint-pr-title.yml:14`
- `.github/workflows/release.yml:21`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:46`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

Three workflow files have no top-level `permissions:` key and no job-level `permissions:` key on any of their jobs. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions, which may be overly broad (write access to contents and other scopes). Each workflow should declare minimal required permissions.

- ci.yml: no permissions block at top level or in any of its three jobs (build, lint, action).
- docs.yml: no permissions block at top level or in its sync job.
- simple.yml: no permissions block at top level or in its simple job.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references by replacing mutable tags/branches with full 40-character commit SHAs (preserving original tags as comments). Pinned: actions/checkout@v7, actions/setup-node@v7, readmeio/rdme@next, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3, jacobtomlinson/gha-find-replace@v3, readmeio/rdme@main, amannn/action-semantic-pull-request@v6, ad-m/github-push-action@master. Added top-level 'permissions: contents: read' blocks to ci.yml, docs.yml, and simple.yml which were missing permissions declarations. codeql-analysis.yml, lint-pr-title.yml, and release.yml already had appropriate permissions blocks.

