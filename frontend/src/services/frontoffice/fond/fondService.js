import { apiClient } from "../api/http";

export async function fondUtilisateur() {
    try {

        const response = await apiClient.get("/get-fond-utilisateur");
        console.log("fond utilisateur", response);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de recuperation des fonds utilisateur :");
        console.log(error);
        alert(error);

    }
}

export async function storeFond(fond) {
    try {
        await apiClient.get("/sanctum/csrf-cookie");
        const response = await apiClient.post("/portefeuilles/fonds", fond);
        console.log("reponse apres le store = ", response);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'operation :");
        console.log(error);
        alert(error);
    }
}

