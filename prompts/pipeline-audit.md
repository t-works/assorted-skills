# Pipeline Doctor — MEGA course workspace

Audit run: 2026-10-28. Prompt: `docs/pipeline-doctor.md`.

**Apply status (2026-10-28):** P01–P04 were applied after this audit. `AGENTS.md` is now 7 lines; `.agents/skills/read/scripts/log-entry.mjs` and `.agents/skills/handoff/SKILL.md` exist. P02 was applied with three corrections found by its own verification: the key pattern accepts hyphenated `sk-or-v1-…` keys, the URL is masked as well as the body, and the prefix capture is 3 characters after the fixed prefix so the output matches `first6…last4`. The body below is the pre-apply record.

Two roots are treated as one pipeline:

- project root: `C:/dev/mega/mcp`
- global root: `~/.pi/agent` (agent definition, settings, MCP config)

## 1. Scope and coverage

| Item | Value |
|---|---|
| Session store | `~/.pi/agent/sessions` |
| Sessions discovered | 104 |
| Sessions excluded | 96 — other project roots; they loaded different instruction files, so their friction cannot be attributed to this pipeline |
| Sessions eligible | 8 — all sessions whose `cwd` is this project, 2026-10-26 to 2026-10-28 |
| Window | 3 days (2026-10-26 → 2026-10-28); this is the project's whole history, not a 30-day sample |
| Task episodes | 19 |
| Artifacts inventoried | 15 |
| Artifacts loaded at least once | 14 |
| Always-loaded lines | 9 (`AGENTS.md`; the global agent file is advertised, not loaded every turn) |
| Episodes with signals | 13 |

The store has 104 sessions across 13 project roots. Only 8 belong to this pipeline. The other 96 are excluded by the operator's scope ("this project"), not because they were unreadable. This is a narrow window: two course challenges and a tooling investigation. Every proposal is provisional.

### Capabilities

| Category | Visible | Note |
|---|---|---|
| `turns` | yes | ordered user, assistant, tool-call and tool-result messages |
| `loaded-context` | yes | system sections per session; the 2026-10-28 19:01 session enumerates the active blocks |
| `retrieval` | yes | reads, curls and tool results are recorded |
| `mutation` | yes | `write` and `edit` calls with paths |
| `commands` | yes | `bash` calls, output and exit codes |
| `delegation` | yes | a CLI child run is recorded in the 01:17 session; native subagent briefs are absent |
| `compaction` | no | no compaction or truncation events are recorded |
| `approval` | yes | approvals appear as user turns (`yes`), not as structured permission events |
| `timing` | yes | timestamps and per-call durations |

### Artifacts

| ID | Layer | Path (relative to root) | Size | Status | Loaded in |
|---|---|---|---|---|---|
| A01 | `project-instructions` | `AGENTS.md` | 9 lines | used | every session |
| A02 | `skill` | `.agents/skills/read/SKILL.md` | 53 lines | used | 02:52, 03:25 |
| A03 | `skill` | `.agents/skills/read/README.md` | 55 lines | never-loaded | — |
| A04 | `skill` | `.agents/skills/read/scripts/find-contract.mjs` | 427 lines | used | 02:52 |
| A05 | `skill` | `.agents/skills/read/scripts/cut-diff.mjs` | 338 lines | used | 2026-10-26 (self-test) |
| A06 | `agent-prompt` | `~/.pi/agent/agents/summarize.md` | 19 lines | used | 01:17 (CLI child) |
| A07 | `workflow-script` | `s01e02/report.py` | 42 lines | used | 02:52, 03:25 |
| A08 | `template` | `s01e02/handoff_prompt.txt` | 6 lines | used | 03:25 |
| A09 | `operator-instruction` | `docs/what-I-see.md` | 2 lines | used | 03:37, 19:01 |
| A10 | `skill` | `docs/pipeline-doctor.md` | 507 lines | used | 21:18 |
| A11 | `model-choice` | `~/.pi/agent/settings.json` | 9 lines | used | every session |
| A12 | `tool-schema` | `~/.pi/agent/mcp.json` | 7 lines | used | every session |
| A13 | `workflow-script` | `s01e01/cdp.js` | 76 lines | used | 2026-10-26 |
| A14 | `workflow-script` | `s01e01/post.js` | 15 lines | used | 2026-10-26 |
| A15 | `workflow-script` | `s01e01/compact.js` | 22 lines | used | 2026-10-26 |

`A03` is human-facing install documentation. It is never loaded by the agent and is not counted as a defect; see “not proposed”.

## 2. Episodes

Session short names: S1 = 2026-10-26 19:27, S2 = 2026-10-28 01:17, S3 = 02:52, S4 = 03:25, S5 = 03:37, S6 = 16:31, S7 = 19:01, S8 = 21:18.

| ID | Session | Turns | Task class | Outcome | Loaded | Note |
|---|---|---|---|---|---|---|
| E01 | S1 | 4–25 | `configuration` | resolved | A01 later written; A11, A12 | connect MCP, sign-in, restart |
| E02 | S1 | 26–156 | `other` | resolved | A13, A14, A15 | solve S01E01: compact, send, answer |
| E03 | S1 | 157–168 | `documentation` | resolved | A02 artifact install | debrief and take `read` skill |
| E04 | S2 | 4–27 | `configuration` | resolved | A01, A11 | `mega start`, save brief |
| E05 | S2 | 28–51 | `configuration` | resolved | A01, A06 | write AGENTS.md, add summarize, test |
| E06 | S2 | 52–88 | `configuration` | resolved | A06, A11 | install `pi-subagents` |
| E07 | S2 | 89–96 | `investigation` | abandoned | A01 | `/resume` lookup, replaced by `/new` |
| E08 | S3 | 4–117 | `other` | resolved | A01, A02, A07 | S01E02 first half: transcribe, report, record |
| E09 | S4 | 4–26 | `other` | resolved | A01, A02, A08 | resume, claim twice, debrief |
| E10 | S4 | 27–30 | `investigation` | resolved | A07, A08 | diagnose the debrief |
| E11 | S5 | 4–5 | `investigation` | resolved | A01, A09 | context inventory, no tools |
| E12 | S6 | 4–30 | `investigation` | resolved | A01 | compare package bundle vs agents |
| E13 | S6 | 31–72 | `investigation` | resolved | A01 | global vs project extension |
| E14 | S7 | 4–17 | `investigation` | resolved | A01, A06 | doctor feature question |
| E15 | S7 | 18–23 | `investigation` | resolved | A01, A09 | context inventory again |
| E16 | S7 | 24–29 | `investigation` | resolved | A02 | council-mode question |
| E17 | S7 | 30–45 | `investigation` | resolved | A01 | Herdr setup |
| E18 | S7 | 46–53 | `configuration` | resolved | A01 | PowerShell execution policy |
| E19 | S8 | 4– | `other` | unknown | A10, A01 | this audit |

## 3. Signals

| Code | Instances | Episodes | Severity | Episode set |
|---|---:|---:|---|---|
| `other-friction` | 3 | 3 | `blocking` | E01, E02, E19 |
| `instruction-infeasible` | 3 | 3 | `costly` | E05, E06, E08 |
| `brief-gap` | 2 | 2 | `costly` | E08, E09 |
| `tool-friction` | 8 | 6 | `costly` | E03, E04, E08, E12, E14, E19 |
| `duplicate-work` | 5 | 5 | `costly` | E06, E11, E12, E14, E15 |
| `gate-missing` | 2 | 1 | `costly` | E02 |
| `recovery-cost` | 2 | 2 | `costly` | E01, E02 |
| `instruction-ambiguous` | 1 | 1 | `noisy` | E08 |

The 26 instances are listed in the JSON at the end. One instance is one distinct cause in one episode; repeated symptoms inside an episode are not multiplied.

## 4. Findings

### F01 — Secrets reach the transcript and the lesson log (blocking)

- Status: `confirmed` · attribution: `coverage-gap` · layer: `project-instructions`
- Counts: 2 instances, 2 episodes, 1 blocking · frequency: `some-episodes` · confidence: `high`
- Root cause: the log rule demands verbatim request and reply text and says nothing about masking, so the first lesson wrote live bearer tokens, and a shell env dump printed a provider key.
- Evidence: E01 turns 5–8 (env dump); E02 turns 59–83 (first log entries).
- The second lesson's `report.py` masks tickets, so the pipeline already contains the right pattern. It is not the default.

### F02 — Two large-payload rules never bind

- Status: `confirmed` · attribution: `instruction-infeasible` · layer: `project-instructions`
- Counts: 3 instances, 3 episodes, 0 blocking · frequency: `some-episodes` · confidence: `high`
- Root cause: two standing rules about large payloads were added before the subagent tool was available, and they duplicate each other, so neither ever bound.
- Evidence: E05 turns 81–88 (rule written; test via CLI child); E06 turns 52–74 (extension installed, session still lacks the tool); E08 turns 4–32 (rule loaded, tool list has no subagent, payloads parsed inline).
- The `summarize` agent file remains; only the standing rule is dead weight.

### F03 — The handoff drops the source map

- Status: `confirmed` · attribution: `coverage-gap` · layer: `template`
- Counts: 2 instances, 2 episodes, 0 blocking · frequency: `some-episodes` · confidence: `high`
- Root cause: the handoff prompt carries receipts but no source-to-finding map, and it forbids file reads, so the resumed session can only guess by position.
- Evidence: E08 turns 113–116 (handoff authored); E09 turns 10–12 (first claim rejected, second claim swaps the answers).
- The first session held the mapping (video/audio, clock, count); the handoff did not.

### F04 — Generated browser data lives inside the lesson folder

- Status: `confirmed` · attribution: `coverage-gap` · layer: `project-instructions`
- Counts: 2 instances, 2 episodes, 0 blocking · frequency: `some-episodes` · confidence: `medium`
- Root cause: the new-files rule has no exception for generated browser data, so a 537 MB, 1,800-file profile tree was created inside `s01e01/`.
- Evidence: E01 turns 36–40 (profile created under the lesson folder); E19 turns 4–6 (recursive listing times out after 30 seconds in that tree).

### F05 — The codemode examples reuse a predefined binding

- Status: `confirmed` · attribution: `coverage-gap` · layer: `tool-schema`
- Counts: 2 instances, 2 episodes, 0 blocking · frequency: `some-episodes` · confidence: `high`
- Root cause: codemode scripts declare `const tools` although the sandbox already defines `tools`, so the first script fails before making a call.
- Evidence: E04 turns 5–7; E08 turns 5–7.

### F06 — Tooling decisions are re-derived every time

- Status: `confirmed` · attribution: `coverage-gap` · layer: `project-instructions`
- Counts: 3 instances, 3 episodes, 0 blocking · frequency: `some-episodes` · confidence: `medium`
- Root cause: no durable note records the delegation setup, so each investigation re-derives package layout, agent locations and feature names.
- Evidence: E06 turns 52–70; E12 turns 4–30; E14 turns 4–17.

### F07 — Unquoted Windows paths break bash calls

- Status: `confirmed` · attribution: `coverage-gap` · layer: `project-instructions`
- Counts: 2 instances, 2 episodes, 0 blocking · frequency: `some-episodes` · confidence: `high`
- Root cause: no project note says to quote Windows paths or use forward slashes, so separators are eaten by the shell.
- Evidence: E12 turns 5–8; E14 turns 5–8.

### F08 — The context-inventory prompt is run twice

- Status: `confirmed` · attribution: `coverage-gap` · layer: `operator-instruction`
- Counts: 2 instances, 2 episodes, 0 blocking · frequency: `some-episodes` · confidence: `medium`
- Root cause: the prompt has no “save the answer” step, so its output is lost and the operator asks again.
- Evidence: E11 turns 4–5; E15 turns 18–23.

### F09 — Bodies sent before the contract was read

- Status: `probable` · attribution: `coverage-gap` · layer: `skill`
- Counts: 2 instances, 1 episode, 0 blocking · frequency: `once` · confidence: `high`
- Root cause: the first challenge had no contract-first rule; two bodies were refused, one for shape and one for length.
- Evidence: E02 turns 59–83.
- This is already remediated: A01 line 7 plus A02 rule 1 were followed in E08, and no send there was refused for shape. The 401 was credential hygiene (F12), not a contract miss.

### F10 — A stale page link is reused

- Status: `probable` · attribution: `coverage-gap` · layer: `workflow-script`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `medium`
- Root cause: no rule checks a page link's expiry before submitting through it; a two-hour-old link returned Forbidden.
- Evidence: E02 turns 129–135.

### F11 — The debrief tool validates four times

- Status: `probable` · attribution: `coverage-gap` · layer: `tool-schema`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `medium`
- Root cause: the debrief reply's per-field limits are read only after a failed call, so four rounds are spent on missing and overlong fields.
- Evidence: E03 turns 142–151.

### F12 — A credential with leading whitespace is used as-is

- Status: `probable` · attribution: `coverage-gap` · layer: `tool-schema`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `high`
- Root cause: the env value is passed to the header without trimming; four diagnostic calls follow before the space is found.
- Evidence: E08 turns 55–64.

### F13 — The skill path is repo-root-relative

- Status: `probable` · attribution: `instruction-ambiguous` · layer: `project-instructions`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `high`
- Root cause: A01 names the read skill by `.agents/...`; after `cd s01e02` the same string misses the script.
- Evidence: E08 turns 85–88.

### F14 — The course edge rejects the Python client

- Status: `probable` · attribution: `coverage-gap` · layer: `project-instructions`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `medium`
- Root cause: no note says which HTTP client the course edge accepts; Python is refused and curl works with the same bodies.
- Evidence: E08 turns 91–93.

### F15 — The MCP config change costs a restart

- Status: `probable` · attribution: `no-artifact` · layer: `harness`
- Counts: 1 instance, 1 episode · frequency: `once` · confidence: `medium`
- Root cause: the harness does not expose a newly added MCP server in the running session; the startup prompt is repeated after the restart.
- Evidence: E01 turns 18–21.
- This is `no-artifact`: the harness owns session lifetime, and no project file can change it. Not fixed.

### Not fixed — `no-artifact` items

- F15 (restart after MCP add): harness behavior, not editable.
- The repeated startup prompt in E01 is the operator re-sending the course's own start text; it is not a pipeline instruction.

## 5. Proposals

### P01 — Mask credentials in the log rule

- Finding: F01 · Target: A01 `AGENTS.md` line 6 · Layer: `project-instructions` · Remedy: `clarify`
- Before:
  `- Append every request and reply to that folder's \`log.txt\`: timestamp, URL, body sent, reply.`
- After:
  `- Append every request and reply to \`log.txt\` with tickets, tokens and keys masked (\`first6…last4\`); never print env values. Use \`.agents/skills/read/scripts/log-entry.mjs\` from the repo root.`
- Predicted effect: no raw token or key in a lesson log or transcript; the masking that `report.py` did once becomes the default.
- Verification: after the next three request-bearing sessions, `rg -n "v1\.eyJ[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{20,}" s01e*/log.txt` returns no match.
- Cost: 0 loaded lines (same line; +9 words ≈ +11 tokens) · maintenance: one shared helper to keep.
- Risk: browser/form posts can bypass the helper; masking can hide a value needed for debugging. Keep the whole receipt in the handoff, not in the log.
- Confidence: `high`

### P02 — Make masking the logging mechanism

- Finding: F01 · Target: new `.agents/skills/read/scripts/log-entry.mjs` · Layer: `skill` · Remedy: `mechanize`
- Before: `null` (new file)
- After:
  ```js
  #!/usr/bin/env node
  // Append one request/reply entry to a lesson log with credentials masked.
  import { appendFileSync, readFileSync } from "node:fs";
  const [logPath, entryPath] = process.argv.slice(2);
  const mask = (s) => String(s)
    .replace(/\b(v1\.[A-Za-z0-9_-]{8})[A-Za-z0-9._-]+([A-Za-z0-9_-]{4})\b/g, "$1…$2")
    .replace(/\b(sk-[A-Za-z0-9]{4})[A-Za-z0-9]{8,}([A-Za-z0-9]{4})\b/g, "$1…$2");
  const entry = JSON.parse(readFileSync(entryPath, "utf8"));
  appendFileSync(logPath, `[${new Date().toISOString()}] ${entry.method || "POST"} ${entry.url}\n${mask(JSON.stringify(entry, null, 1))}\n\n`);
  ```
- Predicted effect: appending a log entry has one path, and that path masks by construction.
- Verification: run the script on a fixture containing a receipt and a key; `rg` finds only `first6…last4` forms in the written log.
- Cost: 0 loaded lines (on-demand script) · maintenance: token regexes must track the course's token format.
- Risk: the regex misses a new secret shape; two masking implementations coexist with `s01e02/report.py` until the next lesson uses the shared one.
- Confidence: `medium`

### P03 — Delete the two large-payload rules

- Finding: F02 · Target: A01 `AGENTS.md` lines 8–9 · Layer: `project-instructions` · Remedy: `delete`
- Before:
  `- Save large payloads as files in the lesson folder and read them in slices.`
  `- Delegate reading a large saved payload to the \`summarize\` subagent, so the main thread gets the facts and not the file.`
- After: `null` (both lines removed; the `summarize` agent and its advertised description remain)
- Predicted effect: two rules that never fired stop costing every turn; the agent still sees `summarize` in the subagent list.
- Verification: the next three sessions show no attempt to delegate to a missing tool, and large payloads are still read in slices or filtered.
- Cost: −2 loaded lines (≈ −40 tokens) · maintenance: less prose to keep in sync with the extension.
- Risk: if `pi-subagents` is removed, a large payload may be read inline; the agent definition still exists, and the task can add a rule again if it recurs.
- Confidence: `high`

### P04 — Add a handoff template with a source map

- Finding: F03 · Target: new `.agents/skills/handoff/SKILL.md` (skill-layer anchor A02) · Layer: `skill` · Remedy: `template`
- Before: `null` (new file)
- After:
  ```md
  ---
  name: handoff
  description: Use when a challenge pauses for a new session; writes the handoff prompt with receipts and a source map.
  ---

  # handoff

  Write `s01eNN/handoff_prompt.txt` when the course says a new session must continue the challenge.

  1. Name the challenge id and every receipt, whole and in the order the course gave them.
  2. Add one source-map line per recording: `source | clock | answer | count | offset`.
  3. Say: "Work from the resume reply and this map; do not open files until the claim is solved."
  4. Do not add a no-files rule without the map; the map keeps each fact with its source.
  5. Check every answer in the map against the record's own count or clock before saving.
  ```
- Predicted effect: the resumed session can attach each answer to its recording without guessing by position; a first-claim rejection like E09 does not repeat.
- Verification: the next paused challenge's `handoff_prompt.txt` has one source-map line per recording, and the next claim is accepted on the first attempt.
- Cost: 0 loaded lines; the skill description is advertised (≈ +25 tokens), funded by P03's −40.
- Risk: the map can be wrong or filled superficially; the course may change the resume shape. The template must be checked against the record, not copied from memory.
- Confidence: `high`

## 6. Ranking, budget, conflict scan

Order: severity, then recurrence, then leverage.

1. P01 + P02 — F01 is `blocking` (secret exposed); `mechanize` is mandatory for a blocking finding.
2. P03 — three episodes, highest recurrence; `delete` recovers the most tokens.
3. P04 — two episodes; `template` at rung 5.

Budget: 4 proposals across 2 inventoried artifacts (A01 ×2, A02 ×2) plus two new files under the skill layer. Net always-loaded lines: −2 (P03). Estimated net tokens ≈ −4: P03 −40, P01 +11, P04 +25. The deletion funds the additions; the new script and skill are on-demand.

Conflict scan (against all 15 artifacts):

- P01/P02 vs. “append every request and reply”: the rule is reworded, not contradicted; the log still holds every entry, with masked credentials. The handoff still carries whole receipts.
- P01/P02 vs. the course instruction to keep receipts unchanged: masking applies to the local log, not to a receipt sent to the course.
- P03 vs. A06 `summarize.md`: the agent file is untouched; only the standing rule is removed.
- P04 vs. A08 `handoff_prompt.txt`: the old prompt's no-files rule is replaced by “resume reply + map”. The old file is a one-off, not a standing rule.
- No proposal targets `harness`, a `no-artifact` finding, or the same location twice.

## 7. What I did not propose

| Finding | Reason |
|---|---|
| F04 generated browser data | 2 episodes, but the one-line `tmp/` rule would be a third A01 proposal and competes with the handoff template; deferred to the next A01 edit. |
| F05 codemode binding | 2 noisy episodes, but A01 already carries two proposals and a one-line note would compete with higher-value rules. Tool-schema is harness-owned. |
| F06 tooling research | 3 episodes, but the answers track a fast-moving package; a durable note would go stale and cost more than the re-research. |
| F07 Windows paths | 2 episodes, low severity; a third A01 line is not worth it for shell-path quoting. |
| F08 duplicate inventory | Low value; the prompt file belongs to the operator, and saving its output is a one-line change not worth a proposal. |
| F09 contract-before-body | Already fixed by A01 line 7 + A02 rule 1; E08 shows the rule working. Proposing it again would duplicate a working rule. |
| F10 stale link | One episode; no evidence of recurrence. A hook would need a link-expiry field the course does not always provide. |
| F11 debrief validation | One episode; the field limits come from the course's reply, and the tool schema is external. |
| F12 credential whitespace | One episode; the cause is an env value, not a project rule. |
| F13 root-relative skill path | One episode; not enough recurrence to spend the third A01 slot. Fold into the next A01 edit. |
| F14 Cloudflare client | One episode; environment-specific, and a note would take the third A01 slot for one failure. |
| F15 MCP restart | `no-artifact`; harness session lifetime, not editable. |
| A03 README never loaded | Human-facing install notes, not agent instruction. Deleting it saves no agent context and loses the install path. |

## 8. Working rules

Three rules held without cost and justify extending the pipeline:

- A02 rule 1 (contract before body): E08 read the OpenAPI contract and built the transcription request from the quoted fields and limits; no request was refused for shape. The 401 was credential hygiene (F12), not a contract miss.
- A01 line 7 (read skill before a body): followed in E08 even though the skill is a separate on-demand file.
- A07's masking helper: E08's log masked tickets and the record body; the second half's log stayed masked. The pattern is right; it is not yet the default (F01).

The pipeline is extendable: it has working rules, not only failures.

## 9. Limitations

- `narrow-window`: 3 days, 8 sessions, two course challenges and one tooling thread. Every frequency is provisional.
- `retention-window-bounded`: the store begins 2026-10-10, but this project begins 2026-10-26; there is no earlier baseline.
- `harness-capability-missing`: `compaction` — no compaction, truncation or summarization events are recorded, so context-bloat from compaction is unmeasured.
- `extraction-gap`: `delegation` — native subagent briefs and returns are absent; one CLI child run is recorded, so `brief-gap` is measured only indirectly.
- `below-threshold`: `routing-error` — no model or agent routing failure with a failed result.
- `below-threshold`: `loop` — the debrief validation is four rounds in one episode, under the three-episode threshold.
- `no-opportunity`: `scope-creep` — no counted episode names out-of-scope work or skips a named step.
- `below-threshold`: `handoff-loss` outside F03 — only one cross-session handoff exists.

## 10. Record

The JSON below is the audited record. It is what would be written as `pipeline-doctor.json`; here it is embedded in the requested markdown file. No file other than this one was created or edited. Applying any proposal is a separate per-file run with its own consent.

```json
{
  "capabilities": [
    { "category": "turns", "visible": true, "note": "ordered user, assistant, tool-call and tool-result messages" },
    { "category": "loaded-context", "visible": true, "note": "system sections per session; block inventory in the 19:01 session" },
    { "category": "retrieval", "visible": true, "note": "reads, curls and tool results are recorded" },
    { "category": "mutation", "visible": true, "note": "write and edit calls with paths" },
    { "category": "commands", "visible": true, "note": "bash calls, output and exit codes" },
    { "category": "delegation", "visible": true, "note": "one CLI child run recorded; native subagent briefs absent" },
    { "category": "compaction", "visible": false, "note": "no compaction or truncation events recorded" },
    { "category": "approval", "visible": true, "note": "approvals appear as user turns, not structured events" },
    { "category": "timing", "visible": true, "note": "timestamps and per-call durations" }
  ],
  "coverage": {
    "sessions_discovered": 104,
    "sessions_excluded": 96,
    "sessions_eligible": 8,
    "episodes": 19,
    "window_days": 3,
    "artifacts_inventoried": 15,
    "artifacts_loaded_at_least_once": 14,
    "always_loaded_lines": 9,
    "episodes_with_signals": 13
  },
  "artifacts": [
    { "artifact_id": "A01", "layer": "project-instructions", "path": "AGENTS.md", "size": { "value": 9, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A02", "layer": "skill", "path": ".agents/skills/read/SKILL.md", "size": { "value": 53, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A03", "layer": "skill", "path": ".agents/skills/read/README.md", "size": { "value": 55, "unit": "lines" }, "status": "never-loaded" },
    { "artifact_id": "A04", "layer": "skill", "path": ".agents/skills/read/scripts/find-contract.mjs", "size": { "value": 427, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A05", "layer": "skill", "path": ".agents/skills/read/scripts/cut-diff.mjs", "size": { "value": 338, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A06", "layer": "agent-prompt", "path": "~/.pi/agent/agents/summarize.md", "size": { "value": 19, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A07", "layer": "workflow-script", "path": "s01e02/report.py", "size": { "value": 42, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A08", "layer": "template", "path": "s01e02/handoff_prompt.txt", "size": { "value": 6, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A09", "layer": "operator-instruction", "path": "docs/what-I-see.md", "size": { "value": 2, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A10", "layer": "skill", "path": "docs/pipeline-doctor.md", "size": { "value": 507, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A11", "layer": "model-choice", "path": "~/.pi/agent/settings.json", "size": { "value": 9, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A12", "layer": "tool-schema", "path": "~/.pi/agent/mcp.json", "size": { "value": 7, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A13", "layer": "workflow-script", "path": "s01e01/cdp.js", "size": { "value": 76, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A14", "layer": "workflow-script", "path": "s01e01/post.js", "size": { "value": 15, "unit": "lines" }, "status": "used" },
    { "artifact_id": "A15", "layer": "workflow-script", "path": "s01e01/compact.js", "size": { "value": 22, "unit": "lines" }, "status": "used" }
  ],
  "signals": [
    { "signal": "other-friction", "episode": "E01", "anchor": "turns 5-8", "note": "A shell env dump printed a live provider key into the session transcript.", "severity": "blocking" },
    { "signal": "other-friction", "episode": "E02", "anchor": "turns 59-83", "note": "The first lesson log recorded complete bearer tokens and bodies without masking.", "severity": "blocking" },
    { "signal": "other-friction", "episode": "E01", "anchor": "turns 36-40", "note": "A browser profile of hundreds of megabytes was created inside the lesson folder under the new-files rule.", "severity": "costly" },
    { "signal": "instruction-infeasible", "episode": "E05", "anchor": "turns 81-88", "note": "A standing rule delegated large payloads to a subagent the session did not expose; the test used a CLI child instead.", "severity": "costly" },
    { "signal": "instruction-infeasible", "episode": "E06", "anchor": "turns 52-74", "note": "The delegation extension was installed after the rule was written, and the running session still lacked the tool.", "severity": "costly" },
    { "signal": "instruction-infeasible", "episode": "E08", "anchor": "turns 4-32", "note": "With the rule loaded, the tool list still had no subagent; payloads were parsed inline.", "severity": "costly" },
    { "signal": "brief-gap", "episode": "E08", "anchor": "turns 113-116", "note": "The handoff prompt carried receipts but no source map, so the next session had only position to identify each recording.", "severity": "costly" },
    { "signal": "brief-gap", "episode": "E09", "anchor": "turns 10-12", "note": "The first claim crossed the two recordings; the course refused it and the second claim swapped the answers.", "severity": "costly" },
    { "signal": "tool-friction", "episode": "E19", "anchor": "turns 4-6", "note": "A recursive listing of the two lesson folders timed out after 30 seconds in the browser profile tree.", "severity": "costly" },
    { "signal": "tool-friction", "episode": "E04", "anchor": "turns 5-7", "note": "A codemode script redeclared the predefined tools binding and failed before making a call.", "severity": "noisy" },
    { "signal": "tool-friction", "episode": "E08", "anchor": "turns 5-7", "note": "The same codemode redeclaration failed again in the next session.", "severity": "noisy" },
    { "signal": "duplicate-work", "episode": "E06", "anchor": "turns 52-70", "note": "Package research repeated registry, README and download-count lookups before installing.", "severity": "costly" },
    { "signal": "duplicate-work", "episode": "E12", "anchor": "turns 4-30", "note": "The same package layout and agent-directory facts were re-derived from disk and docs.", "severity": "costly" },
    { "signal": "duplicate-work", "episode": "E14", "anchor": "turns 4-17", "note": "The package was searched again for a doctor feature that is an action, not an agent.", "severity": "costly" },
    { "signal": "tool-friction", "episode": "E12", "anchor": "turns 5-8", "note": "Unquoted Windows paths lost their separators in bash and two calls failed.", "severity": "noisy" },
    { "signal": "tool-friction", "episode": "E14", "anchor": "turns 5-8", "note": "The same unquoted-path failure repeated in the next session.", "severity": "noisy" },
    { "signal": "duplicate-work", "episode": "E11", "anchor": "turns 4-5", "note": "The context-inventory prompt was executed once and its output was not saved.", "severity": "noisy" },
    { "signal": "duplicate-work", "episode": "E15", "anchor": "turns 18-23", "note": "The same context-inventory prompt was executed again in a later session.", "severity": "noisy" },
    { "signal": "gate-missing", "episode": "E02", "anchor": "turns 59-75", "note": "A body was sent before the contract was read and was refused for its shape.", "severity": "costly" },
    { "signal": "gate-missing", "episode": "E02", "anchor": "turns 75-83", "note": "The next body still exceeded the declared limit; a count before sending would have caught it.", "severity": "costly" },
    { "signal": "recovery-cost", "episode": "E02", "anchor": "turns 129-135", "note": "A two-hour-old page link returned Forbidden; the harness re-posted to get a fresh link and reopened the page.", "severity": "costly" },
    { "signal": "tool-friction", "episode": "E03", "anchor": "turns 142-151", "note": "Four debrief calls failed validation on missing or overlong fields before the reply was accepted.", "severity": "costly" },
    { "signal": "tool-friction", "episode": "E08", "anchor": "turns 55-64", "note": "A credential with a leading space produced 401s and four diagnostic calls before the cause was found.", "severity": "costly" },
    { "signal": "instruction-ambiguous", "episode": "E08", "anchor": "turns 85-88", "note": "The skill was named by a root-relative path; from a lesson folder the script path missed and the call failed.", "severity": "noisy" },
    { "signal": "tool-friction", "episode": "E08", "anchor": "turns 91-93", "note": "A Python client was refused by the course edge; the same bodies sent with curl were accepted.", "severity": "costly" },
    { "signal": "recovery-cost", "episode": "E01", "anchor": "turns 18-21", "note": "After the MCP server was added, the startup prompt was repeated in a new session before work could continue.", "severity": "costly" }
  ],
  "findings": [
    {
      "finding_id": "F01",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "project-instructions",
      "counts": { "instances": 2, "episodes": 2, "blocking": 1 },
      "frequency": "some-episodes",
      "confidence": "high",
      "root_cause": "The log rule demands verbatim request and reply text and says nothing about masking, so the first lesson wrote live bearer tokens and a shell dump printed a provider key.",
      "evidence": ["E01 turns 5-8", "E02 turns 59-83"]
    },
    {
      "finding_id": "F02",
      "status": "confirmed",
      "attribution": "instruction-infeasible",
      "layer": "project-instructions",
      "counts": { "instances": 3, "episodes": 3, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "high",
      "root_cause": "Two standing rules about large payloads were added before the subagent tool was available and duplicate each other, so neither ever bound.",
      "evidence": ["E05 turns 81-88", "E06 turns 52-74", "E08 turns 4-32"]
    },
    {
      "finding_id": "F03",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "template",
      "counts": { "instances": 2, "episodes": 2, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "high",
      "root_cause": "The handoff prompt carries receipts but no source-to-finding map, and it forbids file reads, so the resumed session can only guess by position.",
      "evidence": ["E08 turns 113-116", "E09 turns 10-12"]
    },
    {
      "finding_id": "F04",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "project-instructions",
      "counts": { "instances": 2, "episodes": 2, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "medium",
      "root_cause": "The new-files rule has no exception for generated browser data, so a 537 MB profile tree was created inside a lesson folder.",
      "evidence": ["E01 turns 36-40", "E19 turns 4-6"]
    },
    {
      "finding_id": "F05",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "tool-schema",
      "counts": { "instances": 2, "episodes": 2, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "high",
      "root_cause": "Codemode scripts declare a tools binding the sandbox already defines, so the first script fails before making a call.",
      "evidence": ["E04 turns 5-7", "E08 turns 5-7"]
    },
    {
      "finding_id": "F06",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "project-instructions",
      "counts": { "instances": 3, "episodes": 3, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "medium",
      "root_cause": "No durable note records the delegation setup, so each investigation re-derives package layout, agent locations and feature names.",
      "evidence": ["E06 turns 52-70", "E12 turns 4-30", "E14 turns 4-17"]
    },
    {
      "finding_id": "F07",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "project-instructions",
      "counts": { "instances": 2, "episodes": 2, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "high",
      "root_cause": "No project note says to quote Windows paths or use forward slashes, so separators are eaten by the shell.",
      "evidence": ["E12 turns 5-8", "E14 turns 5-8"]
    },
    {
      "finding_id": "F08",
      "status": "confirmed",
      "attribution": "coverage-gap",
      "layer": "operator-instruction",
      "counts": { "instances": 2, "episodes": 2, "blocking": 0 },
      "frequency": "some-episodes",
      "confidence": "medium",
      "root_cause": "The context-inventory prompt has no save step, so its output is lost and the operator asks again.",
      "evidence": ["E11 turns 4-5", "E15 turns 18-23"]
    },
    {
      "finding_id": "F09",
      "status": "probable",
      "attribution": "coverage-gap",
      "layer": "skill",
      "counts": { "instances": 2, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "high",
      "root_cause": "The first challenge had no contract-first rule; two bodies were refused, one for shape and one for length.",
      "evidence": ["E02 turns 59-83"]
    },
    {
      "finding_id": "F10",
      "status": "probable",
      "attribution": "coverage-gap",
      "layer": "workflow-script",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "medium",
      "root_cause": "No rule checks a page link's expiry before submitting through it; a two-hour-old link returned Forbidden.",
      "evidence": ["E02 turns 129-135"]
    },
    {
      "finding_id": "F11",
      "status": "probable",
      "attribution": "coverage-gap",
      "layer": "tool-schema",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "medium",
      "root_cause": "The debrief reply's per-field limits are read only after a failed call, so four rounds are spent on missing and overlong fields.",
      "evidence": ["E03 turns 142-151"]
    },
    {
      "finding_id": "F12",
      "status": "probable",
      "attribution": "coverage-gap",
      "layer": "tool-schema",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "high",
      "root_cause": "The env value is passed to the header without trimming; four diagnostic calls follow before the leading space is found.",
      "evidence": ["E08 turns 55-64"]
    },
    {
      "finding_id": "F13",
      "status": "probable",
      "attribution": "instruction-ambiguous",
      "layer": "project-instructions",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "high",
      "root_cause": "AGENTS.md names the read skill by a repo-root-relative path; after changing into a lesson folder the same string misses the script.",
      "evidence": ["E08 turns 85-88"]
    },
    {
      "finding_id": "F14",
      "status": "probable",
      "attribution": "coverage-gap",
      "layer": "project-instructions",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "medium",
      "root_cause": "No note says which HTTP client the course edge accepts; Python is refused and curl works with the same bodies.",
      "evidence": ["E08 turns 91-93"]
    },
    {
      "finding_id": "F15",
      "status": "probable",
      "attribution": "no-artifact",
      "layer": "harness",
      "counts": { "instances": 1, "episodes": 1, "blocking": 0 },
      "frequency": "once",
      "confidence": "medium",
      "root_cause": "The harness does not expose a newly added MCP server in the running session, so the startup prompt is repeated after a restart.",
      "evidence": ["E01 turns 18-21"]
    }
  ],
  "proposals": [
    {
      "proposal_id": "P01",
      "finding_id": "F01",
      "target": { "artifact_id": "A01", "location": "line 6" },
      "layer": "project-instructions",
      "remedy": "clarify",
      "before": "- Append every request and reply to that folder's `log.txt`: timestamp, URL, body sent, reply.",
      "after": "- Append every request and reply to `log.txt` with tickets, tokens and keys masked (`first6…last4`); never print env values. Use `.agents/skills/read/scripts/log-entry.mjs` from the repo root.",
      "predicted_effect": "No raw token or key in a lesson log or transcript; the masking that report.py did once becomes the default.",
      "verification": "After the next three request-bearing sessions, a recursive search for receipt and key prefixes in s01e*/log.txt returns no match.",
      "cost": { "loaded_lines": 0, "maintenance": "one shared helper to keep" },
      "risk": "Browser/form posts can bypass the helper; masking can hide a value needed for debugging. Keep whole receipts in the handoff, not the log.",
      "confidence": "high"
    },
    {
      "proposal_id": "P02",
      "finding_id": "F01",
      "target": { "artifact_id": "A02", "location": "new scripts/log-entry.mjs under the read skill" },
      "layer": "skill",
      "remedy": "mechanize",
      "before": null,
      "after": "A Node script that reads one JSON entry, masks receipt and key shapes, and appends timestamp, method, URL and body to the lesson log.",
      "predicted_effect": "Appending a log entry has one path, and that path masks by construction.",
      "verification": "Run the script on a fixture containing a receipt and a key; the written log shows only first-six and last-four forms.",
      "cost": { "loaded_lines": 0, "maintenance": "token regexes must track the course's token format" },
      "risk": "The regex misses a new secret shape; two masking implementations coexist with report.py until the next lesson uses the shared one.",
      "confidence": "medium"
    },
    {
      "proposal_id": "P03",
      "finding_id": "F02",
      "target": { "artifact_id": "A01", "location": "lines 8-9" },
      "layer": "project-instructions",
      "remedy": "delete",
      "before": "- Save large payloads as files in the lesson folder and read them in slices.\n- Delegate reading a large saved payload to the `summarize` subagent, so the main thread gets the facts and not the file.",
      "after": null,
      "predicted_effect": "Two rules that never fired stop costing every turn; the summarize agent remains advertised.",
      "verification": "The next three sessions show no attempt to delegate to a missing tool, and large payloads are still read in slices or filtered.",
      "cost": { "loaded_lines": -2, "maintenance": "less prose to keep in sync with the extension" },
      "risk": "If pi-subagents is removed, a large payload may be read inline; the agent definition still exists, and a rule can return if the friction recurs.",
      "confidence": "high"
    },
    {
      "proposal_id": "P04",
      "finding_id": "F03",
      "target": { "artifact_id": "A02", "location": "new .agents/skills/handoff/SKILL.md under the skill layer" },
      "layer": "skill",
      "remedy": "template",
      "before": null,
      "after": "A skill whose body requires the challenge id, every receipt, and one source-map line per recording (source, clock, answer, count, offset), plus a check against the record before saving.",
      "predicted_effect": "The resumed session can attach each answer to its recording without guessing by position; a first-claim rejection like E09 does not repeat.",
      "verification": "The next paused challenge's handoff_prompt.txt has one source-map line per recording, and the next claim is accepted on the first attempt.",
      "cost": { "loaded_lines": 0, "maintenance": "one template; the advertised description costs about 25 tokens" },
      "risk": "The map can be wrong or filled superficially; the course may change the resume shape. Check it against the record, not memory.",
      "confidence": "high"
    }
  ],
  "not_proposed": [
    { "finding_id": "F04", "reason": "Two episodes, but the one-line tmp/ rule would be a third A01 proposal and competes with the handoff template; deferred to the next A01 edit." },
    { "finding_id": "F05", "reason": "Two noisy episodes; a third A01 line is not worth it for a two-turn failure. Tool-schema is harness-owned." },
    { "finding_id": "F06", "reason": "Three episodes, but the answers track a fast-moving package; a durable note would go stale." },
    { "finding_id": "F07", "reason": "Two low-severity episodes; a third A01 line is not worth it for shell-path quoting." },
    { "finding_id": "F08", "reason": "Low value; the prompt file belongs to the operator and saving its output is a one-line change." },
    { "finding_id": "F09", "reason": "Already fixed by A01 line 7 and A02 rule 1; E08 shows the rule working." },
    { "finding_id": "F10", "reason": "One episode; the course does not always provide a link-expiry field for a gate." },
    { "finding_id": "F11", "reason": "One episode; field limits come from the course reply and the tool schema is external." },
    { "finding_id": "F12", "reason": "One episode; the cause is an env value, not a project rule." },
    { "finding_id": "F13", "reason": "One episode; not enough recurrence to spend the third A01 slot. Fold into the next A01 edit." },
    { "finding_id": "F14", "reason": "One episode; environment-specific, and a note would take the third A01 slot for one failure." },
    { "finding_id": "F15", "reason": "No-artifact; harness session lifetime, not editable." }
  ],
  "limitations": [
    { "code": "narrow-window", "signal": null, "finding_id": null },
    { "code": "retention-window-bounded", "signal": null, "finding_id": null },
    { "code": "harness-capability-missing", "signal": "compaction", "finding_id": null },
    { "code": "extraction-gap", "signal": "delegation", "finding_id": null },
    { "code": "below-threshold", "signal": "routing-error", "finding_id": null },
    { "code": "below-threshold", "signal": "loop", "finding_id": null },
    { "code": "no-opportunity", "signal": "scope-creep", "finding_id": null },
    { "code": "below-threshold", "signal": "handoff-loss", "finding_id": null }
  ]
}
```
