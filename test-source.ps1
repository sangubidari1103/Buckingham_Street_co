$testUrls = @(
    'https://source.unsplash.com/featured/1200x1600/?suit,formal,menswear',
    'https://source.unsplash.com/featured/1200x1600/?wedding,suit,groom',
    'https://source.unsplash.com/featured/1200x1600/?blazer,menswear',
    'https://source.unsplash.com/featured/1200x1600/?shirt,menswear,formal',
    'https://source.unsplash.com/featured/1200x1600/?cufflinks,menswear,accessories',
    'https://source.unsplash.com/featured/1200x1600/?pocket,square,silk',
    'https://source.unsplash.com/featured/1200x1600/?belt,leather,menswear',
    'https://source.unsplash.com/featured/1200x1600/?watch,menswear,dress',
    'https://source.unsplash.com/featured/1200x1600/?wallet,leather,menswear'
)

foreach ($url in $testUrls) {
    try {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.Method = 'HEAD'
        $req.Timeout = 15000
        $resp = $req.GetResponse()
        Write-Host "OK: $($resp.StatusCode) - $($resp.ResponseUri) - $url"
        $resp.Close()
    } catch {
        Write-Host "FAIL: $($_.Exception.Message) - $url"
    }
}