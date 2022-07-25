<template>
  <v-card>
    <v-card-title class="text-h4 purple--text font-weight-bold" @click="logit()">
      {{ containerData.name }}
    </v-card-title>
    <v-card-text>
        {{containerData.description}}
    </v-card-text>
    <v-list>
      <CardComponent
        v-for="card in containerData.cards"
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
      creatorID: String,
      name: String,
      description: String,
      cards: Array,
    },
  },
  components: {
    CardComponent,
  },
  created() {
  },
  methods: {
      logit: function(){
        console.log(this.$props.containerData);
      },

    //
  },
};
</script>
