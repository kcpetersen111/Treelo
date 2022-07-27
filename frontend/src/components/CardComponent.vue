<template>
  <v-card class="justify-center ma-2 grab" style="display: flex;" >
    <v-card-title
      class="justify-center green--text text--darken-2 font-weight-bold pr-1"
    >
      {{ cardData.name }}
      <!-- {{ card.description }} -->
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "CardComponent",
  props: {
    cardData: {
      _id: String,
      name: String,
      // description: String,
    },
  },
  created() {
    // console.log(this.$props.cardData);
  },
  methods: {
    //
  },
};
</script>
<style>
  .grab{
    cursor: -webkit-grab;
  }
  .grab:active{
    cursor: grabbing;
  }
</style>