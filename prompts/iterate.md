---
description: Run exactly one feature run (one fresh pi process, then exit)
argument-hint: "[feature-dir | next]"
---

Run exactly one run of the active feature:

```
scripts/run-next.sh ${1:-next} -n 1
```

That starts a fresh `pi -p --no-session` process which reads
`docs/agent-workflow.md` + the feature's `STATE.md`, executes the next pending
run (test-builder → worker → reviewer → `STATE.md`), and prints one
`RUN <n>: …` line. Report that line and the changed files; do not start another
run.
