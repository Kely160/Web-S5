import { apiClient } from "../api/http";
import { getUtilisateur } from "../auth/authService"; 


export async function create(portefeuille) {
    try {
        console.log("Creation de portefeuille");
        const utilisateurResponse = await getUtilisateur();
        console.log("data user ", utilisateurResponse.data.id_utilisateur);
        if (!utilisateurResponse ) {
            throw new Error("Utilisateur non trouvé ou ID utilisateur manquant.");
        }
        const utilisateur = utilisateurResponse.data; 
        portefeuille.Id_utilisateur = utilisateurResponse.data.id_utilisateur;

        console.log("Nouveau portefeuille = ", portefeuille);
        await apiClient.get("/sanctum/csrf-cookie");
        return await apiClient.post("/portefeuilles/create", portefeuille);
    } catch (error) {
        console.log(error);
        throw {
            message: error,
            details: error
        };
    }
}

export async function getPortefeuilles() {
    try {
        // On récupère l'utilisateur via la fonction getUtilisateur
        const utilisateurResponse = await getUtilisateur();

        // Vérification que l'utilisateur existe et contient l'ID utilisateur
        if (!utilisateurResponse ) {
            throw new Error("Utilisateur non trouvé ou ID utilisateur manquant.");
        }

        const utilisateur = utilisateurResponse.data; // L'objet utilisateur avec les données de l'utilisateur
        console.log("Utilisateur trouvé : ", utilisateur.idUtilisateur);

        // Effectuer la requête GET avec l'ID de l'utilisateur
        const response = await apiClient.get(`/portefeuilles/${utilisateurResponse.data.id_utilisateur}`);
        console.log("Réponse reçue : ", response);

        // Retourner les données JSON de l'API
        return response.data;
    } catch (error) {
        // Gérer les erreurs
        const errorMessage = error.response?.data?.message || "Erreur lors de la récupération des portefeuilles.";
        const errorDetails = error.response?.data || error.message;

        console.error("Erreur:", errorMessage, errorDetails);

        // Relancer l'erreur avec des détails supplémentaires
        throw {
            message: errorMessage,
            details: errorDetails
        };
    }
}



export async function getPortefeuilleById(id) {
    try {
        const response = await apiClient.get(`/portefeuilles/show/${id}`);
        console.log("reponse = ", response);
        return response; // Retourne les données JSON du portefeuille spécifique
    } catch (error) {
        throw {
            message: error,
            details: error
        };
    }
}
export async function storeFond(id, detailFond) {
    try {
        // Récupérer le cookie CSRF
        await apiClient.get("/sanctum/csrf-cookie");

        // Préparer les données à envoyer (assurer que detailFond contient les bonnes informations)
        const { type_operation, montant, daty } = detailFond;

        // Valider les données avant d'envoyer la requête
        if (!montant || montant <= 0) {
            console.log("montant = ", daty);
            throw new Error("Le montant est invalide." + montant);
        }
        if (!daty) {
            throw new Error("La date d'opération est requise.");
        }
        if (!type_operation) {
            throw new Error("Le type d'opération est requis.");
        }

        // Effectuer la requête POST pour enregistrer le fonds
        const response = await apiClient.post(`/portefeuilles/fonds/${id}`, {
            montant,
            daty,
            type_operation
        });

        // Afficher la réponse dans la console
        console.log("Réponse de l'API : ", response);

        return response; // Retourne la réponse du serveur (inclut le message et les détails du fonds créé)

    } catch (error) {
        // Gérer les erreurs et afficher un message approprié
        console.error("Erreur lors de la soumission du fonds : ", error);
        throw {
            message: error.message || "Une erreur est survenue",
            details: error
        };
    }
}


