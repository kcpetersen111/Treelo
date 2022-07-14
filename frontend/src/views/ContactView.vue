<template>
  <div class="contact">
    <ContactComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import ContactComponent from "@/components/ContactComponent.vue";

export default {
  name: "ContactView",
  components: {
    ContactComponent,
  },
};
</script>
