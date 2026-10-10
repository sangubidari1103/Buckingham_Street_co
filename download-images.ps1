$images = @(
    @{ url = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80&auto=format"; file = "suit_navy.jpg" },
    @{ url = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format"; file = "suit_3piece.jpg" },
    @{ url = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&auto=format"; file = "blazer_navy.jpg" },
    @{ url = "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80&auto=format"; file = "casual_linen.jpg" },
    @{ url = "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80&auto=format"; file = "shirt_white.jpg" },
    @{ url = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format"; file = "shirt_blue.jpg" },
    @{ url = "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&q=80&auto=format"; file = "acc_pocket.jpg" },
    @{ url = "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80&auto=format"; file = "acc_wallet.jpg" },
    @{ url = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80&auto=format"; file = "acc_watch.jpg" },
    @{ url = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format"; file = "belt_leather.jpg" }
)

$client = New-Object System.Net.WebClient
$client.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

foreach ($img in $images) {
    $dest = "D:\suit-galleria\public\images\" + $img.file
    try {
        Write-Host "Downloading $($img.file)..."
        $client.DownloadFile($img.url, $dest)
        $size = (Get-Item $dest).Length
        Write-Host "OK: $($img.file) ($size bytes)"
    } catch {
        Write-Host "FAIL: $($img.file) - $($_.Exception.Message)"
    }
}