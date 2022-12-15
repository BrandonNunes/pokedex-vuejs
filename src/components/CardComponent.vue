<script setup lang="ts">
import type {PokeTypesProps} from "@/models/PokeTypesPropsModel";
import axios from "axios";
import {defineComponent, onBeforeMount, onMounted} from "vue";

const props = defineProps<{ pokemon: {name: string, url: string} }>()
let poke: PokeTypesProps;
const getPokeProprieties = async () => {
  try {
    const resp = await axios.get(props.pokemon.url)
    poke = resp.data
    console.log(poke)
  }
  catch (error) {
    console.error(error)
  }
}
const capitalizeText = (text: string) => {
  let firstIndex = text.charAt(0)
  let someText = text.slice(1)
  return firstIndex.toUpperCase() + someText
}
onMounted(() => {
  getPokeProprieties()
})
</script>

<template>
  <div :class="['card', 'type-'+ poke?.types[0].type.name]">
    <h6 class="title">{{capitalizeText(pokemon.name)}}</h6>
    <div>
      <img v-if="poke" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`" alt="pokemon imagem"  />
    </div>
    <span>
      {{poke?.types.map((type, i, self)=> self.length > 1 ? `${type.type.name} ` : `${type.type.name}`).join("")}}
    </span>
    <button class="btn-details" >Ver detalhes</button>
  </div>
</template>

<style scoped>
  .card {
    width: 200px;
    max-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 16px;
    height: 18px;
  }
  .btn-details {
    border: none;
    border-radius: 5px;
    background-color: #57A7F7;
    color: #FFFFFF;
  }
  .type-grass {
    background-color: #35DB37;
  }
  .type-normal {
    background-color: #c4c4c4;
  }
  .type-poison {
    background-color: #9F4EED;
  }
  .type-bug {
    background-color: #E09434;
  }
  .type-water {
    background-color: #7DA7E0;
  }
  .type-fire {
    background-color: #E0231C;
  }
</style>