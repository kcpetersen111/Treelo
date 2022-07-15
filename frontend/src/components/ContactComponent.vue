<template>
  <v-app>
    <v-main>
      <v-card  class="mx-auto my-auto" color="brown" width="500" height="500">
        <v-card-title class="flex justify-center ">Contact Us</v-card-title>
        <v-text-field filled></v-text-field>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ContactComponent",
  props: {
    //
  },
  data: () => ({
    //
  }),
});
</script>
