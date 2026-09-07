<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.8.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.8.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable tags or branch names instead of immutable 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to a malicious commit.

- ci.yml: actions/checkout@v6, actions/setup-node@v6, readmeio/rdme@next
- codeql-analysis.yml: actions/checkout@v6, github/codeql-action/init@v4, github/codeql-action/analyze@v4
- docs.yml: actions/checkout@v6, jacobtomlinson/gha-find-replace@v3, readmeio/rdme@main
- lint-pr-title.yml: amannn/action-semantic-pull-request@v6
- release.yml: actions/checkout@v6, actions/setup-node@v6, ad-m/github-push-action@master
- simple.yml: actions/checkout@v6

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:42`
- `.github/workflows/ci.yml:43`
- `.github/workflows/ci.yml:56`
- `.github/workflows/ci.yml:61`
- `.github/workflows/ci.yml:100`
- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:26`
- `.github/workflows/docs.yml:19`
- `.github/workflows/docs.yml:42`
- `.github/workflows/docs.yml:49`
- `.github/workflows/docs.yml:72`
- `.github/workflows/lint-pr-title.yml:14`
- `.github/workflows/release.yml:20`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:46`
- `.github/workflows/release.yml:55`
- `.github/workflows/simple.yml:14`

### missing-permissions (severity: medium)

Three workflow files have no top-level `permissions:` key and no job-level `permissions:` keys on any of their jobs. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions, which may be overly broad (e.g., write access to contents). Explicit minimal permissions should be declared.

- ci.yml: jobs 'build', 'lint', and 'action' all lack permissions
- docs.yml: job 'sync' lacks permissions
- simple.yml: job 'simple' lacks permissions

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all external action references to full 40-character commit SHAs with original tags preserved as comments. Added `permissions: contents: read` to all jobs in ci.yml (build, lint, action), docs.yml (sync), and simple.yml (simple) that lacked explicit permissions. Files that already had permissions blocks (codeql-analysis.yml, lint-pr-title.yml, release.yml) were left with their existing permissions and only had their action references pinned.

