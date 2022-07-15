<template>
  <v-app>
    <v-parallax 
    height="1000"
      src='https://cdn.shopify.com/s/files/1/0326/7189/articles/General_Sherman_tree_2000x.jpg?v=1627936731'
    >
    <v-main>
      <!-- registartion page -->
      <v-card width="200" 
        class="mx-auto ma-16 rounded-xl"
        flat
        >
        <v-card-title class="mx-10">
          Sign up!
        </v-card-title>
      </v-card>
      <v-card class="mx-auto my-4 px-7 pt-7 rounded-xl " width="400" height="325" color="rgba(255,255,255,.7)" flat >
          <v-text-field class="rounded-pill" v-model="registerUsername"
            label="Username"
            outlined
            color="black"
          ></v-text-field>
          <v-text-field class="rounded-pill" v-model="registerPassword"
            label="Password"
            color = "black"
            outlined
          ></v-text-field>
          <v-text-field class="rounded-pill" v-model="registerEmail"
            label="Email"
            color="black"
            outlined
          ></v-text-field>
          <v-card-actions>
            <v-btn id="registration-button" class="ml-auto mr-10 mb-2 mt-n4" >
              Sign Up
            </v-btn>

            <v-btn id="login-button" class="mr-auto ml-10 mb-2 mt-n4" @click="goToLogin()">
              Login
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-main>
    </v-parallax>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
//import Calendar from "./components/Calendar.vue";

export default Vue.extend({
  name: "RegistrationComponent",

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
    goToLogin(){
      window.location.href = "/login";
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

