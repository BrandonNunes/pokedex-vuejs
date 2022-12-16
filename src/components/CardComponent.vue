<script lang="ts">
import type {PokeTypesProps} from "@/models/PokeTypesPropsModel";
import {defineComponent, type PropType} from "vue";

export default defineComponent({
  name: 'CardComponent',
  props: {
    pokemon: {
      type: Object as PropType<PokeTypesProps>,
      required: true
    }
  },
  methods: {
  capitalizeText(text: string) {
    let firstIndex = text.charAt(0)
    let someText = text.slice(1)
    return firstIndex.toUpperCase() + someText
}
  }
})
</script>

<template>
  <div :class="['card', 'type-'+ pokemon.types[0].type.name]" title="click para ver detalhes">
    <h6 class="title">{{capitalizeText(pokemon.name)}}</h6>
    <div class="container-img" >
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="pokemon imagem"  />
    </div>
    <span style="font-weight: bold;" >
      {{pokemon.types.map((type, i, self)=> self.length > 1 ? `${type.type.name} ` : `${type.type.name}`).join("")}}
    </span>
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
    padding-bottom: 5px;
    border-radius: 5px;
    box-shadow: 2px 3px #c4c4c4;
    background-color: #f4f4f4f4;
    cursor: pointer;
  }
  @media (max-width: 440px) {
    .card {
      width: 150px;
    }
  }
  .title {
    font-size: 16px;
    height: 18px;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 2px 2px #000000;
    margin-bottom: 5px;
  }
  .container-img {
    background-color: #FFFFFF;
    padding: 5px;
    height: 100px;
    border-radius: 50%;
  }
  .container-img img {
    width: 90%;
  }
  .btn-details {
    border: none;
    border-radius: 5px;
    background-color: #57A7F7;
    color: #FFFFFF;
    padding: 5px;
    cursor: pointer;
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
  .type-electric {
    background-color: #FAEB52;
  }
  .type-fairy {
    background-color: #FAB3F5;
  }
  .type-ground {
    background-color: #E39F2D;
  }
  .type-fighting {
    background-color: #313EFA;
  }
  .type-psychic {
    background-color: #FAF7EC;
  }
  .type-rock {
    background-color: #c9c9c9;
  }
</style>
