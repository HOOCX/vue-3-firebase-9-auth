 <script setup >
import {RouterLink} from 'vue-router';
import {useGetData} from '@/composables/getData';

const {data, loading, getData, errorData} = useGetData()

 getData("https://pokeapi.co/api/v2/pokemon");
</script>
<template>
    <h1>Pokemons</h1>
    <p v-if="loading">Cargando Pokemones...</p>
    <div class="alert alert-danger mt-2" v-if="errorData">{{ errorData }}</div>
    <div v-if="data">
        <ul class="list-group">
            <li v-for="poke in data.results" class="list-group-item">
                <router-link :to="`/pokemons/${poke.name}`">{{ poke.name }}</router-link>
            </li>
        </ul>
        <div class="mt-2">
            <button :disabled="!data.previous" class="btn btn-warning me-2" @click="getData(data.previous)">Previous</button>
            <button :disabled="!data.next" class="btn btn-primary" @click="getData(data.next)">next</button>

        </div>
        
    </div>
</template> 