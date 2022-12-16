<script lang="ts">
import api from "@/services/api";
import axios from "axios";
import {defineComponent, ref} from "vue";
import type {PokeTypesProps} from "@/models/PokeTypesPropsModel";
import CardComponent from "@/components/CardComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from "primevue/inputtext";

export default defineComponent({
  name: 'App',
  components: {
    CardComponent,
    HeaderComponent,
    Dialog,
    Button,
    InputText
  },
  data:() => {
    return {
      results: [] as Array<{name: string, url: string}>,
      loading: true,
      pokeList: [] as PokeTypesProps[],
      display: false,
      selectedPoke: {} as PokeTypesProps,
      searchText: ref(""),
      nextLink: null as string | null,
      previousLink: null as string | null
    }
  },
  methods: {
      async getPokeList() {
      try {
        const resp = await api.get(`pokemon?limit=100&offset=0.`)
        this.pokeList = []
        this.previousLink = resp.data.previous
        this.nextLink = resp.data.next
        this.results = resp.data.results
        for (let i = 0; i <= this.results.length; i++ ){
          const poke: PokeTypesProps | undefined = await this.getPokeProprieties(this.results[i]?.url)
          this.pokeList.push(poke)
          if (i >= this.results.length){
            this.loading = false;
            console.log('fim do loop')
          }
        }
        this.loading = false;
      }
      catch (error) {
        console.error(error)
      }
    },
    async geNextList() {
      try {
        const resp = await axios.get(this.nextLink as string)
        this.previousLink = resp.data.previous
        this.nextLink = resp.data.next
        this.results = resp.data.results
        this.pokeList = []
        for (let i = 0; i <= this.results.length; i++ ){
          const poke: PokeTypesProps | undefined = await this.getPokeProprieties(this.results[i]?.url)
          this.pokeList.push(poke)
          if (i >= this.results.length){
            this.loading = false;
            console.log('fim do loop')
          }
        }
        this.loading = false;
      }
      catch (error) {
        console.error(error)
      }
    },
    async getPreviousList() {
      try {
        const resp = await axios.get(this.previousLink as string)
        this.previousLink = resp.data.previous
        this.nextLink = resp.data.next
        this.results = resp.data.results
        this.pokeList = []
        for (let i = 0; i <= this.results.length; i++ ){
          const poke: PokeTypesProps | undefined = await this.getPokeProprieties(this.results[i]?.url)
          this.pokeList.push(poke)
          if (i >= this.results.length){
            this.loading = false;
            console.log('fim do loop')
          }
        }
        this.loading = false;
      }
      catch (error) {
        console.error(error)
      }
    },
    async getPokemon() {
        if (this.searchText == ""){
          await this.getPokeList()
          return;
        }
      try {
        this.nextLink = null
        this.previousLink = null
        const resp = await api.get(`pokemon/${this.searchText}/`)
        let list = resp.data
        if (list) {
          this.pokeList = []
          this.pokeList.push(list)
        } else {
          this.pokeList = []
        }
      }
      catch (error) {
        console.error(error)
        this.pokeList = []
      }
    },
    async getPokeProprieties (url: string) {
        const resp = await axios.get(url)
        let poke: PokeTypesProps = resp.data
        // console.log(poke)
        return poke;
    },
    openDetails(pokemon: PokeTypesProps) {
      this.selectedPoke = pokemon
      this.display = true
    }
  },
  mounted() {
    this.getPokeList()
  }
})
</script>

<template>
  <HeaderComponent headTitle="PokeVueDex" />
  <div class="container-search" >
    <InputText v-model="searchText" placeholder="Buscar Pokemon" @keydown.enter="getPokemon" />
    <Button label="Buscar" @click="getPokemon" />
  </div>
  <div class="card-container" >
    <CardComponent 
        v-if="pokeList.length > 0" 
        v-for="(poke, index) in pokeList" 
        :pokemon="poke" 
        :key="index" 
        @click="openDetails(poke)"/>
       
    <p v-else-if="!pokeList.length" style="color: #fff;" >Loading...</p>
      <Dialog
        v-model:visible="display" 
        :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}" >
        <template #header>
        <h3>{{selectedPoke.name}}</h3>
      </template>
      <div class="content-details" >
        <img :src="selectedPoke.sprites.front_default" alt="foto pokemon" />
        <ul>
          <p>Habilidades:</p>
          <li v-for="poke in selectedPoke.abilities" > {{poke.ability.name}} </li>
        </ul>
        <ul>
          <p>Status:</p>
          <li v-for="poke in selectedPoke.stats" > {{poke.stat.name}}: {{poke.base_stat}} </li>
        </ul>
      </div>  
      <template #footer>
        <Button label="Fechar" @click="display = false" />
      </template>
    </Dialog>
  </div>
  <div class="container-search" v-show="previousLink || nextLink" >
    <Button label="Anterior" :disabled="previousLink === null" @click="getPreviousList"  />
    <Button label="Próximo" :disabled="nextLink === null" @click="geNextList" />
  </div>

</template>

<style scoped>
.card-container {
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  border-radius: 8px;
}
.content-details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  background-color: #f1f1f1;
}
.content-details ul {
  border: 1px solid black;
  border-radius: 10px;
  min-width: 200px;
  padding-bottom: 10px;
  color: #000000;
}
.content-details ul p{
  font-weight: bold;
  text-align: left;
}
.container-search {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
  gap: 10px;
}

</style>
