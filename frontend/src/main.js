import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";


// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";

// Toast
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

const options = {
  position: 'top-right',
  timeout: 3000,  // Temps de disparition (3 secondes)
};

app.use(createPinia());
app.use(router);
app.use(materialKit);
app.use(Toast, options);
app.mount("#app");
