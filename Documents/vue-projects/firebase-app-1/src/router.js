import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from './store/user'
import {useDatabaseStore} from './store/database'

import Home from './views/Home.vue'
import Editar from './views/Editar.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Perfil from './views/Perfil.vue'
import NotFound from './views/NotFound.vue'

const requireAuth = async(to, from, next) => {
   const userStore = useUserStore()
   userStore.loadingSession = true
    const user = await userStore.currentUser()
    if (user) {
        next()
        
    } else {
        next('/login')
    }
    userStore.loadingSession = false
}

const redirecciones = async (to, from, next) => {
    const databaseStore = useDatabaseStore()
    const userStore = useUserStore()
    userStore.loadingSession = true
    const name = await databaseStore.getURL(to.params.pathMatch[0])
    if (!name) {
        next()
        userStore.loadingSession = false
    } else {
        window.location.href = name;
        userStore.loadingSession = true
        next();

    }
    //console.log(to.params.pathMatch[0])
}
const routes = [
    {path: '/', component: Home, beforeEnter: requireAuth, name: 'home'},
    {path: '/perfil', component: Perfil, beforeEnter: requireAuth, name: 'perfil'},
    {path: '/editar/:id', component: Editar, beforeEnter: requireAuth, name: 'editar'},
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register, name: 'register'},
    {path: '/:pathMatch(.*)*', component: NotFound, name: '404', beforeEnter: redirecciones},
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;
