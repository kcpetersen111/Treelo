<template>
  <v-card>
    <v-card-title class="text-h4 purple--text font-weight-bold" >
      {{ containerData.name }}
    </v-card-title>
    <v-card-text>
        {{containerData.description}}
    </v-card-text>
    <v-list v-for="(card, index) in cards" :key="index">
      <CardComponent
        :key="card.cardID"
        :cardData="card"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ContainerComponent",
  props: {
    containerData: {
      _id: String,
      creatorID:String,
      name:String,
      description:String,
      cards:Array,
    },
  },
  components: {
    CardComponent,
  },
  data: () => ({
      cards: [],
  }),
  created() {
      this.getCards();
  },
  methods: {
      getCards: async function(){
          for( let i; i>containerData.cards.length; i++){
              let id = containerData[i];
              let response = await fetch(`${URL}/card/${id}`,{
                  credentials: "include",
              });
              if (response.status == 200){
                  let body = await response.json();
                  this.cards.push(body);
              }
              else{
                 console.log("Error" , response.status, response);
              }
          }
      },

    //
  },
};
</script>
