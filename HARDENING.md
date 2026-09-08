<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10.9.1-next.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10.9.1-next.1** was hardened automatically. 9 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of pinned 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to a malicious commit.

Failing references:
- actions/checkout@v6
- actions/setup-node@v6
- readmeio/rdme@next

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:41`
- `.github/workflows/ci.yml:55`
- `.github/workflows/ci.yml:56`
- `.github/workflows/ci.yml:107`

### unpinned-uses (severity: high)

Workflow references actions using mutable version tags instead of pinned 40-character commit SHAs.

Failing references:
- actions/checkout@v6
- github/codeql-action/init@v4
- github/codeql-action/analyze@v4

Locations:

- `.github/workflows/codeql-analysis.yml:18`
- `.github/workflows/codeql-analysis.yml:21`
- `.github/workflows/codeql-analysis.yml:26`

### unpinned-uses (severity: high)

Workflow references actions using mutable version tags and branch names instead of pinned 40-character commit SHAs.

Failing references:
- actions/checkout@v6
- jacobtomlinson/gha-find-replace@v3 (used twice)
- readmeio/rdme@main

Locations:

- `.github/workflows/docs.yml:18`
- `.github/workflows/docs.yml:42`
- `.github/workflows/docs.yml:49`
- `.github/workflows/docs.yml:82`

### unpinned-uses (severity: high)

Workflow references an action using a mutable version tag instead of a pinned 40-character commit SHA.

Failing reference:
- amannn/action-semantic-pull-request@v6

Locations:

- `.github/workflows/lint-pr-title.yml:13`

### unpinned-uses (severity: high)

Workflow references actions using mutable version tags and a branch name instead of pinned 40-character commit SHAs.

Failing references:
- actions/checkout@v6
- actions/setup-node@v6 (used twice)
- ad-m/github-push-action@master

Locations:

- `.github/workflows/release.yml:22`
- `.github/workflows/release.yml:28`
- `.github/workflows/release.yml:48`
- `.github/workflows/release.yml:57`

### unpinned-uses (severity: high)

Workflow references an action using a mutable version tag instead of a pinned 40-character commit SHA.

Failing reference:
- actions/checkout@v6

Locations:

- `.github/workflows/simple.yml:14`

### missing-permissions (severity: medium)

The workflow file has no top-level `permissions:` key and no job-level `permissions:` key on any of its jobs (build, lint, action). Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/ci.yml:1`

### missing-permissions (severity: medium)

The workflow file has no top-level `permissions:` key and no job-level `permissions:` key on its `sync` job. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/docs.yml:1`

### missing-permissions (severity: medium)

The workflow file has no top-level `permissions:` key and no job-level `permissions:` key on its `simple` job. Without explicit permissions, the workflow inherits the default repository permissions, which may be overly broad.

Locations:

- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Pinned all action references to full 40-character commit SHAs across 6 workflow files: ci.yml (actions/checkout@v6→d23441a, actions/setup-node@v6→249970, readmeio/rdme@next→8c7d0c4), codeql-analysis.yml (actions/checkout@v6→d23441a, github/codeql-action/init@v4→cdf488f, github/codeql-action/analyze@v4→cdf488f), docs.yml (actions/checkout@v6→d23441a, jacobtomlinson/gha-find-replace@v3→2ff30f6 x2, readmeio/rdme@main→750fc4a), lint-pr-title.yml (amannn/action-semantic-pull-request@v6→48f2562), release.yml (actions/checkout@v6→d23441a, actions/setup-node@v6→249970 x2, ad-m/github-push-action@master→881a632), simple.yml (actions/checkout@v6→d23441a). Added top-level `permissions: contents: read` to ci.yml, docs.yml, and simple.yml which were missing permissions blocks.

