<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.6

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.6** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of immutable SHA digests, making them vulnerable to supply-chain attacks.

.github/workflows/ci.yml: actions/checkout@v7 (×4), actions/setup-node@v7 (×2), readmeio/rdme@next
.github/workflows/codeql-analysis.yml: actions/checkout@v7, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3
.github/workflows/docs.yml: actions/checkout@v7, jacobtomlinson/gha-find-replace@v3 (×2), readmeio/rdme@main
.github/workflows/lint-pr-title.yml: amannn/action-semantic-pull-request@v6
.github/workflows/release.yml: actions/checkout@v7, actions/setup-node@v7 (×2), ad-m/github-push-action@master
.github/workflows/simple.yml: actions/checkout@v7

All of these should be pinned to a full 40-character commit SHA (e.g. actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4).

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:38`
- `.github/workflows/ci.yml:39`
- `.github/workflows/ci.yml:52`
- `.github/workflows/ci.yml:57`
- `.github/workflows/ci.yml:107`
- `.github/workflows/codeql-analysis.yml:17`
- `.github/workflows/codeql-analysis.yml:20`
- `.github/workflows/codeql-analysis.yml:24`
- `.github/workflows/docs.yml:15`
- `.github/workflows/docs.yml:37`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:65`
- `.github/workflows/lint-pr-title.yml:14`
- `.github/workflows/release.yml:20`
- `.github/workflows/release.yml:25`
- `.github/workflows/release.yml:43`
- `.github/workflows/release.yml:52`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

These workflow files have no top-level `permissions:` key and no job-level `permissions:` key on any of their jobs. Without explicit permissions, the GITHUB_TOKEN is granted its default (potentially broad) permissions, which violates the principle of least privilege.

- .github/workflows/ci.yml: jobs 'build', 'lint', and 'action' all lack permissions
- .github/workflows/docs.yml: job 'sync' lacks permissions
- .github/workflows/simple.yml: job 'simple' lacks permissions

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 20 unpinned action references across 6 workflow files by pinning each to its full 40-character commit SHA (with the original tag preserved as a comment). Added `permissions: contents: read` to the 5 jobs that lacked permissions blocks: build/lint/action in ci.yml, sync in docs.yml, and simple in simple.yml. The codeql-analysis.yml, lint-pr-title.yml, and release.yml already had appropriate permissions blocks.

