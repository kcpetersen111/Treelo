<template>
  <v-app>
    <video src="https://static.videezy.com/system/resources/previews/000/012/663/original/Nature_54_-_30s_-_4k_res.mp4" autoplay loop playsinline muted></video>
    <v-main>
      <!-- <v-card style="width: 70%"> -->
        <!-- <v-card class="mx-auto mr-10 rounded-xl pa-8"> -->
        <!--   width="475" height="450" style="display:inline-block" -->
          <!-- <v-card-text> -->
            <!-- style="font-size: larger; display: flex; flex-direction: column;" -->
            <!-- <p>Here at Budget Trello!</p> -->
          <!-- </v-card-text> -->
        <!-- </v-card> -->

        <v-card elevation="24" class="mx-auto mr-2 rounded-xl white--text" img="https://media.istockphoto.com/vectors/abstract-geometric-background-mosaic-with-triangle-patterns-brown-vector-id1223873773?k=20&m=1223873773&s=612x612&w=0&h=JWs86Y6dHrbLQGhl1Grp9j18bWiCPHclWEZDOKR4EW4=" style="display:inline-block; width: 40%;">
          <!-- width="475" height="450" -->
          <v-card-title class="flex justify-center text-h4">Contact Us</v-card-title>
          <v-card-subtitle class="white--text subtitle-1">Here at budget trello!</v-card-subtitle>
          <v-text-field id="first-name" class="px-7 my-5 mx-auto rounded-pill"
          style="width:50%; display: inline-block; color:black;" 
          outlined
          dense
          prefix="First Name"
          color="black"
          ></v-text-field>
          <v-text-field id="last-name" class="px-7 mx-auto rounded-pill " 
          style="width:200px; display: inline-block;"
          label="Last Name"
          dense
          outlined
          ></v-text-field>
          <v-text-field id="email-text" class="px-7 rounded-pill"
          dense
          outlined
          prefix="Email"
          ></v-text-field>
          <v-textarea id="text-area" class="px-7"
          dense
          clearable
          label="What can we help you with?"></v-textarea>
          <v-card-actions style="display:inline-block" class="mb-4">
            <v-btn id="contact-button">Contact Us!</v-btn>
          </v-card-actions>
        </v-card>
      <!-- </v-card> -->
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
  background-image: url(https://media.istockphoto.com/vectors/abstract-geometric-background-mosaic-with-triangle-patterns-brown-vector-id1223873773?k=20&m=1223873773&s=612x612&w=0&h=JWs86Y6dHrbLQGhl1Grp9j18bWiCPHclWEZDOKR4EW4=);
  opacity: 0.5;
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
#contact-div-left{
  width: 100px;
  height: 450px;
  background-color: black;
  display: flex;
  
}
.field-type:active {
  border-color: green;
}
</style>