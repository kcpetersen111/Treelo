<template>
  <v-app>
    <video src="https://vimeo.com/733378185" autoplay loop playsinline muted></video>
    <v-card class="mx-auto my-2" width="300px">
      <v-icon size="300">
        mdi-account-badge-outline
      </v-icon>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick a picture to make it yours!"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-btn @click="logOut()">Sign Out</v-btn>
    </v-card>
  </v-app>
</template>

<script>
let URL = "http://localhost:8081";
export default {

  name: "SettingsComponent",
  props: {
    //
  },
  data: () => ({
    //
  }),
  methods:{
    getImage(){

    },
    logOut: async function(){
      let response = await fetch(URL + "/session",{
        method: "DELETE",
        credentials: "include"
      });
      if(response.status == 204){
        window.location.href = "/login";
        return;
      }

    }
  }
};
</script>