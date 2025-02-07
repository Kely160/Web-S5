<script scoped>
import { login, getUtilisateur } from '@/services/frontoffice/auth/authService';
import MaterialInput from '@/components/MaterialInput.vue';  // Assure-toi que ce chemin est correct
import MaterialButton from '@/components/MaterialButton.vue'; // Assure-toi d'importer MaterialButton si tu l'utilises

export default {
  components: {
    MaterialInput,
    MaterialButton
  },
  data() {
    return {
      model: {
        email: '',
        password: ''
      },
      loading: false,  // État du spinner
      errorMessage: "" // Stocke le message d'erreur
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.errorMessage = ""; // Réinitialiser le message d'erreur

      const credentials = {
        email: this.model.email,
        password: this.model.password
      };

      console.log(credentials);

      try {
        const userData = await login(credentials);
        console.log("Connexion réussie !", userData);
        
        if (userData.success) {
          // Redirige vers une autre page après connexion réussie
          this.$router.push({ path: "/confirm-pin", query: { user: JSON.stringify(userData.user) } });
        } else {
          this.errorMessage = userData.message || "Identifiants incorrects.";
        }
      } catch (error) {
        this.errorMessage = error.message || "Une erreur est survenue lors de la connexion.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <Header>
    <div class="page-header align-items-start min-vh-100" :style="{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
    }" loading="lazy">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                    Se connecter
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent="onSubmit">
                  <!-- Email Input -->
                  <MaterialInput v-model="model.email" class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }" type="email" />
                  <!-- Password Input -->
                  <MaterialInput v-model="model.password" class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }" type="password" />

                  <!-- Affichage des erreurs -->
                  <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                  </div>

                  <!-- Submit Button -->
                  <div class="text-center">
                    <MaterialButton class="my-4 mb-2" variant="gradient" color="success" fullWidth :disabled="loading">
                      <span v-if="loading">Chargement...</span>
                      <span v-else>Login</span>
                    </MaterialButton>
                  </div>

                  <p class="mt-4 text-sm text-center">
                    Don't have an account?
                    <a href="#" class="text-success text-gradient font-weight-bold">Sign up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div class="copyright text-center text-sm text-white text-lg-start">
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a href="https://www.creative-tim.com" class="font-weight-bold text-white"
                  target="_blank">ITUniversityP16</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>

<style scoped>
.form-control:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}
</style>
