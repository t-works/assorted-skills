---
name: deployment-plan
description: Write a deployment plan for a repo — derive what it ships, what blocks the release, phases, host, secrets, checklist. Use when the user wants to ship, deploy, release, host, go live, publish, or asks what is missing before release, for any repo: service, site, library, CLI, app, or data.
---

# deployment-plan

A deployment plan takes a working tree to a release a stranger can install or
reach, and it is derived from the tree, not assumed: the repo says what exists,
its shape says what shipping it needs, and only the leftovers become questions.

Write it to `docs/deployment-plan.md` in the target repo, against a named commit.

Two budgets. **Facts** come from the repo and carry a `file:line`. **Intent** comes
from the human, and a guessed intent is the one thing that costs a rewrite — so
step 5 asks, but only where the repo is silent *and* the answer flips a decision.

## 1. Recon: what does this repo ship?

Find every deployable: a thing that ends up running somewhere, installed by
someone, or published under a name. Classify each by shape, because the shape
picks the requirements.

| Shape | Recognisable by | What its release needs |
|---|---|---|
| Long-running service | server entrypoint, `Dockerfile`, compose, systemd/pm2 | host, ingress, secrets, health check, restart, state backups |
| Static site / SPA | build → `dist/`, hosting config | host or CDN, cache rules, custom domain |
| Library / package | `main`/`exports`/`publishConfig`, no start script | registry, version scheme, deprecation path |
| CLI | `bin`, install instructions | registry or install script, version |
| Mobile app | `app.json`, `pubspec.yaml`, `*.xcodeproj`, `build.gradle` | permanent app id, signing key, store account, review, build number |
| Desktop app | Electron/Tauri config, installer targets | signing + notarization, update channel |
| Scheduled job / worker | cron file, queue consumer | scheduler, idempotency, retry, alert on silent failure |
| Data / schema | migrations directory | apply order, backup before, rollback plan |
| Infra / config | Terraform, k8s manifests | apply order, state backend, drift check |

Recon inputs, cheapest first: `package.json`/`pyproject.toml`/`go.mod` scripts and
`main`; the entrypoint and its config loader; bind address, port, env vars,
`.env.example`; auth, token and logging code; `.gitignore` for keys, keystores,
service-account JSON; CI config; docs that mention hosts or `localhost`.

**Done when** you can list the deployables and name each one's shape with the file
that proves it, and you know the command the author already intends for a release
(the `Dockerfile`, the `build`/`start` script, the publish config).

## 2. Turn each shape into requirements

Per deployable, fill only the rows that apply — a library needs no host, a site
needs no service unit:

| Requirement | The question the repo answers |
|---|---|
| Runtime + pin | which interpreter/engine version, and is the pin enforced or implied? |
| State | what survives a restart, and where does it live? |
| Ingress / transport | port, protocol, TLS termination point, who faces the internet |
| Secrets | every credential, where it is read from, what happens if it leaks |
| External accounts | which providers must exist before deploy (cloud, registry, store) |
| Build artifact | what gets produced, by which command, deterministic or not |
| Config surface | env vars and files a deploy must set, and their defaults |
| Version scheme | how a release is numbered and where the number lives |
| Gates | the checks that must pass first (tests, typecheck, lint, e2e) |

**Done when** every deployable has its requirements named, and each row either
cites the file that answers it or is recorded as missing.

## 3. Shippable today

One table, one row per piece of the release, honest about what does not exist:

```markdown
| Piece | State now | Source |
|---|---|---|
| Ingress | plain `ws://`, bound to loopback | `src/index.ts:52` |
| Revocation | none — one static token for all clients | `src/config.ts:14` |
```

**Done when** every advertised piece has a row, including the ones whose state is
"not implemented". Those rows feed the next step.

## 4. Blockers

A **blocker** is a gap that makes the release fail in the target's hands — the
service refuses to boot, the install fails, the target rejects the artifact, the
release cannot be undone. Cosmetic rough edges are not blockers, and a plan names
which is which.

Four classes cover most repos:

- **A transport the target refuses.** Cleartext where the build or browser blocks
  it, plaintext credentials, an unauthenticated endpoint facing the internet.
- **A secret that leaks.** Into logs, URLs, or bundled into a binary handed to
  users (a shipped client cannot hold a secret).
- **No undo.** No rollback, no revocation, no deprecation path, an irreversible
  migration. One bad release and the only exit is a manual repair.
- **An identity that cannot be taken back.** A published package name, app id,
  domain, or signing key.

Write each as the failure it causes, so the reasoning is checkable:

```markdown
- **No TLS.** The release build blocks cleartext, so `ws://` cannot connect.
  Plain `ws://` stays for the local emulator only.
```

**Done when** each blocker names the concrete failure it produces, and everything
judged non-blocking says why it can wait.

## 5. Ask, only where it blocks

Ask the human a question only when both hold: the repo does not answer it, and
the answer changes what you write. Otherwise take the default, and record it as a
`provisional` row in the decisions section — reversible product questions never
stop a plan.

What is genuinely the human's, and worth asking:

- The target environment and who operates it after launch (you, a team, nobody —
  nobody means it must self-heal, not just be documented).
- Accounts and credentials you cannot create, and their type (personal vs
  organisation: the same rule set can differ by weeks).
- Scope for this release: which platform, which store or registry, what is
  explicitly out of scope.
- Money: recurring ceiling and one-off.
- Anything irreversible you are about to propose: a domain, a package name, a
  signing key's custodian.

Batch the questions into one message, use the question tool, and escalate nothing
else: access or environment problems become `BLOCKED:` lines in the plan, not
questions.

**Done when** every remaining unknown is either answered, recorded as a
`BLOCKED` line, or a `provisional` decision row with its default stated.

## 6. Order the work

Phases with wall time and what each blocks. Order by blocking, not comfort — the
slow external step (account verification, review, DNS, quota) starts first.

```markdown
| Phase | What | Wall time | Blocking |
|---|---|---|---|
| P1 | Host + transport + secrets, reachable from outside | 0.5–1 day | everything |
| P2 | Build and signature settings | 1 day | publish |
| P3 | Publish, then first rollout | hours + review | launch |
```

**Done when** every blocker has a phase, and the plan names the single largest
schedule risk and what shrinks it.

## 7. Write the sections

Include a section only if a deployable from step 1 needs it. Every section states
facts and the command or screen that acts on them; the plan cites a secret's path,
never its value.

| Section | Include when | Carries |
|---|---|---|
| Aim | always | target release, platforms, out of scope, one paragraph |
| Deployables | always | the step-1 list, one row per thing shipped |
| Host / target | anything that runs somewhere | sizing from the real cost driver, base install, service unit, filesystem layout, ingress and TLS, firewall end state |
| Operations | anything long-running | health check, logs, update and rollback, what to back up, secret rotation |
| Publish | library, CLI, package | registry, version bump, dist-tag or equivalent, how a bad version is deprecated |
| Client build | app, desktop | version fields, identity, signing, update channel; flag every value that never changes after publishing |
| Store submission | app | account traps, listing text, policy forms, reviewer access, staged rollout |
| Data / schema | migrations | order, backup before, rollback, the irreversible step |
| Automated vs manual | always | one table; anything needing an account, design, or a wait is marked **MANUAL** |
| Cost | anything paid | recurring per month, one-off |
| Decisions | always | reversible vs not, each with the default you would take |
| Minimum checklist | always | `- [ ]` grouped by phase — the release gate |
| Risks | always | impact, mitigation, for the risks the plan does not already remove |

Two things the reader checks first, so write them first: **decisions that never
reverse** (published identity, domain, key custody, listing text) belong before
the expensive phase; and **MANUAL** outnumbers automated on a first release — a
plan that looks fully scriptable has skipped the account work.

**Done when** every section present holds at least one cited fact or runnable
command, and the checklist covers every MANUAL row and every blocker.

## 8. Verify and hand over

- Every claim cites a file, or is an assumption tied to the decision that
  resolves it.
- The plan names the commit it was written against (`git rev-parse --short HEAD`);
  a plan against a stale tree rots silently.
- Run the cheap checks it prescribes against that commit — does the unit's
  `ExecStart` exist, does the script in `package.json` run, does the version pin
  hold — and delete any section the repo contradicts.
- Read back in ten lines or fewer: the deployables, blocker count, first phase,
  largest schedule risk, decisions pending, total cost.

**Done when** the read-back is true of the file, and nothing in the plan rests on
an unverified fact or an unasked question that mattered.
