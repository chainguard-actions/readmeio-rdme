<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.10.0-next.4

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.10.0-next.4** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable tags or branch names instead of immutable 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to a malicious commit. Affected references include: actions/checkout@v7, actions/setup-node@v7, readmeio/rdme@next, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3, jacobtomlinson/gha-find-replace@v3, readmeio/rdme@main, amannn/action-semantic-pull-request@v6, ad-m/github-push-action@master.

Locations:

- `.github/workflows/ci.yml:26`
- `.github/workflows/ci.yml:29`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:41`
- `.github/workflows/ci.yml:52`
- `.github/workflows/ci.yml:57`
- `.github/workflows/ci.yml:107`
- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:22`
- `.github/workflows/codeql-analysis.yml:26`
- `.github/workflows/docs.yml:18`
- `.github/workflows/docs.yml:40`
- `.github/workflows/docs.yml:46`
- `.github/workflows/docs.yml:68`
- `.github/workflows/lint-pr-title.yml:13`
- `.github/workflows/release.yml:22`
- `.github/workflows/release.yml:27`
- `.github/workflows/release.yml:44`
- `.github/workflows/release.yml:52`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

Three workflow files have no top-level `permissions:` block and no job-level `permissions:` blocks on any of their jobs. Without explicit permissions, workflows inherit the default repository permissions (which may be `write` for contents), granting broader access than necessary. Affected files: ci.yml, docs.yml, simple.yml.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 20 unpinned action references across 6 workflow files by pinning each to its full 40-character commit SHA (with the original tag/branch preserved as a comment). Added top-level `permissions: {}` blocks to ci.yml, docs.yml, and simple.yml which were missing them. The other three workflow files (codeql-analysis.yml, lint-pr-title.yml, release.yml) already had appropriate permissions blocks and only needed their action references pinned.

