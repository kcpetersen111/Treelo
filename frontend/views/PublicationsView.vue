<template>
  <div class="publications">
    <PublicationsComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PublicationsComponent from "@/components/PublicationsComponent.vue";

export default {
  name: "PublicationsView",
  components: {
    PublicationsComponent,
  },
};
</script>
