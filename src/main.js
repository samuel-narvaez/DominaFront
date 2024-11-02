import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ArgonDashboard from "./argon-dashboard";
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

createApp(App)
    .use(store)
    .use(router)
    .use(ArgonDashboard)
    .use(ToastService)
    .use(ConfirmationService)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .mount("#app")

