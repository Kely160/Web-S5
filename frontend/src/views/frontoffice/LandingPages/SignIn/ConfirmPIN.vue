<template>
    <div class="wrapper">
      <div class="container">
        <h2 class="title">Entrez votre Code PIN</h2>
        <p class="info">Nous vous avons envoyé le code par email</p>
        <div class="pin-inputs">
          <input v-for="(digit, index) in pin" :key="index" type="text" maxlength="1" class="pin-input"
            v-model="pin[index]" @input="moveNext(index)" @keydown.backspace="movePrev(index)" ref="inputs" />
        </div>
        <p class="message" :class="messageClass">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        pin: ["", "", "", ""], // Code PIN stocké en tableau
        message: "",
        messageClass: "",
        user: null, // Stocker l'utilisateur ici
      };
    },
    mounted() {
      // Récupérer l'utilisateur passé par la route (query parameter)
      const user = JSON.parse(this.$route.query.user);
      this.user = user; // Enregistrer l'utilisateur dans data
      console.log("Utilisateur récupéré : ", this.user.idUtilisateur);
    },
    methods: {
      moveNext(index) {
        if (this.pin[index].length === 1 && index < 3) {
          this.$refs.inputs[index + 1].focus();
        }
        if (this.pin.join("").length === 4) {
          this.verifyPin();
        }
      },
      movePrev(index) {
        if (!this.pin[index] && index > 0) {
          this.$refs.inputs[index - 1].focus();
        }
      },
      async verifyPin() {
        const pinCode = this.pin.join(""); // Convertir le tableau en chaîne
        if (!/^\d{4}$/.test(pinCode)) {
          this.message = "❌ Veuillez entrer un code PIN valide à 4 chiffres.";
          this.messageClass = "error";
          return;
        }
  
        try {
          const response = await axios.get(`http://localhost:8081/api/confirmerConnexion/${this.user.idUtilisateur}/${pinCode}`);
  
          // Si la réponse est OK (200), afficher un message de succès
          this.message = "✔️ " + response.data.message;  // Message de succès
          this.messageClass = "success";
          setTimeout(() => {
            this.$router.push("/accueil");
          }, 1000);
  
        } catch (error) {
          // Gérer les erreurs liées à la requête
          if (error.response) {
            // Si le status est 400, le code PIN est incorrect
            if (error.response.status === 400) {
              this.message = "❌ " + error.response.data.error;  // Afficher le message d'erreur du serveur
              this.messageClass = "error";
            } else {
              // Autres erreurs HTTP
              this.message = "❌ Une erreur est survenue. Veuillez réessayer.";
              this.messageClass = "error";
            }
          } else {
            // Si l'erreur n'est pas liée à la requête HTTP
            this.message = "❌ Une erreur est survenue. Veuillez réessayer.";
            this.messageClass = "error";
          }
        }
      }
  
    }
  };
  </script>
  
  <style scoped>
  /* --- Centrage global de la page --- */
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  /* --- Conteneur principal (centré) --- */
  .container {
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* --- Titre et texte d'information --- */
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .info {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  /* --- Champs de saisie du PIN --- */
  .pin-inputs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .pin-input {
    width: 55px;
    height: 55px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background: #f9f9f9;
  }
  
  .pin-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
    background: white;
  }
  
  /* --- Messages de validation --- */
  .message {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }
  </style>
  