import { createWebHistory, createRouter } from 'vue-router'

import solutionsAnnee2024 from '@/components/solutionsAnnee2024.vue'
import solutionsAnnee2023 from '@/components/solutionsAnnee2023.vue'

const routes = [
    { path: '/', component: solutionsAnnee2024 },
    { path: '/2024', component: solutionsAnnee2024 },
    { path: '/2023', component: solutionsAnnee2023 },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router