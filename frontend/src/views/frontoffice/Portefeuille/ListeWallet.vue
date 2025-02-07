<script setup>
import { ref, computed, onMounted } from "vue";
import TableComponent from "./components/Table.vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { getPortefeuilles } from "@/services/frontoffice/portefeuille/walletService.js";
import { useRouter } from "vue-router";

const router = useRouter();

// Stocker les données des portefeuilles
const tableData = ref([]);
const searchQuery = ref("");



// Charger les portefeuilles depuis l'API
const fetchPortefeuilles = async () => {
    try {
        const response = await getPortefeuilles();
        console.log("Réponse complète API:", response); // Debug

        const portefeuilles = response?.portefeuilles || []; // Sécurisation

        tableData.value = portefeuilles.map(portefeuille => ({
            nom: portefeuille.nom_portefeuille || "Inconnu",
            solde: portefeuille.solde ?? 0,
            utilisateur: portefeuille.id_utilisateur || "Non spécifié",
            crypto: portefeuille.crypto.nom_crypto,
            action: {
                detail: `/detailWallet/${portefeuille.id_portefeuilles}`,
                // detail: `/detail/${portefeuille.id_portefeuille || 0}`,
                sale: `/vendreCrypto/${portefeuille.id_portefeuilles || 0}`
            }
        }));
    } catch (error) {
        console.error("Erreur API:", error);
        tableData.value = []; // Réinitialiser en cas d'erreur
    }
};

// Filtrer les portefeuilles selon la recherche
const filteredData = computed(() => {
    const search = searchQuery.value.toLowerCase();

    return (tableData.value || []).filter(portefeuille =>
        (portefeuille.nom?.toLowerCase() || '').includes(search) ||
        (portefeuille.solde?.toString() || '').includes(search)
    );
});

// Ajouter un portefeuille fictif (exemple)
const addPortefeuille = () => {
    tableData.value.push({
        nom: "Portefeuille Test",
        solde: "5000",
        utilisateur: "Utilisateur Test",
        action: { label: "Voir", route: "/portefeuilles/new" },
    });
};

// Charger les portefeuilles au montage du composant
onMounted(fetchPortefeuilles);
</script>

<template>
    <!-- Navbar -->
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>

    <!-- Contenu Principal -->
    <div class="container main-content mt-4">
        <h3 class="text-center">Mes portefeuilles</h3>

        <!-- Barre de Recherche et Bouton -->
        <div class="d-flex justify-content-between align-items-center my-3">
            <div class="search-container">
                <input type="text" class="form-control search-input" placeholder="🔍 Rechercher un portefeuille..."
                    v-model="searchQuery" />
            </div>

            <router-link to="fondDetail" class="btn btn-primary">Fond</router-link>

        </div>

        <!-- Tableau -->
        <TableComponent :headers="['Nom', 'Solde', 'Crypto', 'Action']" :rows="filteredData" />
    </div>

    <!-- Footer -->
    <footer class="bg-light py-3 mt-4 text-center">
        <p class="mb-0">© 2025 Mon Application - Tous droits réservés</p>
    </footer>
</template>

<style scoped>
.container {
    max-width: 1200px;
}

.main-content {
    background: linear-gradient(to right, #d8e1eb, #b7d2ee);
    padding: 80px;
    border-radius: 10px;
}
</style>
