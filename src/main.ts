
import './assets/main.css'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
const pinia = createPinia();
const app = createApp(App)
pinia.use(({ store }) => {
    store.router = markRaw(router);
});
app.use(pinia )
app.use(ElementPlus)
app.use(router)

app.mount('#app')
