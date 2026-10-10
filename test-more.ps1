$testUrls = @(
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1523372985461-a552cfe73f1e?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1594938298605-e8f0f3b8c1a2?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1594938298607-d9e8c7b6a5f4?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1594938298609-f1e2d3c4b5a6?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1594938298611-b2c3d4e5f6a7?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1594938298613-f6a7b8c9d0e1?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1599643478520-396aaffbcd74?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1599643478522-5b8ccfbbcd76?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1599643478524-7daeefbbcd78?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1584030375544-4ee5b5b5b5b7?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1601924994989-8ae26d50dc28?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80&auto=format',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format'
)

foreach ($url in $testUrls) {
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