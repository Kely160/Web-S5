<script setup>
import { ref, onMounted } from "vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { getPortefeuilleById } from "@/services/frontoffice/portefeuille/walletService.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const portefeuilleId = route.params.id;
const portefeuille = ref({}); // Initialiser avec un objet vide au lieu de null

// Corriger le nom de la fonction importée
const getPortefeuille = async () => {
    try {
        const response = await getPortefeuilleById(portefeuilleId); // Utiliser la bonne fonction
        portefeuille.value = response.data || response.data; // Adapter selon la structure de la réponse
        console.log("Portefeuille chargé :", portefeuille.value);
        console.log("nom portefeuille: ", portefeuille.value.crypto);
    } catch (error) {
        console.error('Erreur lors du chargement :', error);
        router.push('/erreur'); // Redirection en cas d'erreur
    }
};

const goBack = () => {
    router.go(-1); // Navigation de retour
};

onMounted(getPortefeuille);
</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>

    <section class="container detail mt-5">
        <!-- Ajouter un v-if pour éviter les erreurs de rendu -->
        <div v-if="portefeuille" class="card p-4 shadow-lg portfolio-card">
            <h3 class="text-center mb-4 text-light">Détails du Portefeuille</h3>

            <div class="row">
                <div class="col-md-6">
                    <!-- Utiliser l'opérateur optionnel -->
                    <p><strong class="text-muted">Nom :</strong>
                        <span class="text-light">{{ portefeuille?.nom_portefeuille }}</span>
                    </p>
                    <p><strong class="text-muted">Solde :</strong>
                        <span class="text-success">{{ portefeuille?.solde }}</span>
                    </p>
                </div>
                <div class="col-md-6">
                    <p><strong class="text-muted">Cryptomonnaie :</strong>
                        <span class="text-light">{{ portefeuille.crypto?.nom_crypto }}</span>
                    </p>
                    <p><strong class="text-muted">Utilisateur :</strong>
                        <span class="text-uppercase">{{ portefeuille?.utilisateur?.nom }}</span>
                    </p>
                </div>
                <div class="col-md-6">
                    <p><strong class="text-muted">Prix actuel :</strong>
                        <span class="text-success">{{ portefeuille.crypto?.prix_actuel }} Ar</span>
                    </p>
                </div>
            </div>

            <p class="text-center text-muted">
                <strong>Date de création :</strong>
                <span class="text-light">
                    {{ new Date(portefeuille?.date_creation).toLocaleDateString('fr-FR', {
                        day: '2-digit', month:
                            'long', year: 'numeric' }) }}
                </span>
            </p>

            <div class="text-center mt-4">
                <router-link :to="`/gestionFond/${portefeuilleId}`"
                    class="btn btn-success btn-lg mx-2 portfolio-btn">
                    Gérer les fonds
                </router-link>
                <button class="btn btn-outline-light btn-lg mx-2 portfolio-btn" @click="goBack">
                    Retour
                </button>
            </div>
        </div>

        <!-- Message de chargement -->
        <div v-else class="text-center text-light">
            Chargement des données...
        </div>
    </section>
</template>

<style scoped>
/* Fusionner les styles dupliqués */
.card {
    max-width: 700px;
    margin: auto;
    border-radius: 15px;
    color: #ffffff;
    padding: 20px;
    background: rgba(31, 43, 57, 0.85);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.02);
}

h3 {
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: 1px;
}

p {
    font-size: 1rem;
    margin-bottom: 8px;
    transition: all 0.3s ease;
}

.text-light {
    color: #f8f9fa;
    font-weight: bold;
}

.text-muted {
    color: #adb5bd;
}

.text-success {
    color: #28a745;
    font-size: 1.2rem;
    font-weight: bold;
}

.text-uppercase {
    font-weight: bold;
    color: #ffcc00;
}

strong {
    font-size: 1.05rem;
}

.text-center {
    margin-top: 15px;
}

button {
    transition: all 0.3s ease-in-out;
    border-radius: 8px;
}

button:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
}

.btn-success {
    background: linear-gradient(135deg, #28a745, #218838);
    border: none;
    color: white;
    padding: 12px 20px;
    font-size: 1rem;
}

.btn-outline-light {
    border: 2px solid #f8f9fa;
    color: #f8f9fa;
    padding: 12px 20px;
    font-size: 1rem;
}

.btn-outline-light:hover {
    background: rgba(255, 255, 255, 0.1);
}

section.detail {
    padding-top: 80px;
}

.shadow-lg {
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
}
</style>