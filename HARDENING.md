<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.10.0-next.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.10.0-next.3** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of immutable full-length commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to a malicious commit. Affected references include: actions/checkout@v7, actions/setup-node@v7, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3, jacobtomlinson/gha-find-replace@v3, amannn/action-semantic-pull-request@v6, ad-m/github-push-action@master, readmeio/rdme@next, readmeio/rdme@main.

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:41`
- `.github/workflows/ci.yml:52`
- `.github/workflows/ci.yml:56`
- `.github/workflows/ci.yml:88`
- `.github/workflows/codeql-analysis.yml:19`
- `.github/workflows/codeql-analysis.yml:22`
- `.github/workflows/codeql-analysis.yml:27`
- `.github/workflows/docs.yml:17`
- `.github/workflows/docs.yml:38`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:64`
- `.github/workflows/lint-pr-title.yml:16`
- `.github/workflows/release.yml:20`
- `.github/workflows/release.yml:25`
- `.github/workflows/release.yml:42`
- `.github/workflows/release.yml:47`
- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

These workflow files have no top-level 'permissions:' key and no job-level 'permissions:' key on any job. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions (often read/write for all scopes), violating the principle of least privilege.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 20 unpinned action references across 6 workflow files by pinning each to its full commit SHA (resolved via lookup_action_sha). Added top-level 'permissions: contents: read' to ci.yml, docs.yml, and simple.yml which were missing permissions blocks. The codeql-analysis.yml, lint-pr-title.yml, and release.yml already had appropriate permissions blocks and only needed their action references pinned.

