import { apiClient } from "../api/http";

export async function liste() {
  try {
    // await apiClient.get("/sanctum/csrf-cookie"); // Assurer que le token CSRF est défini
    const response = await apiClient.get("/cryptos");
    console.log("liste crypto", response);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de recuperation de crypto :");
    console.log(error);
    alert(error);

  }
}

