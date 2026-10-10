try {
    $resp = Invoke-WebRequest -Uri 'http://localhost:3000' -Method Get -TimeoutSec 10
    Write-Host "Homepage Status: $($resp.StatusCode)"
} catch {
    Write-Host "Homepage Error: $($_.Exception.Message)"
}