<template>
  <v-app>
    <v-main>
      <v-card width="350" 
        class="mx-auto ma-16"
        elevation="14">
        <v-card-title>
          Sign up!
        </v-card-title>
      </v-card>
      <v-footer fixed
      height="100"
      color="rgb(40%, 34%, 49%)"
      >
        <a id="contact-us-btn" v-on:click="buttonTest">
          Contact us.
        </a>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
//import Calendar from "./components/Calendar.vue";

export default Vue.extend({
  name: "App",

  components: {
    //Calendar,
  },

  data: () => ({
    page: "test1",
    //
  }),
  methods:{
    buttonTest: function(){
      console.log("it works")
    }
  }
});
</script>
<style>
#contact-us-btn{
  color: black;
  display: flex;
  margin-left: 250px;
}
</style>
