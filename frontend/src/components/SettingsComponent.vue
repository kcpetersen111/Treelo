<template>
  <v-app>
    <video
      src="https://vimeo.com/733378185"
      autoplay
      loop
      playsinline
      muted
    ></video>
    <v-card class="mx-auto mt-10" width="50%" height="50%">
      <v-card width="90%" class="mx-auto mt-3" height="90%">
        <v-btn @click="logOut()">Sign Out</v-btn>
      </v-card>
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
  methods: {
    getImage() {},
    logOut: async function () {
      let response = await fetch(URL + "/session", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status == 204) {
        window.location.href = "/login";
        return;
      }
    },
  },
};
</script>