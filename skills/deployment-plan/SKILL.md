---
name: deployment-plan
description: Write a deployment plan for a repo — what ships today, what blocks it, phases, host, secrets, store submission, checklist. Use when the user wants to ship, deploy to production, host a server, go live, publish to a store, or asks what is missing before release.
---

# deployment-plan

A deployment plan takes a working tree to a release a stranger can install: what
the repo can already do, what **blocks** the release, who does what in which
order, and the checklist that proves it shipped. You write it to
`docs/deployment-plan.md` in the target repo, against a named commit.

Two sources, never mixed. **Facts** come from the repo and carry a `file:line`.
**Intent** comes from the human: accounts, money, domain, platform scope, who
operates it. A guessed intent is the one thing that costs a rewrite, so step 3
asks.

## 1. Recon the tree

Read the files that decide how this thing runs, then two lists: what runs now,
what the release still needs.

| Look for | Where it usually lives |
|---|---|
| Run target and entrypoint | `package.json` scripts, `Dockerfile`, `Procfile`, `main`/`bin`, CI config |
| Bind address, port, env vars | server entrypoint, `config.*`, `.env.example`, compose file |
| Auth and secrets | token/session code, secret loading, logging code |
| Client identity and version | `app.json` (expo), `AndroidManifest.xml`, `Info.plist`, `pyproject`, `*.csproj` |
| Tests and gates | test scripts, CI workflow, `Makefile` |
| Hosting assumptions | docs, deploy scripts, hardcoded hosts and `localhost` |
| Build artifacts | `.gitignore` for signing keys, keystores, service-account JSON |

**Done when** every claim in the next two steps can cite the file and line it
came from, and you know the deploy command the project already intends: the one
`package.json` script or `Dockerfile` the author clearly meant for production.

## 2. Shippable today

One table, one row per piece of the planned release. A row is honest when it
names the state and the file:

```markdown
| Piece | State now | Source |
|---|---|---|
| Pairing | URL + token pasted, stored on device | `app/connect.tsx`, `src/client.ts:244` |
| TLS | none — plain `ws://`, loopback bound | `src/index.ts:52` |
```

**Done when** every piece the release advertises has a row, including the ones
whose state is "not implemented". Those rows are the next step's input.

## 3. Blockers

A **blocker** is a gap that makes the release fail on a user's device or in
store review — not a rough edge, not polish. Today's plan holds still for exactly
these. Name the failure each one causes, so the reader can check your reasoning:

```markdown
- **TLS missing.** Android release builds block cleartext, so `ws://` cannot work
  in the store build. Plain `ws://` stays for the emulator only.
```

Three classes are blockers in almost every plan: a transport a release build
refuses (cleartext, insecure cookie, missing permission), a secret that lands in
logs or URLs, and no way to revoke access once a second user exists. On a
self-hosted backend, add a fourth: the reviewer cannot reach the server.

**Done when** each blocker names the concrete failure it produces, and anything
you judged non-blocking says why it can wait.

## 4. Ask the human

The repo cannot answer intent. Batch these into one message and ask with the
question tool; keep asking while an answer would change the plan:

- Where does it run? Own VPS, cloud, a managed platform (which), or nowhere yet?
- Is a domain owned, or must the plan include buying one?
- Which platforms and stores this release? What is explicitly out of scope?
- Which accounts already exist, and are they personal or organisation? (Store
  rules differ, and the difference is usually the biggest schedule risk.)
- Money ceiling per month and one-off?
- Who operates it after launch — the user, a team, or nobody? (Nobody means the
  plan must be self-healing, not just documented.)
- Can a reviewer reach the backend, or does review need a throwaway environment?
- Who holds the signing keys and the secret store?

**Done when** every question above is answered, or recorded in the plan's
decisions section as open, with the default you will assume and what it costs to
change.

## 5. Order the work

Phases, each with wall time and what it blocks. Order by blocking, not by
comfort: the slow external step (account verification, store review, DNS
propagation, a tester cohort) starts first.

```markdown
| Phase | What | Wall time | Blocking |
|---|---|---|---|
| P1 | Host + domain + TLS, reachable over `wss://` | 0.5–1 day | everything |
| P2 | Client release prep (icons, versioning, release build) | 1 day | store |
| P3 | Signed artifact | hours (queue) | store |
| P4 | Store setup, listing, policy forms | 0.5 day + review | store |
```

**Done when** there is a phase for every blocker from step 3, and the plan states
the single largest schedule risk and what makes it small.

## 6. Write the sections

Each section states facts and the command or screen that acts on them. Keep the
plan's own secrets out of the plan: cite the env file's path, never its value.

| Section | Carries | Rule |
|---|---|---|
| Aim | target release, platforms, out of scope | one paragraph, no hedging |
| Host | sizing, base install, service unit, filesystem layout | size from the real cost driver (what actually consumes RAM); name the cheapest provider class that fits |
| Transport and domain | DNS, proxy/TLS, firewall end state | end state is a list of ports that should be open |
| Operations | health check, logs, update and rollback, backups, secret rotation | name what is worth restoring, and say the update restarts what |
| Client build | version fields, icon/splash, identity, signing | flag every value that can never change after publishing |
| Store | account traps, listing text, policy forms, reviewer access, rollout | quote what the listing must admit (e.g. "you need your own server") |
| Automated vs manual | one table | any step needing an account, design, or a wait is marked **MANUAL** |
| Cost | recurring and one-off | per month |
| Decisions | reversible vs not | each with the default you would take and who must confirm |
| Minimum checklist | grouped by phase, `- [ ]` | the release gate |
| Risks | impact, mitigation | the ones the plan does not already remove |

Two things the reader checks first and so you write first: **decisions that never
reverse** (app/package identity, domain, signing key custody, published store
listing text) belong before the expensive phase; and **MANUAL** steps outnumber
automated ones on a first release — a plan that looks fully scriptable has
skipped the account work.

**Done when** every section contains at least one fact with a citation or a
command, and the checklist covers every MANUAL row and every blocker.

## 7. Verify and hand over

- Every claim cites a file, or is marked as an assumption with the decision that
  resolves it.
- The plan names the commit it was written against (`git rev-parse --short HEAD`);
  a plan against a stale tree is the classic silent rot.
- Run the checks it prescribes against that commit wherever they are cheap
  (does the service unit's `ExecStart` exist? does the script in `package.json`
  run?), and delete any section the repo contradicts.
- Read back to the human in ten lines or fewer: blocker count, first phase, the
  largest schedule risk, decisions pending, and total cost.

**Done when** the read-back is true of the file, and nothing in the plan depends
on a fact you did not verify or a question you did not ask.
