<template>
  <v-card class="justify-center ma-2" style="display: flex">
    <v-card-title
      class="justify-center green--text text--darken-2 font-weight-bold"
    >
      hi, am a card with id {{ cardData.id }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "CardComponent",
  props: {
    cardData: {
      id: Number,
      name: String,
      description: String,
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
