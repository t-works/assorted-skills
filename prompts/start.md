---
description: Run the non-stop build loop (one fresh pi process per feature run)
argument-hint: "[feature-dir | next] [max-runs]"
---

Run up to `${2:-10}` feature runs non-stop:

```
scripts/run-next.sh ${1:-next} -n ${2:-10}
```

Each run is a fresh `pi -p --no-session` process following
`docs/agent-workflow.md` Phase 2 for the next pending run of the feature. The
loop stops at the first run that is not a `COMPLETE` variant (or a non-zero pi
exit). Report each run's final line and stop there.
