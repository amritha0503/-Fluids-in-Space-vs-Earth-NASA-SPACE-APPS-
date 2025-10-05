# Script to copy NASA documents to the project

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " NASA Document Integration Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = "c:\Users\Amritha\Downloads\download\PSI-119_Science Documents_Pre-pub_Marangoni swimmer pushing particle raft...pdf"
$destPath = "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react\public\resources\PSI-119_Marangoni_swimmer.pdf"

# Check if source file exists
if (Test-Path $sourcePath) {
    Write-Host "✓ Found source file!" -ForegroundColor Green
    Write-Host "  Source: $sourcePath" -ForegroundColor Gray
    Write-Host ""
    
    # Copy the file
    Write-Host "Copying file..." -ForegroundColor Yellow
    Copy-Item $sourcePath $destPath -Force
    
    Write-Host "✓ File copied successfully!" -ForegroundColor Green
    Write-Host "  Destination: $destPath" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host " Integration Complete! " -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. cd fluids-in-space-react" -ForegroundColor White
    Write-Host "2. npm start" -ForegroundColor White
    Write-Host "3. Navigate to 'Learn More' page" -ForegroundColor White
    Write-Host "4. Find 'PSI-119: Marangoni Swimmer & Particle Raft'" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host "✗ Source file not found!" -ForegroundColor Red
    Write-Host "  Looking for: $sourcePath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "1. Is the file in your Downloads folder?" -ForegroundColor White
    Write-Host "2. Is the filename correct?" -ForegroundColor White
    Write-Host ""
    Write-Host "To copy manually:" -ForegroundColor Yellow
    Write-Host "Copy your PDF to: $destPath" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
