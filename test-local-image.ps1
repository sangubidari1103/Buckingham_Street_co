try {
    $resp = Invoke-WebRequest -Uri 'http://localhost:3000/images/suit_navy.jpg' -Method Head -TimeoutSec 10
    Write-Host "Status: $($resp.StatusCode)"
    Write-Host "Content-Length: $($resp.Headers['Content-Length'])"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}