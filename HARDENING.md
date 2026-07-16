<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **readmeio--rdme/v10.9.2** was hardened automatically. 9 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

All `uses:` references in ci.yml use version tags instead of full 40-character SHA pins, making the workflow vulnerable to supply-chain attacks if those tags are moved. Unpinned references: `actions/checkout@v7` (multiple steps), `actions/setup-node@v6` (multiple steps), `readmeio/rdme@next`.

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:43`
- `.github/workflows/ci.yml:44`
- `.github/workflows/ci.yml:53`
- `.github/workflows/ci.yml:58`
- `.github/workflows/ci.yml:100`

### unpinned-uses (severity: high)

All `uses:` references in codeql-analysis.yml use version tags instead of full 40-character SHA pins. Unpinned references: `actions/checkout@v7`, `github/codeql-action/init@v4`, `github/codeql-action/analyze@v4`.

Locations:

- `.github/workflows/codeql-analysis.yml:20`
- `.github/workflows/codeql-analysis.yml:23`
- `.github/workflows/codeql-analysis.yml:27`

### unpinned-uses (severity: high)

All `uses:` references in docs.yml use version tags or branch names instead of full 40-character SHA pins. Unpinned references: `actions/checkout@v7`, `jacobtomlinson/gha-find-replace@v3` (two steps), `readmeio/rdme@main` (branch reference — especially dangerous).

Locations:

- `.github/workflows/docs.yml:16`
- `.github/workflows/docs.yml:37`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:68`

### unpinned-uses (severity: high)

The `uses:` reference in lint-pr-title.yml uses a version tag instead of a full 40-character SHA pin. Unpinned reference: `amannn/action-semantic-pull-request@v6`.

Locations:

- `.github/workflows/lint-pr-title.yml:14`

### unpinned-uses (severity: high)

All `uses:` references in release.yml use version tags or branch names instead of full 40-character SHA pins. Unpinned references: `actions/checkout@v7`, `actions/setup-node@v6` (two steps), `ad-m/github-push-action@master` (branch reference — especially dangerous).

Locations:

- `.github/workflows/release.yml:20`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:48`
- `.github/workflows/release.yml:57`

### unpinned-uses (severity: high)

The `uses:` reference in simple.yml uses a version tag instead of a full 40-character SHA pin. Unpinned reference: `actions/checkout@v7`.

Locations:

- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

ci.yml has no top-level `permissions:` key and none of its three jobs (build, lint, action) define job-level `permissions:`. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad (e.g., write access to contents).

Locations:

- `.github/workflows/ci.yml:1`

### missing-permissions (severity: medium)

docs.yml has no top-level `permissions:` key and its only job (sync) has no job-level `permissions:`. Without explicit permissions, the workflow inherits the default repository permissions.

Locations:

- `.github/workflows/docs.yml:1`

### missing-permissions (severity: medium)

simple.yml has no top-level `permissions:` key and its only job (simple) has no job-level `permissions:`. Without explicit permissions, the workflow inherits the default repository permissions.

Locations:

- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned `uses:` references across 6 workflow files by pinning to full 40-character commit SHAs (with tag/branch name preserved as comments): actions/checkout@v7 → 9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0, actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38, readmeio/rdme@next → d91b0a32de5cc780c43564c66e70175e5d1a77dd, github/codeql-action/init@v4 and analyze@v4 → 99df26d4f13ea111d4ec1a7dddef6063f76b97e9, jacobtomlinson/gha-find-replace@v3 → 2ff30f644d2e0078fc028beb9193f5ff0dcad39e, readmeio/rdme@main → 460da9b8aa6b7bbd6bf774fb2d66b3f0b9030b12, amannn/action-semantic-pull-request@v6 → 48f256284bd46cdaab1048c3721360e808335d50, ad-m/github-push-action@master → 881a6320fdb16eb5318c5054f31c218aec2b324c. Added top-level `permissions: contents: read` to ci.yml, docs.yml, and simple.yml. The codeql-analysis.yml and lint-pr-title.yml already had appropriate permissions blocks; release.yml already had a permissions block with the necessary write permissions for its release operations.

