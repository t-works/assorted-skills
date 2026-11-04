# t3-keepalive.ps1 — run from the "T3 Code" scheduled task only.
# Substitute <launcher> (`where t3`) and <port> before use.
$url = 'http://127.0.0.1:<port>/'
$alive = $false
foreach ($i in 1, 2) {
    try {
        $r = Invoke-WebRequest -Uri $url -TimeoutSec 10 -UseBasicParsing
        if ($r.StatusCode -eq 200) { $alive = $true; break }
    } catch { Start-Sleep -Seconds 5 }
}
if ($alive) { exit 0 }

Get-Process t3 -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
# detaches it: no console of ours, so closing any console cannot Ctrl+C it
Start-Process -FilePath '<launcher>' -ArgumentList 'serve', '--lan', '--no-browser' -WindowStyle Hidden
