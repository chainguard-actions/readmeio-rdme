<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **readmeio--rdme/v10** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external GitHub Actions using mutable tags or branch names instead of immutable 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to a malicious commit.

ci.yml: actions/checkout@v7 (lines 27, 39, 55, 59), actions/setup-node@v6 (lines 30, 40), readmeio/rdme@next (line 118)
codeql-analysis.yml: actions/checkout@v7 (line 21), github/codeql-action/init@v4 (line 24), github/codeql-action/analyze@v4 (line 30)
docs.yml: actions/checkout@v7 (line 19), jacobtomlinson/gha-find-replace@v3 (lines 44, 51), readmeio/rdme@main (line 73)
lint-pr-title.yml: amannn/action-semantic-pull-request@v6 (line 17)
release.yml: actions/checkout@v7 (line 22), actions/setup-node@v6 (lines 26, 57), ad-m/github-push-action@master (line 44)
simple.yml: actions/checkout@v7 (line 13)

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:39`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:55`
- `.github/workflows/ci.yml:59`
- `.github/workflows/ci.yml:118`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:24`
- `.github/workflows/codeql-analysis.yml:30`
- `.github/workflows/docs.yml:19`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:51`
- `.github/workflows/docs.yml:73`
- `.github/workflows/lint-pr-title.yml:17`
- `.github/workflows/release.yml:22`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:44`
- `.github/workflows/release.yml:57`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

Three workflow files have no top-level 'permissions:' block and no job-level 'permissions:' blocks on any of their jobs. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions, which may be overly broad (write access to contents by default on many repositories). Each workflow should declare minimal required permissions.

- ci.yml: three jobs (build, lint, action) with no permissions declared
- docs.yml: one job (sync) with no permissions declared
- simple.yml: one job (simple) with no permissions declared

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 20 unpinned action references across 6 workflow files by replacing mutable tags/branches with full 40-character commit SHAs (preserving original tag as comment). Added top-level 'permissions: contents: read' blocks to ci.yml, docs.yml, and simple.yml which lacked any permissions declarations. The other three workflow files (codeql-analysis.yml, lint-pr-title.yml, release.yml) already had appropriate permissions blocks and only needed action pinning fixes.

