<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSelect from "@/components/MaterialSelect.vue";
import { getPortefeuilleById } from "@/services/frontoffice/portefeuille/walletService.js";
import { createTransaction } from "@/services/frontoffice/transaction/transactionService";
import { POSITION } from "vue-toastification";

const route = useRoute();
const toast = useToast(); // Initialisation du toast

// Réactives variables
const quantite = ref(0);
const selectedTransaction = ref(null);
const portefeuilleId = route.params.id;
const prixActuel = ref(0);
const nomCrypto = ref("");
const id_cryptos = ref(0);
const date = ref(new Date().toISOString().split("T")[0]);

// Fonction pour récupérer les cryptomonnaies
const fetchData = async () => {
    try {
        const response = await getPortefeuilleById(portefeuilleId);
        console.log("REPONSE = ", response.data);
        nomCrypto.value = response.data.crypto.nom_crypto;
        quantite.value = Math.floor(response.data.solde); // Suppression des décimales
        prixActuel.value = response.data.crypto.prixActuel;
        id_cryptos.value = response.data.crypto.id_cryptos;
    } catch (error) {
        console.error("Erreur API:", error);
        toast.error("Erreur lors du chargement des données.");
    }
};

// Charger les cryptomonnaies au montage du composant
onMounted(fetchData);

// Fonction de soumission du formulaire
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTransaction.value) {
        toast.warning("Veuillez choisir un type de transaction.");
        return;
    }

    const data = {
        quantite: quantite.value,
        prixActuel: prixActuel.value,
        date_transaction: date.value,
        id_cryptos: id_cryptos.value,
        id_type_transaction: selectedTransaction.value,
    };

    console.log("data = ", data);

        const response = await createTransaction(data);
        console.log("REPONSE TRANSACTION = ", response);
        // toast.success("Transaction effectuée avec succès !");
        if (!response.success) {
            toast.error(response.message, {
                position: "top-center",
                duration: 3000,
            });
            
        }else {
            toast.success(response.message, {
                position: "top-center",
                duration: 3000
            });
        }
};
</script>


<template>
    <section>
        <div class="container position-sticky z-index-sticky top-0">
            <div class="row">
                <div class="col-12">
                    <NavbarDefault :sticky="true" />
                </div>
            </div>
        </div>
        <div class="container form py-4">
            <div class="row">
                <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
                    <h3 class="text-center">Transaction: {{ nomCrypto }}</h3>
                    <br>
                    <!-- Formulaire -->
                    <form role="form" id="contact-form" @submit="handleSubmit" autocomplete="off">
                        <div class="card-body">
                            <!-- Nom -->

                            <!-- quantite -->
                            <div class="mb-4">
                                Quantite:
                                <MaterialInput class="input-group-dynamic" :label="{ text: '', class: 'form-label' }"
                                    type="number" v-model="quantite" />
                            </div>

                            <!-- Sélection de transaction -->
                            <div class="mb-4">
                                Type transaction:
                                <MaterialSelect id="transaction-type-select" label="Choisir un type"
                                    v-model="selectedTransaction" :options="[
                                        { value: 1, label: 'Vente' },
                                        { value: 2, label: 'Achat' }
                                    ]" icon="exchange-alt" size="lg" :success="!!selectedTransaction" />
                            </div>
                            <div class="mb-4">
                                Date:
                                <MaterialInput class="input-group-dynamic" :label="{ text: '', class: 'form-label' }"
                                    type="date" v-model="date" />
                            </div>

                        </div>

                        <!-- Bouton de soumission -->
                        <div class="row">
                            <div class="col-md-12">
                                <MaterialButton type="submit" variant="gradient" color="dark" fullWidth>Effectuer
                                </MaterialButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.form {
    margin-top: 80px;
}
</style>
