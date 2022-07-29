<template>
  <div class="about">
    <AboutComponent />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import AboutComponent from "@/components/AboutComponent.vue";

export default {
  name: "AboutView",
  components: {
    AboutComponent,
  },
};
</script>

<style>
</style>
