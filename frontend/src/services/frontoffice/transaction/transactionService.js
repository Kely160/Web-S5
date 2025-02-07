import { apiClient } from "../api/http";
import { getUtilisateur } from "../auth/authService";


export async function createTransaction(transaction) {
    // try {
    console.log("TRansaction en cours");
    const utilisateurResponse = await getUtilisateur();
    const utilisateur = utilisateurResponse.data;
    // portefeuille.Id_utilisateur = utilisateurResponse.data.id_utilisateur;
    transaction.id_utilisateur = utilisateurResponse.data.id_utilisateur;
    // console.log("Nouveau portefeuille = ", portefeuille);
    await apiClient.get("/sanctum/csrf-cookie");
    const response = await apiClient.post("/transactions/store", transaction);
    console.log("Transaction terminer = ", response);
    return response.data;
    // } catch (error) {
    //     console.log(error);
    //     throw {
    //         message: error,
    //         details: error
    //     };
    // }
}