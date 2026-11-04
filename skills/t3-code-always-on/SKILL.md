---
name: t3-code-always-on
description: Keep a T3 Code server running unattended on Windows and reachable from a phone. Use when someone asks to make `t3 serve` always running, survive closing a console or rebooting, reach T3 from another device, or fix "connection error" after scanning a pairing QR code.
---

# t3-code-always-on

`t3 service install` is the supported answer on Linux (systemd) and macOS (launchd). On Windows it prints `Background service unavailable` and no flag changes that. This skill is the Windows recipe, and the phone-side steps that apply on every OS.

Every fact below was measured on Windows 11, t3 0.1.6, Node 24. Re-check the version line before trusting the file paths.

## Step 1 — Give it a life independent of a console

A foreground `t3 serve --lan` dies when its console closes, and so does a task that runs it through `cmd /c …`: the wrapper owns a console, closing that console sends Ctrl+C to the process group, and the task records `LastTaskResult 3221225786` (`0xC000013A`, `STATUS_CONTROL_C_EXIT`). Task Scheduler's restart policy does not cover a clean exit or a wedged process, so the server stays dead.

Two properties are needed: the process must not share a console with anything a human can close, and something must bring it back when it stops answering.

1. Copy `<skill>/scripts/t3-keepalive.ps1` to a stable path in the user profile (not the skill folder — a repo move must not break the task) and substitute two placeholders: `<launcher>`, the `t3.cmd`/`t3` that `where t3` resolves to, and `<port>`, the port the server must own. The script health-checks the port and restarts the server detached, so no console of yours is in its process tree.

2. Register the task: at logon, and every 2 minutes as a resurrection sweep.

```powershell
$a = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "<keepalive>"'
$t1 = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$t2 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 2)
$s = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 5) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew
Register-ScheduledTask -TaskName 'T3 Code' -Action $a -Trigger $t1, $t2 -Settings $s -Force
Start-ScheduledTask -TaskName 'T3 Code'
```

3. Prove it self-heals rather than assuming it: kill the server, confirm the port stops answering, wait past one sweep, confirm it answers again.

```powershell
Stop-Process -Name t3 -Force; Start-Sleep 3
curl.exe -s -o NUL -w "dead:%{http_code}`n" http://127.0.0.1:<port>/   # expect dead:000
Start-Sleep 150
curl.exe -s -o NUL -w "back:%{http_code}`n" http://127.0.0.1:<port>/   # expect back:200
```

**Done:** `back:200` with a process id that was not the one you killed, and `Get-ScheduledTask -TaskName 'T3 Code'` shows `State Ready` (Ready is correct — the launcher exits once the server is up; the server is not the task's child).

## Step 2 — Make it reachable, then hand out the pairing URL

1. Check what "reachable" already means before adding anything: `t3 connect status` ends in `✓ Other devices can reach this machine` when the relay tunnel is up. That path needs no port, no firewall rule and no token — send the person there first if they only want the phone.
2. For a direct connection, `t3 pair` mints a token and prints a QR. Its chosen host is often wrong on a multi-homed box: it prefers Ethernet over Wi-Fi and ignores the Tailscale address, so a phone on the tailnet gets the router's LAN IP and fails. Take the token and rewrite the host yourself — the token is not host-bound:
   ```
   http://<tailnet-or-lan-ip>:<port>/pair#token=<token>
   ```
   `t3 pair --ttl 4h --label phone` sets the lifetime; the default is 5 minutes.
3. `t3 pair --tailscale` gives an HTTPS tailnet URL instead, but only once Serve is enabled for the tailnet — otherwise `tailscale serve status` answers `No serve config` and enabling it waits on a browser visit to `login.tailscale.com/f/serve`.
4. A direct IP still passes through Windows Firewall. No inbound rule for the port means the phone sees a bare connection error. Scope the rule to the tailnet rather than opening the port to everything, and run this elevated:
   ```
   netsh advfirewall firewall add rule name="T3 Code (tailnet)" dir=in action=allow protocol=TCP localport=<port> remoteip=100.64.0.0/10
   ```

**Done:** the URL returns 200 from the machine (`curl -s -o /dev/null -w "%{http_code}"`), `t3 connect status` or a successful phone load confirms the remote side, and the person has a token with time left on it.

## What this setup cannot do

- **It starts at logon, not at boot.** A boot-time task would run as SYSTEM, with SYSTEM's own `~/.t3` — no projects, no auth, no Connect sign-in. Registering the task as `-LogonType S4U` to run it in the background session is denied without elevation (`0x80070005`).
- **Sleep kills reachability, not the process.** The tunnel reconnects when the machine wakes.
- **`t3 pair` failing with `NoRunningServerError` while `server-runtime.json` exists** means the server is wedged: it accepts TCP and never answers HTTP. Restart it; do not go looking for a missing runtime file.
- **Restarting kills running agent turns.** If a person has work in flight, ask before letting a sweep restart it, and widen the two 10-second health checks if a legitimately busy server trips them.

## Reference

- State: `t3 status --json` (service, connect, lan). Logs: `t3 trace`, `~/.t3/userdata/logs/server.trace.ndjson`.
- The relay's own helper: `cloudflared.exe` under `~/.t3/tools/` — a child of the server, expect it in the process tree.
- Update without touching the task: it calls the launcher, so `t3 update` keeps working. Remove the setup with `Unregister-ScheduledTask -TaskName 'T3 Code'` plus the script.
