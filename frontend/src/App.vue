<template>
  <v-app>
    <v-main>
      <Helloworld />
      <Calendar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Helloworld from "./components/Helloworld.vue";
import Calendar from "./components/Calendar.vue";

export default Vue.extend({
  name: "App",

  components: {
    Calendar,
    Helloworld,
  },

  data: () => ({
    //
  }),
});
</script>
