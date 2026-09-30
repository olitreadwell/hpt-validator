# CMSgov/hpt-validator context
> refreshed 2026-09-30 | upstream default: main @ 5b7c249df226c28da62a0d9fa0b0308207ae1aac

## Identity & policies
- upstream: CMSgov/hpt-validator, default branch `main`, TypeScript (ESM, Node 20), English-first: yes (README/CONTRIBUTING/SECURITY all in US English, CC0 public-domain text).
- CLA/DCO: none. CONTRIBUTING states contributions are released under the CC0 dedication; no CLA bot, no DCO sign-off requirement.
- AI-assisted PR policy: unstated. No AI/LLM/generated wording in CONTRIBUTING, README, SECURITY, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE.md` or the workflows; no `ai-generated`/`no-ai` labels. Org default repo `CMSgov/.github` does not exist (API 404), so there is no org-level community-health file.
- signed commits required: no evidence (upstream and fork both accept unsigned commits; branch-protection API returns 404 for this token, and the policy passport `signed_commits_required: false` was rechecked live).
- PR template: `.github/PULL_REQUEST_TEMPLATE.md` (exists; fill it verbatim). NOTE: `vetted-repos.jsonl` still records `pr_template_present: false` — stale, corrected here.
- external tracker: github (no Jira/Linear pointer anywhere in the repo).

## Conventions (verified from merged PRs)
- branch naming: kebab-case descriptions dominate (`continue-on-general-data-errors`, `csv-handle-small-rows`, `detect-unreplaced-placeholders`, `csv-ms-ltc-drg`); some carry a type prefix (`fix/csv-cell-name`, `chore/date-validation-utc`, `fix/remove-bom-whitespace`). No single mandated pattern.
- commit style: plain imperative sentence, not Conventional Commits (`ignoring blank headers as part of the processing and validation step`, `CsvHelpers: validate MM/DD/YYYY dates in UTC`); merge commits carry the PR number.
- test: `npm run test` = `vitest run --coverage`. lint: `npm run lint` = `tsc && eslint "**/*.{js,ts}"`. style: `npm run prettier`. build: `npm run build` = `tsc` + copyfiles of the schemas.
- CI that gates merge: `.github/workflows/ci.yml` on Node 20.x — install (`npm ci`), linter, prettier check, tests. Fork Actions are enabled and the same CI runs on fork branches (run 32957165376, `success`).
- how outside PRs land: yes, outsiders get merged. #97 (arpitjain099, external) opened 2026-06-27 and merged 2026-08-13 (~7 weeks) after maintainer review. Outside merges are focused code changes, not drive-bys.

## Maintainer picture
- active: mint-thompson (primary, most merged PRs), shaselton-usds (review/merge + version bumps). patsier-cms appears in history.
- in-flight work they own: 2026/v3.0.0 data-dictionary rules (PRs #77, #89, #96, #97, #98). Avoid reworking those areas.
- response latency: reviews happen in days-to-weeks; no stale-bot, issues/PRs are triaged by hand.

## Issue-area health
- open human issues: none. Only dependabot PR #87 (lodash bump) and PR #75 (removeBOM, external, still open and unmerged since 2025-08-05).
- open + accepted + unassigned issues we could pick: none (zero non-bot open issues). There is therefore no documented/approved issue to work; a self-found gap is the only route.
- PR #75 is CLAIMED territory: `removeBOM` in `src/utils.ts` still trims whitespace, and #75 already proposes the correct `Buffer.isBuffer`/`slice(3)`/`charCodeAt(0xFEFF)` fix. Do not re-touch it.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- 2026-08-26 fork PR #1 (`fix/remove-bom-whitespace`) — closed (superseded): upstream #75 already covers `removeBOM`; the fork attempt also targeted the wrong case (string vs Buffer). Lesson: check open upstream PRs before coding.
- 2026-09-26 CMSgov/hpt-validator — error (engine exited 1, no trace left).
- 2026-09-27 CMSgov/hpt-validator — error (engine exited 1, no trace left).
- 2026-09-30 self-found gap — pr-opened: fork PR #2 (https://github.com/olitreadwell/hpt-validator/pull/2, branch `remove-unused-other-methodology-notes-error`, commit 8b57b501e7f53ed27413e720016cc5368b6dea9f) removes the unreachable `src/errors/csv/OtherMethodologyNotesError.ts` module. 1 file, +0/-11; base = fork `main`; CI run 36767135057 green; mergeable clean. Never opened upstream.

## Mined gaps (discovered, not yet attempted)
- 2026-09-30 clean-code: `src/errors/csv/OtherMethodologyNotesError.ts` is unreachable. Added by #74 (`git log --diff-filter=A`), superseded in #77 when the same class was redefined in `NotesRequiredError.ts`; `src/errors/csv/index.ts` never re-exports the old file and no file (src, test, or any CMSgov repo via code search) imports it. Repro: `grep -rn OtherMethodologyNotesError src` -> only `NotesRequiredError.ts` + `CsvValidator.ts`; `npm run test` reports the file at 0% statements/lines. Expected: no duplicate module; the class stays exported from `errors/csv/index.ts` via `NotesRequiredError.ts` with the identical message. Dedupe: GitHub search over upstream issues/PRs for `OtherMethodologyNotesError` -> 0 results; no upstream PR removes it. — status: done (fork PR #2 open, CI green; see gap-ledger row above)
- 2026-09-30 docs: `CONTRIBUTING.md` "Testing Conventions" says "We use [ava](https://github.com/avajs/ava) for tests" but the project moved to vitest in #74 (`package.json` has no ava, `npm run test` runs vitest, all specs use vitest). Verifiable against `package.json`. Dedupe: no upstream issue/PR mentions it. — status: proposed
- 2026-09-30 tests-ci: `src/csv.ts`, `src/json.ts` and `src/filename.ts` (the public `validateCsv`/`validateJson`/`validateFilename` entry points) have no direct spec; coverage lists them at 0%. Thin wrappers for csv/json, but `validateFilename`'s regex is untested. — status: proposed
