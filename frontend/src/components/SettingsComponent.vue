<template>
  <v-app>
    <v-card class="mx-auto my-2" width="300px">
      <v-icon size="300">
        mdi-account-badge-outline
      </v-icon>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick a picture to make it yours!"
        prepend-icon="mdi-camera"
      ></v-file-input>
      
    </v-card>
  </v-app>
</template>

<script>
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

    }
  }
};
</script>