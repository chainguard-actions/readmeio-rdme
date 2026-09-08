<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.10.0-next.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.10.0-next.1** was hardened automatically. 9 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files use action references pinned to mutable tags or branch names instead of immutable 40-character commit SHAs, making them vulnerable to supply-chain attacks. Failing references include: actions/checkout@v7, actions/setup-node@v7, readmeio/rdme@next.

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:42`
- `.github/workflows/ci.yml:43`
- `.github/workflows/ci.yml:55`
- `.github/workflows/ci.yml:56`

### unpinned-uses (severity: high)

codeql-analysis.yml uses action references pinned to mutable tags: actions/checkout@v7, github/codeql-action/init@v4.37.3, github/codeql-action/analyze@v4.37.3.

Locations:

- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:26`

### unpinned-uses (severity: high)

docs.yml uses action references pinned to mutable tags or branch names: actions/checkout@v7, jacobtomlinson/gha-find-replace@v3, readmeio/rdme@main.

Locations:

- `.github/workflows/docs.yml:18`
- `.github/workflows/docs.yml:33`
- `.github/workflows/docs.yml:44`
- `.github/workflows/docs.yml:55`

### unpinned-uses (severity: high)

lint-pr-title.yml uses action reference pinned to a mutable tag: amannn/action-semantic-pull-request@v6.

Locations:

- `.github/workflows/lint-pr-title.yml:13`

### unpinned-uses (severity: high)

release.yml uses action references pinned to mutable tags or branch names: actions/checkout@v7, actions/setup-node@v7, ad-m/github-push-action@master.

Locations:

- `.github/workflows/release.yml:21`
- `.github/workflows/release.yml:26`
- `.github/workflows/release.yml:44`
- `.github/workflows/release.yml:52`

### unpinned-uses (severity: high)

simple.yml uses action reference pinned to a mutable tag: actions/checkout@v7.

Locations:

- `.github/workflows/simple.yml:13`

### missing-permissions (severity: medium)

ci.yml has no top-level `permissions:` block and none of its jobs (build, lint, action) define job-level permissions. Without explicit permissions, the workflow inherits the default repository token permissions, which may be overly broad.

Locations:

- `.github/workflows/ci.yml:1`

### missing-permissions (severity: medium)

docs.yml has no top-level `permissions:` block and its only job (sync) has no job-level permissions block. Without explicit permissions, the workflow inherits the default repository token permissions, which may be overly broad.

Locations:

- `.github/workflows/docs.yml:1`

### missing-permissions (severity: medium)

simple.yml has no top-level `permissions:` block and its only job (simple) has no job-level permissions block. Without explicit permissions, the workflow inherits the default repository token permissions, which may be overly broad.

Locations:

- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all 6 workflow files:

**ci.yml**: Added `permissions: {}` top-level block. Pinned actions/checkout@v7 → @3d3c42e5aac5ba805825da76410c181273ba90b1, actions/setup-node@v7 → @820762786026740c76f36085b0efc47a31fe5020, readmeio/rdme@next → @8c7d0c40f34e375bd7b0098a98a513530dfa113f.

**codeql-analysis.yml**: Pinned actions/checkout@v7 → @3d3c42e5aac5ba805825da76410c181273ba90b1, github/codeql-action/init@v4.37.3 → @e4fba868fa4b1b91e1fdab776edc8cfbe6e9fb81, github/codeql-action/analyze@v4.37.3 → @e4fba868fa4b1b91e1fdab776edc8cfbe6e9fb81. (Already had job-level permissions.)

**docs.yml**: Added `permissions: {}` top-level block. Pinned actions/checkout@v7 → @3d3c42e5aac5ba805825da76410c181273ba90b1, jacobtomlinson/gha-find-replace@v3 → @2ff30f644d2e0078fc028beb9193f5ff0dcad39e (×2), readmeio/rdme@main → @750fc4ad47b4abe70d8ec5b594319a5d8dccf9da.

**lint-pr-title.yml**: Pinned amannn/action-semantic-pull-request@v6 → @48f256284bd46cdaab1048c3721360e808335d50. (Already had permissions block.)

**release.yml**: Pinned actions/checkout@v7 → @3d3c42e5aac5ba805825da76410c181273ba90b1, actions/setup-node@v7 → @820762786026740c76f36085b0efc47a31fe5020 (×2), ad-m/github-push-action@master → @881a6320fdb16eb5318c5054f31c218aec2b324c. (Already had permissions block.)

**simple.yml**: Added `permissions: {}` top-level block. Pinned actions/checkout@v7 → @3d3c42e5aac5ba805825da76410c181273ba90b1.

