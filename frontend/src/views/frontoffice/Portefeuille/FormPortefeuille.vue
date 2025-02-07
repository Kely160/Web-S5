<script setup>
// Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSelect from "@/components/MaterialSelect.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { ref, onMounted } from "vue";
import { liste } from "@/services/frontoffice/crypto/cryptoService.js"; 
import { create } from "@/services/frontoffice/portefeuille/walletService.js"; 

// Réactives variables
const nom = ref(""); // Utiliser ref pour rendre réactif
const solde = ref(0);
const selectedCrypto = ref(null); // Valeur par défaut pour la sélection
const idUtilisateur = 1;

var tableData = ref([]); // Données des cryptos

// Fonction pour récupérer les cryptomonnaies
const fetchCryptos = async () => {
    try {
        const response = await liste();
        const cryptos = response?.data || []; // Sécurisation

        tableData.value = cryptos.map(crypto => ({
            label: crypto.nom_crypto || 'Inconnu',
            value: crypto.id_cryptos
        }));
    } catch (error) {
        console.error("Erreur API:", error);
        tableData.value = []; // Réinitialiser en cas d'erreur
    }
};

// Charger les cryptomonnaies au montage du composant
onMounted(fetchCryptos);

// Fonction de soumission du formulaire
const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher la soumission par défaut

    if (!selectedCrypto.value) {
        alert("Veuillez choisir une cryptomonnaie.");
        return;
    }

    const data = {
        nom_portefeuille: nom.value,
        solde: solde.value,
        Id_cryptos: selectedCrypto.value,
        Id_utilisateur: idUtilisateur
    };

    try {
        const response = await create(data);
        console.log("reponse = ", response);

        // Envoie les données au serveur (remplacer cette partie par un appel API réel)
        console.log("Formulaire soumis:", data);
        alert("Portefeuille ajouté avec succès.");
    } catch (error) {
        alert(error);
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
                    <h3 class="text-center">Ajouter un portefeuille</h3>
                    <br>
                    <!-- Formulaire -->
                    <form role="form" id="contact-form" @submit="handleSubmit" autocomplete="off">
                        <div class="card-body">
                            <!-- Nom -->
                            <div class="row">
                                <div class="col-md-12">
                                    Nom:
                                    <MaterialInput class="input-group-dynamic mb-4"
                                        :label="{ text: '', class: 'form-label' }" type="text" v-model="nom" />
                                </div>
                            </div>

                            <!-- Solde -->
                            <div class="mb-4">
                                Solde:
                                <MaterialInput class="input-group-dynamic" :label="{ text: '', class: 'form-label' }"
                                    type="number" v-model="solde" />
                            </div>

                            <!-- Sélection de cryptomonnaie -->
                            <div class="mb-4">
                                Choisir crypto:
                                <MaterialSelect id="crypto-select" label="Choisir une cryptomonnaie"
                                    v-model="selectedCrypto" :options="tableData" icon="coins" size="lg"
                                    :success="!!selectedCrypto" />
                            </div>

                        </div>

                        <!-- Bouton de soumission -->
                        <div class="row">
                            <div class="col-md-12">
                                <MaterialButton type="submit" variant="gradient" color="dark" fullWidth>Ajouter
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
