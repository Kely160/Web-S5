<script setup>
import { ref, computed, onMounted } from "vue";
import TableComponent from "./components/Table.vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { liste } from "@/services/frontoffice/crypto/cryptoService.js"; 


// Stocke les données des cryptos
const tableData = ref([]);

const searchQuery = ref("");

// Charger les cryptos depuis l'API
const fetchCryptos = async () => {
    try {
        const response = await liste();
        console.log("Réponse complète API:", response); // Debug

        // Vérification en profondeur de la réponse
        const cryptos = response?.data || []; // Sécurisation

        // Optimisation : utiliser `map()` au lieu de `forEach`
        tableData.value = cryptos.map(crypto => ({
            nom: crypto.nom_crypto || 'Inconnu',
            symbole: crypto.symbole || '-',
            prix_actuel: crypto.prix_actuel,
            pourcentage: `${crypto.pourcentage ?? 0}%`,
            action: {
                label: "Voir",
                route: `/cryptos/${crypto.id_cryptos || 0}`
            }
        }));
    } catch (error) {
        console.error("Erreur API:", error);
        tableData.value = []; // Réinitialiser en cas d'erreur
    }
};

// Filtrer les cryptos selon la recherche
const filteredData = computed(() => {
    const search = searchQuery.value.toLowerCase();

    return (tableData.value || []).filter(crypto =>
        (crypto.nom?.toLowerCase() || '').includes(search) ||
        (crypto.symbole?.toLowerCase() || '').includes(search) ||
        (crypto.prix_actuel?.toString() || '').includes(searchQuery.value)
    );
});

// Ajouter une crypto fictive (exemple)
const addCrypto = () => {
    tableData.value.push({
        nom: "Crypto Test",
        symbole: "TEST",
        prix_actuel: "1000",
        pourcentage: "5%",
        action: { label: "Voir", route: "/cryptos/new" },
    });
};

// Charger les cryptos au montage du composant
onMounted(fetchCryptos);
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
        <h3 class="text-center">Liste Cryptomonnaie</h3>
        <p class="text-center text-muted">Liste des cryptomonnaies sur notre plateforme.</p>

        <!-- Barre de Recherche et Bouton -->
        <div class="d-flex justify-content-between align-items-center my-3">
            <div class="search-container">
                <input type="text" class="form-control search-input" placeholder="🔍 Rechercher une cryptomonnaie..."
                    v-model="searchQuery" />
            </div>

        </div>

        <!-- Tableau -->
        <TableComponent :headers="['Nom', 'Symbole', 'Pourcentage', 'Prix Actuel', 'Action']" :rows="filteredData" />
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
