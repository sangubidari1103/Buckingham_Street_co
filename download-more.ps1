$client = New-Object System.Net.WebClient
$client.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

# Download ivory/cream wedding suit
try {
    Write-Host "Downloading suit_ivory.jpg from source.unsplash.com..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?suit,wedding,ivory,cream,groom', 'D:\suit-galleria\public\images\suit_ivory.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\suit_ivory.jpg').Length
    Write-Host "OK: suit_ivory.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: suit_ivory.jpg - $($_.Exception.Message)"
}

# Download cufflinks
try {
    Write-Host "Downloading acc_cufflinks.jpg from source.unsplash.com..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?cufflinks,menswear,accessories,formal', 'D:\suit-galleria\public\images\acc_cufflinks.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\acc_cufflinks.jpg').Length
    Write-Host "OK: acc_cufflinks.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: acc_cufflinks.jpg - $($_.Exception.Message)"
}

# Download additional images for variety - formal charcoal suit
try {
    Write-Host "Downloading suit_charcoal.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?suit,formal,charcoal,grey,menswear', 'D:\suit-galleria\public\images\suit_charcoal.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\suit_charcoal.jpg').Length
    Write-Host "OK: suit_charcoal.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: suit_charcoal.jpg - $($_.Exception.Message)"
}

# Download black tuxedo
try {
    Write-Host "Downloading suit_tuxedo.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?tuxedo,black,formal,menswear', 'D:\suit-galleria\public\images\suit_tuxedo.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\suit_tuxedo.jpg').Length
    Write-Host "OK: suit_tuxedo.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: suit_tuxedo.jpg - $($_.Exception.Message)"
}

# Download brown tweed blazer
try {
    Write-Host "Downloading blazer_tweed.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?blazer,tweed,brown,menswear', 'D:\suit-galleria\public\images\blazer_tweed.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\blazer_tweed.jpg').Length
    Write-Host "OK: blazer_tweed.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: blazer_tweed.jpg - $($_.Exception.Message)"
}

# Download forest green blazer
try {
    Write-Host "Downloading blazer_green.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?blazer,green,forest,menswear', 'D:\suit-galleria\public\images\blazer_green.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\blazer_green.jpg').Length
    Write-Host "OK: blazer_green.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: blazer_green.jpg - $($_.Exception.Message)"
}

# Download beige linen blazer
try {
    Write-Host "Downloading blazer_linen.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?blazer,linen,beige,menswear', 'D:\suit-galleria\public\images\blazer_linen.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\blazer_linen.jpg').Length
    Write-Host "OK: blazer_linen.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: blazer_linen.jpg - $($_.Exception.Message)"
}

# Download light blue shirt
try {
    Write-Host "Downloading shirt_light_blue.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?shirt,light,blue,menswear,formal', 'D:\suit-galleria\public\images\shirt_light_blue.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\shirt_light_blue.jpg').Length
    Write-Host "OK: shirt_light_blue.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: shirt_light_blue.jpg - $($_.Exception.Message)"
}

# Download black shirt
try {
    Write-Host "Downloading shirt_black.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?shirt,black,menswear,formal', 'D:\suit-galleria\public\images\shirt_black.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\shirt_black.jpg').Length
    Write-Host "OK: shirt_black.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: shirt_black.jpg - $($_.Exception.Message)"
}

# Download striped shirt
try {
    Write-Host "Downloading shirt_striped.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?shirt,striped,menswear,formal', 'D:\suit-galleria\public\images\shirt_striped.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\shirt_striped.jpg').Length
    Write-Host "OK: shirt_striped.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: shirt_striped.jpg - $($_.Exception.Message)"
}

# Download black formal shirt
try {
    Write-Host "Downloading shirt_black_formal.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?shirt,black,formal,menswear', 'D:\suit-galleria\public\images\shirt_black_formal.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\shirt_black_formal.jpg').Length
    Write-Host "OK: shirt_black_formal.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: shirt_black_formal.jpg - $($_.Exception.Message)"
}

# Download pocket square (additional)
try {
    Write-Host "Downloading acc_pocket2.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?pocket,square,silk,white,menswear', 'D:\suit-galleria\public\images\acc_pocket2.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\acc_pocket2.jpg').Length
    Write-Host "OK: acc_pocket2.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: acc_pocket2.jpg - $($_.Exception.Message)"
}

# Download brown belt
try {
    Write-Host "Downloading belt_brown.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?belt,leather,brown,menswear', 'D:\suit-galleria\public\images\belt_brown.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\belt_brown.jpg').Length
    Write-Host "OK: belt_brown.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: belt_brown.jpg - $($_.Exception.Message)"
}

# Download tan belt
try {
    Write-Host "Downloading belt_tan.jpg..."
    $client.DownloadFile('https://source.unsplash.com/1200x1600/?belt,leather,tan,suede,menswear', 'D:\suit-galleria\public\images\belt_tan.jpg')
    $size = (Get-Item 'D:\suit-galleria\public\images\belt_tan.jpg').Length
    Write-Host "OK: belt_tan.jpg ($size bytes)"
} catch {
    Write-Host "FAIL: belt_tan.jpg - $($_.Exception.Message)"
}