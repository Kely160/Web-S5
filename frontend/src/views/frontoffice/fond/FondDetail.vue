<script setup>
import { ref, computed, onMounted } from "vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { fondUtilisateur } from "@/services/frontoffice/fond/fondService.js";

const fonds = ref({
    montant_usd: 0,
    montant_euro: 0,
    montant_ariary: 0
});

const handleManageFunds = () => {
    alert("Redirection vers la gestion des fonds...");
};

const fetchFond = async () => {
    try {
        const response = await fondUtilisateur();
        fonds.value.montant_usd = response.data.usd;
        fonds.value.montant_euro = response.data.euro;
        fonds.value.montant_ariary = response.data.ariary;


    } catch (error) {
        console.error("Erreur API:", error);
    }
};
onMounted(fetchFond);

</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>
    <section class="fonds-container">
        <h3 class="title">État des Fonds</h3>
        <div class="fonds-card">
            <div class="fonds-item">
                <img src="../../../assets/icons/dollar.png" alt="USD" class="icon" />
                <p><strong>USD :</strong> <span class="amount">${{ fonds.montant_usd }}</span></p>
            </div>
            <div class="fonds-item">
                <img src="../../../assets/icons/euro.png" alt="Euro" class="icon" />
                <p><strong>EUR :</strong> <span class="amount">€{{ fonds.montant_euro.toFixed(2) }}</span></p>
            </div>
            <div class="fonds-item">
                <img src="../../../assets/icons/ariary.png" alt="Ariary" class="icon" />
                <p><strong>MGA :</strong> <span class="amount">{{ fonds.montant_ariary.toLocaleString() }} MGA</span>
                </p>
            </div>
        </div>
        <router-link to="fondForm" class="manage-button btn">Gerer les Fonds</router-link>

    </section>
</template>

<style scoped>
.fonds-container {
    max-width: 450px;
    margin: auto;
    padding: 20px;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    text-align: center;
    color: white;
    margin-top: 100px;
}

.title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
    color: rgb(185, 197, 207);
}

.fonds-card {
    background: rgba(255, 255, 255, 0.15);
    padding: 15px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
}

.fonds-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.fonds-item:last-child {
    border-bottom: none;
}

.icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.amount {
    font-weight: bold;
    font-size: 18px;
    color: #ffea00;
}

.manage-button {
    margin-top: 15px;
    padding: 10px 15px;
    width: 100%;
    border: none;
    border-radius: 8px;
    background: #ffea00;
    color: #1e3c72;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
}

.manage-button:hover {
    background: #ffd700;
}
</style>
