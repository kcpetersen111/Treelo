<template>
  <div class="login" style="height: 100%">
    <LoginComponent style="height: 100%" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "LoginView",
  props: {
    //
  },
  components: {
    LoginComponent,
  },
};
</script>
