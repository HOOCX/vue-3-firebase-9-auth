<template>
  <h1>app base</h1>
  <nav v-if="!userStore.loadingSession"  >
    <router-link to="/" v-if="userStore.userData">Home</router-link> |
    <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
    <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
    <button @click="userStore.logOutUser" v-if="userStore.userData">Logout</button>
  </nav>
  <div v-else>
    loading user...  
  </div>
  <router-view></router-view>
</template>
<script setup>
import { useUserStore } from './store/user'

const userStore = useUserStore()

</script>
