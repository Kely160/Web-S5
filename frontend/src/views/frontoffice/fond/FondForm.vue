<script setup>
import { ref, computed, onMounted } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSelect from "@/components/MaterialSelect.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import NavbarDefault from "../Navbar/NavbarDefault.vue";
import { useToast } from "vue-toastification";
import { fondUtilisateur, storeFond } from "@/services/frontoffice/fond/fondService.js";

const toast = useToast();
const montant = ref("");
const typeOperation = ref(null);
const dateOperation = ref(new Date().toISOString().split('T')[0]); // Date du jour par défaut
const options = [
    { label: "Dépôt", value: 1 },
    { label: "Retrait", value: 2 }
];

const placeholder = "oke";

const montantActuel = ref("");
const message = ref("");  // Message à afficher
const messageType = ref("");  // Type de message ("success" ou "error")

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!montant.value || !typeOperation.value || !dateOperation.value) {
        toast.error("Veuillez remplir tous les champs.", {
            position: "top-right",
            duration: 3000,  // Durée d'affichage de 3 secondes
        });
        return;
    }

    
    const data = {
        montant : montant.value,
        daty: dateOperation.value,
        type_operation : typeOperation.value
    };

    const response = await storeFond(data);
    console.log("Response store = ", response);
    // Si l'appel est réussi
    if (response.success) {
        toast.success(response.message, {
            position: "top-right",
            duration: 3000,  // Durée d'affichage de 3 secondes
        });
    } else {
        toast.error(response.message, {
            position: "top-right",
            duration: 3000,  // Durée d'affichage de 3 secondes
        });
    }
};


const getData = async (e) => {
    const data = await fondUtilisateur();
    montantActuel.value = data.data.ariary;
};

onMounted(getData);
</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>
    <section class="form-container">
        <h3 class="form-title">Gérer les fonds</h3>

        <!-- Montant actuel -->
        <div class="current-amount">
            <p>Fond actuel : <span class="amount-value">{{ montantActuel }} Ar</span></p>
        </div>

        <form @submit="handleSubmit" class="form-content">
            <MaterialInput 
                label="Montant" 
                type="number" 
                v-model="montant" 
                class="form-input"
                :class="{ 'input-error': !montant }"
                aria-label="Montant de l'opération"
            />
            
            <MaterialSelect 
                v-model="typeOperation" 
                :options="options" 
                label="Type d'opération" 
                class="form-select"
                :class="{ 'input-error': !typeOperation }"
                aria-label="Sélectionner le type d'opération"
            />
            
            <MaterialInput 
                label="Date" 
                type="date" 
                v-model="dateOperation" 
                class="form-input"
                :class="{ 'input-error': !dateOperation }"
                aria-label="Date de l'opération"
            />
            
            <MaterialButton 
                type="submit" 
                variant="gradient" 
                color="dark" 
                fullWidth
                class="submit-button"
                aria-label="Confirmer l'opération"
                @click="handleSubmit"
            >
                Confirmer l'opération
            </MaterialButton>
        </form>

        <!-- Message de succès ou d'erreur -->
        <div v-if="message" :class="['message', messageType === 'success' ? 'success' : 'error']">
            {{ message }}
        </div>
    </section>
</template>



<style scoped>
.form-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2.5rem;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 100px;
}

.form-title {
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -0.5px;
    position: relative;
    padding-bottom: 0.5rem;
}

.form-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3498db 0%, #2c3e50 100%);
}

.form-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

:deep(.form-input .material-input),
:deep(.form-select .material-select) {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8fafc;
    color: #2c3e50;
    font-weight: 500;
}

:deep(.form-input label),
:deep(.form-select label) {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    letter-spacing: 0.3px;
    padding: 10px;
}

:deep(.form-input:focus-within .material-input),
:deep(.form-select:focus-within .material-select) {
    border-color: #3498db;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.15);
    transform: translateY(-2px);
}

:deep(.input-error .material-input),
:deep(.input-error .material-select) {
    border-color: #ff4757;
    background: #fff5f5;
    box-shadow: 0 0 0 4px rgba(255, 71, 87, 0.1);
}

.submit-button {
    margin-top: 1.5rem;
    padding: 16px 24px;
    font-weight: 700;
    letter-spacing: 0.8px;
    font-size: 1rem;
    background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
    color: white;
    border-radius: 12px;
    border: none;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
}

.submit-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(52, 152, 219, 0.25);
}

.submit-button:hover::after {
    opacity: 1;
}

.submit-button:active {
    transform: translateY(1px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.2);
}

.message {
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    font-weight: bold;
}

.success {
    background-color: #28a745;
    color: white;
}

.error {
    background-color: #dc3545;
    color: white;
}

@media (max-width: 480px) {
    .form-container {
        padding: 1.8rem;
        margin: 1rem;
        border-radius: 16px;
    }
    
    .form-title {
        font-size: 1.7rem;
    }
    
    :deep(.form-input .material-input),
    :deep(.form-select .material-select) {
        padding: 12px 16px;
        font-size: 0.95rem;
    }
    
    .submit-button {
        padding: 14px 20px;
        font-size: 0.95rem;
    }
}
.current-amount {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.2rem;
    color: #2c3e50;
    font-weight: bold;
}

.amount-value {
    color: #3498db;
}
</style>

