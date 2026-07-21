<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable tags or branch names instead of pinned 40-character commit SHAs, making them vulnerable to supply-chain attacks.

.github/workflows/ci.yml:
- uses: actions/checkout@v7 (lines 28, 52, 56)
- uses: actions/setup-node@v6 (lines 31, 41)
- uses: readmeio/rdme@next (line 109)

.github/workflows/codeql-analysis.yml:
- uses: actions/checkout@v7 (line 17)
- uses: github/codeql-action/init@v4 (line 20)
- uses: github/codeql-action/analyze@v4 (line 24)

.github/workflows/docs.yml:
- uses: actions/checkout@v7 (line 19)
- uses: jacobtomlinson/gha-find-replace@v3 (lines 36, 43)
- uses: readmeio/rdme@main (line 67)

.github/workflows/lint-pr-title.yml:
- uses: amannn/action-semantic-pull-request@v6 (line 16)

.github/workflows/release.yml:
- uses: actions/checkout@v7 (line 22)
- uses: actions/setup-node@v6 (lines 27, 50)
- uses: ad-m/github-push-action@master (line 42)

.github/workflows/simple.yml:
- uses: actions/checkout@v7 (line 13)

Locations:

- `.github/workflows/ci.yml:28`
- `.github/workflows/codeql-analysis.yml:17`
- `.github/workflows/docs.yml:19`
- `.github/workflows/lint-pr-title.yml:16`
- `.github/workflows/release.yml:22`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

ci.yml, docs.yml, and simple.yml have no top-level `permissions:` key and no job-level `permissions:` keys on any of their jobs. Without explicit permissions, workflows inherit the default repository permissions (which may be read/write), violating the principle of least privilege.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references across 6 workflow files by replacing mutable tags/branches with pinned 40-character commit SHAs (preserving the original tag in a comment). Added top-level `permissions: {}` to ci.yml, docs.yml, and simple.yml which were missing permissions blocks. The codeql-analysis.yml, lint-pr-title.yml, and release.yml already had appropriate permissions defined. All SHAs were resolved via lookup_action_sha.

