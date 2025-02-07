<script setup>
import { ref, defineEmits } from "vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { storeFond } from "@/services/frontoffice/portefeuille/walletService.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const emit = defineEmits(["submitOperation"]);
const portefeuilleId = route.params.id;
const isLoading = ref(false); // État de chargement
const notification = ref({ message: "", type: "" }); // Notification

// Utilisation de ref pour la réactivité
const form = ref({
    type_operation: '1',
    montant: null,
    daty: new Date().toISOString().split("T")[0],
});

const showNotification = (message, type) => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: "", type: "" }; // Masquer la notification après 3 secondes
    }, 3000);
};

const submitForm = async () => {
    if (!form.value.montant || form.value.montant <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    isLoading.value = true; // Activer le spinner

    try {
        const response = await storeFond(portefeuilleId, form.value);
        console.log("Opération réussie :", response);
        
        // Réinitialisation du formulaire
        form.value = {
            type_operation: '1',
            montant: null,
            daty: new Date().toISOString().split("T")[0]
        };

        // Affichage de la notification de succès
        showNotification("Opération réussie!", "success");
        emit("submitOperation", response); // Émettre la réponse complète
    } catch (error) {
        console.error("Erreur lors de l'opération :", error);
        // Affichage de la notification d'erreur
        showNotification("Une erreur est survenue lors de l'opération.", "error");
    } finally {
        isLoading.value = false; // Désactiver le spinner dans tous les cas
    }
};
</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>
    <section class="card gestion-fonds-card p-4">
        <h3 class="text-center text-light mb-4">Gérer les fonds</h3>

        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="typeOperation" class="form-label text-light">Type d'opération :</label>
                <select id="typeOperation" v-model="form.type_operation" class="form-select">
                    <option value="1">Dépôt</option>
                    <option value="2">Retrait</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="montant" class="form-label text-light">Montant :</label>
                <input id="montant" v-model="form.montant" type="number" class="form-control" min="0.01" step="0.01"
                    placeholder="Entrez un montant" required />
            </div>

            <div class="mb-3">
                <label for="dateOperation" class="form-label text-light">Date d'opération :</label>
                <input id="dateOperation" v-model="form.daty" type="date" class="form-control" required />
            </div>

            <div class="text-center">
                <button type="submit" class="btn btn-success btn-lg" :disabled="isLoading">
                    <span v-if="!isLoading">Valider</span>
                    <span v-else>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Traitement...
                    </span>
                </button>
            </div>
        </form>
    </section>

    <!-- Notification Toast -->
    <div v-if="notification.message" :class="['notification', notification.type]">
        {{ notification.message }}
    </div>
</template>

<style scoped>
/* Ajout du style pour le spinner */
.spinner-border {
    vertical-align: middle;
    margin-right: 0.5rem;
}

/* Amélioration générale de la carte de gestion des fonds */
.gestion-fonds-card {
    max-width: 500px;
    margin: auto;
    border-radius: 20px;
    background: rgba(31, 43, 57, 0.85);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease-in-out;
    margin-top: 100px;
    padding: 25px;
}

/* Ajout d'un effet d'ombre sur le bouton au survol */
button {
    transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
    background-color: #218838;
    transform: translateY(-2px);
}

button:disabled {
    background-color: #6c757d !important;
    cursor: not-allowed;
}

button .spinner-border {
    margin-left: 10px;
}

/* Styles des champs du formulaire */
.form-label {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f8f9fa;
}

.form-select, .form-control {
    background-color: #343a40;
    border-color: #495057;
    color: #f8f9fa;
    border-radius: 10px;
    padding: 12px;
    transition: all 0.3s ease;
}

/* Effet de focus sur les champs de saisie */
.form-select:focus, .form-control:focus {
    border-color: #28a745;
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

/* Espacement et disposition du formulaire */
.mb-3 {
    margin-bottom: 1.5rem;
}

/* Styles généraux pour le texte */
h3 {
    font-size: 1.8rem;
    color: #f8f9fa;
    font-weight: 700;
}

/* Pour rendre le formulaire responsive */
@media (max-width: 600px) {
    .gestion-fonds-card {
        max-width: 100%;
        padding: 20px;
    }

    h3 {
        font-size: 1.5rem;
    }
}

/* Notification Toast */
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #28a745; /* Couleur de succès */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
}

.notification.error {
    background-color: #dc3545; /* Couleur d'erreur */
}

.notification.success {
    background-color: #28a745; /* Couleur de succès */
}
</style>
