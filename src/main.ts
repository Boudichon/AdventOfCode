import { createApp } from 'vue'
import App from './app.vue'
import Router from './router/router';

createApp(App as any).use(Router).mount('#app')
