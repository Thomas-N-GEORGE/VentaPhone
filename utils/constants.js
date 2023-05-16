// Utility module with settings.

// PROD
export const API_URL = "https://ventalis.herokuapp.com/api/";
export const API_TOKEN_URL = "https://ventalis.herokuapp.com/api/api-token-auth/";


// Choices for order status :
export const STATUS_CHOICES = {
    CR: "Créée",
    CT: "En cours de traitement",
    AA: "En attente d'approvisionnement",
    PE: "En préparation à l'expédition",
    AP: "En attente de paiement",
    EX: "Expédiée",
    TA: "Traitée",
    AN: "Annulée",
}
