# Script de test pour POST
Write-Host "Test POST - Création d'une réclamation via API Gateway"

$uri = "http://localhost:8089/api/reclamations"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    sujet = "Problème technique"
    description = "Application ne fonctionne pas"
    date = "2024-01-15"
    userId = 1
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -Headers $headers -Body $body
    Write-Host "✅ Succès! Status: $($response.StatusCode)"
    Write-Host "Réponse: $($response.Content)"
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)"
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
} 