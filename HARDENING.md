<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.4-next.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.4-next.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable version tags instead of immutable 40-character SHA commit hashes. This exposes the workflow to supply-chain attacks if the referenced action is compromised or the tag is moved.

ci.yml: uses: actions/checkout@v7, uses: actions/setup-node@v6, uses: readmeio/rdme@next
codeql-analysis.yml: uses: actions/checkout@v7, uses: github/codeql-action/init@v4, uses: github/codeql-action/analyze@v4
docs.yml: uses: actions/checkout@v7, uses: jacobtomlinson/gha-find-replace@v3 (×2), uses: readmeio/rdme@main
lint-pr-title.yml: uses: amannn/action-semantic-pull-request@v6
release.yml: uses: actions/checkout@v7, uses: actions/setup-node@v6, uses: ad-m/github-push-action@master
simple.yml: uses: actions/checkout@v7

Locations:

- `.github/workflows/ci.yml:26`
- `.github/workflows/ci.yml:29`
- `.github/workflows/ci.yml:38`
- `.github/workflows/ci.yml:39`
- `.github/workflows/ci.yml:100`
- `.github/workflows/codeql-analysis.yml:17`
- `.github/workflows/codeql-analysis.yml:20`
- `.github/workflows/codeql-analysis.yml:24`
- `.github/workflows/docs.yml:19`
- `.github/workflows/docs.yml:38`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:72`
- `.github/workflows/lint-pr-title.yml:14`
- `.github/workflows/release.yml:21`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:44`
- `.github/workflows/simple.yml:14`

### missing-permissions (severity: medium)

These workflow files have no top-level `permissions:` key and no job-level `permissions:` block on any of their jobs. Without explicit permissions, the GITHUB_TOKEN is granted default (potentially broad) permissions, violating the principle of least privilege.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references across 6 workflow files by replacing mutable tags/branches with full 40-character SHA commit hashes (verified via lookup_action_sha). Added top-level `permissions: contents: read` blocks to ci.yml, docs.yml, and simple.yml which were missing permissions declarations. Files codeql-analysis.yml, lint-pr-title.yml, and release.yml already had permissions blocks. All original tag names preserved as inline comments for readability.

