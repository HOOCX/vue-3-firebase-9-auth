<script setup>
import {userCounterStore} from '@/store/counter'
import { storeToRefs } from 'pinia';

const userCounter = userCounterStore()

const {increment } = userCounter
const {double, count} = storeToRefs(userCounter)
</script>

<template>
  <main>
    <h1>Home Counter: {{ count }} </h1>
    <h2>Double: {{ double }}</h2>
    <button @click="increment">increment</button>
  </main>
</template>
