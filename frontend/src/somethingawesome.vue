<template>
  <v-app>
    <v-main>
      <!-- registartion page -->
      <v-parallax height="800"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
      <v-card width="200" 
        class="mx-auto ma-16"
        elevation="14"
        disabled>
        <v-card-title class="mx-10">
          Sign up!
        </v-card-title>
      </v-card>
      <v-card class="mx-auto my-4" width="200" height="300" color="#BDBDBD">
          <v-text-field v-model="registerUsername"
            label="Username"
            outlined
          ></v-text-field>
          <v-text-field v-model="registerPassword"
            label="Password"
            outlined
          ></v-text-field>
          <v-text-field v-model="registerEmail"
            label="Email"
            outlined
          ></v-text-field>
          <v-card-actions>
            <v-btn id="registration-button" class="ml-2 mb-2 mt-n4">
              Sign Up.
            </v-btn>
            <v-btn id="login-button" class="mr-2 mb-2 mt-n4">
              login.
            </v-btn>
          </v-card-actions>
      </v-card>
      </v-parallax>
      <v-footer 
      height="75"
      dark
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
    registerUsername: "",
    registerPassword: "",
    registerEmail: "",

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
  color: white;
  display: inline-block;
  position: relative;
  margin-left: 250px;
}
#contact-us-btn:after{
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
#contact-us-btn:hover::after{
  transform: scaleX(1);
  transform-origin: bottom left;
}
#registration-button {
  display: inline-block;
  position: relative;
  margin-left: 250px;
}
#registration-button:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
#registration-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
#login-button {
  display: inline-block;
  position: relative;
}
#login-button:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
#login-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
