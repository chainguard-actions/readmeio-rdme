<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.10.0-next.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.10.0-next.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable tags (version strings, branch names) instead of pinned 40-character commit SHAs. This exposes the workflows to supply-chain attacks where a tag could be silently moved to point to malicious code.

ci.yml: actions/checkout@v7 (×4), actions/setup-node@v7 (×2), readmeio/rdme@next
codeql-analysis.yml: actions/checkout@v7, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3
docs.yml: actions/checkout@v7, jacobtomlinson/gha-find-replace@v3 (×2), readmeio/rdme@main
release.yml: actions/checkout@v7, actions/setup-node@v7 (×2), ad-m/github-push-action@master
lint-pr-title.yml: amannn/action-semantic-pull-request@v6
simple.yml: actions/checkout@v7

Locations:

- `.github/workflows/ci.yml:26`
- `.github/workflows/ci.yml:29`
- `.github/workflows/ci.yml:37`
- `.github/workflows/ci.yml:38`
- `.github/workflows/ci.yml:52`
- `.github/workflows/ci.yml:57`
- `.github/workflows/ci.yml:113`
- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:25`
- `.github/workflows/docs.yml:19`
- `.github/workflows/docs.yml:42`
- `.github/workflows/docs.yml:49`
- `.github/workflows/docs.yml:73`
- `.github/workflows/release.yml:21`
- `.github/workflows/release.yml:25`
- `.github/workflows/release.yml:42`
- `.github/workflows/release.yml:52`
- `.github/workflows/lint-pr-title.yml:13`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

Three workflow files have no top-level `permissions:` block and no job-level `permissions:` blocks on any of their jobs. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions (often read/write for all scopes), violating the principle of least privilege.

- ci.yml: no permissions declared for jobs 'build', 'lint', or 'action'
- docs.yml: no permissions declared for job 'sync'
- simple.yml: no permissions declared for job 'simple'

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all 9 unique action references across 6 workflow files to their full 40-character commit SHAs using lookup_action_sha. Added job-level `permissions: contents: read` blocks to the 3 jobs in ci.yml (build, lint, action), the sync job in docs.yml, and the simple job in simple.yml. Files that already had permissions (codeql-analysis.yml, release.yml, lint-pr-title.yml) were only updated to pin their action references.

