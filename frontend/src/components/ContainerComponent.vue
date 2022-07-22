<template>
  <v-card>
    <v-card-title class="text-h4 purple--text font-weight-bold">
      {{ containerData.name }}
    </v-card-title>
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
      id: Number,
      name: String,
      description: String,
      cards: Array,
    },
  },
  components: {
    CardComponent,
  },
  created() {
    // console.log(this.$props.containerData);
  },
  methods: {
    //
  },
};
</script>
