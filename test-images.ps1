$urls = @(
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1617127365699-c47fa864d8bc?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1599643478518-17488fbbcd72?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format'
)

foreach ($url in $urls) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.Method = 'HEAD'
        $req.Timeout = 10000
        $resp = $req.GetResponse()
        Write-Host "OK: $($resp.StatusCode) - $url"
        $resp.Close()
    } catch {
        Write-Host "FAIL: $($_.Exception.Message) - $url"
    }
}