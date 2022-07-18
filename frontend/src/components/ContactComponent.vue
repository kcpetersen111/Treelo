<template>
  <v-app>
    <v-main>
      <video autoplay muted loop id="myVideo">
        <source src="../assets/videoblocks-aerial-clouds-forest_r61rdndsb__7977a5c90b21e53844682ceb7958572f__P360.mp4" type="video/mp4">
      </video>
      <v-card  class="mx-auto my-auto" color="brown" width="500" height="500">
        <v-card-title class="flex justify-center ">Contact Us</v-card-title>
        <v-text-field class="px-7 rounded-pill" 
        solo-inverted
        label="First Name"
        ></v-text-field>
        <v-text-field class="px-7 rounded-pill" 
        solo-inverted
        label="Last Name"
        ></v-text-field>
        <v-text-field class="px-7 rounded-pill"
        solo-inverted
        label="Email"></v-text-field>
        <v-textarea class="px-7 rounded-xl"
        solo-inverted
        clearable
        label="What can we help you with?"></v-textarea>
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
