import { apiClient } from "../api/http";

export async function login(credentials) {
  try {
    await apiClient.get("/sanctum/csrf-cookie"); // Assurer que le token CSRF est défini
    const response = await apiClient.post("/login", credentials);
    console.log("Data utilisateur = ", response.data.user);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :");
    console.log(error);

    // Retourne un objet propre pour éviter les erreurs côté UI
    throw {

      message: error.response.data.error,
      details: error.response.data.error  ? error.response.data.error : "Erreur inconnue"
    };

  }
}

export async function getUtilisateur() {
  try {
    await apiClient.get("/sanctum/csrf-cookie"); // Assurer que le token CSRF est défini
    const response = await apiClient.get("/sessionUtilisateur");
    return response.data;
  } catch (error) {
      console.log(error);
  }
}
