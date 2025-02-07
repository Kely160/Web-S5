import axios from "axios";

// Créer l'instance API client AVANT l'initialisation
const apiClient = axios.create({
    baseURL: "http://localhost:8800",
    headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    },
    withCredentials: true,
});

// Déplacez l'initialisation CSRF dans un export séparé
export async function initializeCsrfToken() {
    await apiClient.get('/sanctum/csrf-cookie'); // ✅ Bonne URL
}

export function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue); // Décoder les caractères spéciaux
        }
    }
    return null; // Retourner null si le cookie n'existe pas
}

export { apiClient };
