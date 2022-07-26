<template>
  <v-card>
    <v-card-title class="text-h4 purple--text font-weight-bold">
      {{ containerData.name }}
    </v-card-title>
    <!--
    <v-card-text>
      {{ containerData.description }}
    </v-card-text>
    -->

    <v-list v-if="fetchedCards.length > 0">
      <CardComponent
        v-for="(card, index) in fetchedCards"
        :key="index"
        :cardData="card"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
let URL = "http://localhost:8081";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ContainerComponent",
  props: {
    containerData: {
      _id: String,
      creatorID: String,
      name: String,
      description: String,
      cards: Array,
    },
  },
  components: {
    CardComponent,
  },
  data: () => ({
    fetchedCards: [],
  }),
  created() {
    this.fetchCards();
  },
  methods: {
    fetchCards: async function () {
      for (let i = 0; i < this.containerData.cards.length; i++) {
        let id = this.containerData.cards[i];

        let response = await fetch(`${URL}/card/${id}`, {
          credentials: "include",
        });

        if (response.status == 200) {
          let body = await response.json();
          console.log("card: ", body);
          this.fetchedCards.push(body);
        } else {
          console.log("ERROR", response.status, response);
        }
      }
    },
  },
};
</script>
