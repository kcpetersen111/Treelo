<template>
  <div class="registration">
    <RegistrationComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import RegistrationComponent from "@/components/RegistrationComponent.vue";

export default {
  name: "RegistrationView",
  components: {
    RegistrationComponent,
  },
};
</script>
