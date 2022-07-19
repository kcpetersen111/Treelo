<template>
  <v-app>
    <video src="https://static.videezy.com/system/resources/previews/000/012/663/original/Nature_54_-_30s_-_4k_res.mp4" autoplay loop playsinline muted></video>
    <v-main>
      <div class="d-flex">
      <v-card class="mx-auto  mr-10 rounded-xl" width="475" height="450" style="display:inline-block">
        <v-card-text style="width:100px">
        test
        </v-card-text>
      </v-card>
      <v-card elevation="24" class="mx-auto mr-2 rounded-xl white--text" width="475" height="450" img="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style="display:inline-block;">
        <v-card-title class="flex justify-center ">Contact Us</v-card-title>
        <v-text-field id="first-name" class="px-7 my-5 mx-auto rounded-pill"
        style="width:200px; display: inline-block;" 
        outlined
        background-color="brown darken-2"
        dense
        solo-inverted
        label="First Name"
        ></v-text-field>
        <v-text-field id="last-name" class="px-7 mx-auto rounded-pill " 
        style="width:200px; display: inline-block;"
        background-color="brown darken-2"
        label="Last Name"
        solo-inverted
        dense
        outlined
        ></v-text-field>
        <v-text-field id="email-text" class="px-7 rounded-pill"
        solo-inverted
        background-color="brown darken-2"
        dense
        outlined
        prefix="Email"
        ></v-text-field>
        <v-textarea id="text-area" class="px-7 rounded-pill"
        background-color="brown darken-2"
        dense
        solo-inverted
        clearable
        label="What can we help you with?"></v-textarea>
        <v-card-actions>
          <v-btn id="contact-button" class=" mr-auto ml-10 mb-2 mt-n4">Contact Us!</v-btn>
        </v-card-actions>
      </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ContactComponent",
  props: {
    //
  },
  data: () => ({
    //
  }),
});
</script>
<style>
#first-name,#last-name,#email-text,#text-area{
  text-align: center;
  color: black;

}
video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
#contact-button {
  display: inline-block;
  position: relative;
}
#contact-button:after {
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
#contact-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>