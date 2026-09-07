<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable tags or branch names instead of pinned 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced action is compromised or its tag is moved.

Failing references:
- ci.yml: actions/checkout@v6, actions/setup-node@v6 (×2), readmeio/rdme@next
- codeql-analysis.yml: actions/checkout@v6, github/codeql-action/init@v4, github/codeql-action/analyze@v4
- docs.yml: actions/checkout@v6, jacobtomlinson/gha-find-replace@v3 (×2), readmeio/rdme@main
- lint-pr-title.yml: amannn/action-semantic-pull-request@v6
- release.yml: actions/checkout@v6, actions/setup-node@v6 (×2), ad-m/github-push-action@master
- simple.yml: actions/checkout@v6

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:43`
- `.github/workflows/ci.yml:44`
- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:22`
- `.github/workflows/codeql-analysis.yml:27`
- `.github/workflows/docs.yml:18`
- `.github/workflows/docs.yml:42`
- `.github/workflows/docs.yml:49`
- `.github/workflows/docs.yml:73`
- `.github/workflows/lint-pr-title.yml:13`
- `.github/workflows/release.yml:20`
- `.github/workflows/release.yml:27`
- `.github/workflows/release.yml:52`
- `.github/workflows/release.yml:62`
- `.github/workflows/simple.yml:14`

### missing-permissions (severity: medium)

These workflow files have no top-level `permissions:` key and no job-level `permissions:` key on any of their jobs. Without explicit permissions, the GITHUB_TOKEN is granted its default (often broad) permissions, violating the principle of least privilege.

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all unpinned action references to full 40-char commit SHAs: actions/checkout@v6 → d23441a48e516b6c34aea4fa41551a30e30af803, actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38, github/codeql-action/init@v4 and analyze@v4 → cdf488f595d80d6e07e03d4674febd5ab45fa938, jacobtomlinson/gha-find-replace@v3 → 2ff30f644d2e0078fc028beb9193f5ff0dcad39e, readmeio/rdme@main → 750fc4ad47b4abe70d8ec5b594319a5d8dccf9da, readmeio/rdme@next → 8c7d0c40f34e375bd7b0098a98a513530dfa113f, amannn/action-semantic-pull-request@v6 → 48f256284bd46cdaab1048c3721360e808335d50, ad-m/github-push-action@master → 881a6320fdb16eb5318c5054f31c218aec2b324c. Added top-level `permissions: contents: read` to ci.yml, docs.yml, and simple.yml which were missing permissions blocks. codeql-analysis.yml, lint-pr-title.yml, and release.yml already had appropriate permissions blocks.

