<template>
  <div class="Settings">
    <SettingsComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import SettingsComponent from "@/components/SettingsComponent.vue";

export default {
  name: "SettingsView",
  components: {
    SettingsComponent,
  },
};
</script>