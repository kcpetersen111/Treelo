<template>
  <v-app>
    <v-main>
      this doesnt blow
      {{ page }}
      <Calendar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Calendar from "./components/Calendar.vue";

export default Vue.extend({
  name: "App",

  components: {
    Calendar,
  },

  data: () => ({
    page: "test1",
    //
  }),
});
</script>
