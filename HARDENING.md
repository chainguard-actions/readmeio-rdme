<!-- markdownlint-disable -->

# Hardening Report: readmeio--rdme/v10

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **readmeio--rdme/v10** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable tags or branch names instead of pinned 40-character commit SHAs, making them vulnerable to supply-chain attacks if the referenced action is compromised or its tag is moved.

.github/workflows/ci.yml: actions/checkout@v7 (lines 27, 40, 55, 60), actions/setup-node@v6 (lines 30, 41), readmeio/rdme@next (line 119)
.github/workflows/codeql-analysis.yml: actions/checkout@v7 (line 17), github/codeql-action/init@v4 (line 20), github/codeql-action/analyze@v4 (line 24)
.github/workflows/docs.yml: actions/checkout@v7 (line 19), jacobtomlinson/gha-find-replace@v3 (lines 43, 49), readmeio/rdme@main (line 72)
.github/workflows/lint-pr-title.yml: amannn/action-semantic-pull-request@v6 (line 14)
.github/workflows/release.yml: actions/checkout@v7 (line 23), actions/setup-node@v6 (lines 27, 55), ad-m/github-push-action@master (line 44)
.github/workflows/simple.yml: actions/checkout@v7 (line 12)

Locations:

- `.github/workflows/ci.yml:27`
- `.github/workflows/ci.yml:30`
- `.github/workflows/ci.yml:40`
- `.github/workflows/ci.yml:41`
- `.github/workflows/ci.yml:55`
- `.github/workflows/ci.yml:60`
- `.github/workflows/ci.yml:119`
- `.github/workflows/codeql-analysis.yml:17`
- `.github/workflows/codeql-analysis.yml:20`
- `.github/workflows/codeql-analysis.yml:24`
- `.github/workflows/docs.yml:19`
- `.github/workflows/docs.yml:43`
- `.github/workflows/docs.yml:49`
- `.github/workflows/docs.yml:72`
- `.github/workflows/lint-pr-title.yml:14`
- `.github/workflows/release.yml:23`
- `.github/workflows/release.yml:27`
- `.github/workflows/release.yml:44`
- `.github/workflows/release.yml:55`
- `.github/workflows/simple.yml:12`

### missing-permissions (severity: medium)

Three workflow files have no top-level `permissions:` key and no job-level `permissions:` key on any of their jobs. Without explicit permissions, GitHub Actions defaults to the repository's default token permissions (which may be broad), violating the principle of least privilege.

- .github/workflows/ci.yml: no permissions defined for jobs: build, lint, action
- .github/workflows/docs.yml: no permissions defined for job: sync
- .github/workflows/simple.yml: no permissions defined for job: simple

Locations:

- `.github/workflows/ci.yml:1`
- `.github/workflows/docs.yml:1`
- `.github/workflows/simple.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions

**Notes:**

Fixed all unpinned action references across 6 workflow files by pinning to full 40-character commit SHAs with original tags preserved as comments. Added permissions blocks (contents: read) to the 3 workflow files that were missing them (ci.yml - per job, docs.yml - per job, simple.yml - per job). Specific pins applied: actions/checkout@v7 → 3d3c42e5aac5ba805825da76410c181273ba90b1, actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38, readmeio/rdme@next and @main → 2ba919093bf3e008ce09a1d56c9b2a9982cbd7d9, github/codeql-action/init@v4 and analyze@v4 → 7188fc363630916deb702c7fdcf4e481b751f97a, jacobtomlinson/gha-find-replace@v3 → 2ff30f644d2e0078fc028beb9193f5ff0dcad39e, amannn/action-semantic-pull-request@v6 → 48f256284bd46cdaab1048c3721360e808335d50, ad-m/github-push-action@master → 881a6320fdb16eb5318c5054f31c218aec2b324c.

