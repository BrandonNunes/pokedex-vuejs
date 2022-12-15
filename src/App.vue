<script setup lang="ts">
import api from "@/services/api";
import {defineComponent, onBeforeMount, onMounted, ref} from "vue";
import type {PokeTypesModels} from "@/models/PokeTypesModels";
import CardComponent from "@/components/CardComponent.vue"


let pokemons: PokeTypesModels;
let results: Array<{name: string, url: string}>;
let loading = false
const getPokeList = async () => {
  loading = true
  try {
    const resp = await api.get(`pokemon?limit=50&offset=0.`)
    results = resp.data.results
    console.log(results)
    loading = false
  }
  catch (error) {
    loading = false
    console.error(error)
  }
}

onBeforeMount(() => {
  getPokeList()
})

</script>

<template>
  <div class="card-container" >
    <!--    <ProgressSpinner v-if="!(!!pokemons)" />-->
    <CardComponent  v-if="results" v-for="poke in results" :pokemon="poke" />
        <p v-if="pokemons" v-for="poke in results" >{{poke.name}}</p>
  </div>


</template>

<style scoped>
.card-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  border-radius: 8px;
}

</style>
