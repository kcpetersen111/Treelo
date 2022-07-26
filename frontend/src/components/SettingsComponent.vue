<template>
  <v-app style="background-image: url('https://t3.ftcdn.net/jpg/02/65/41/32/360_F_265413209_odsMQCc5XqnZPtm8mseWbomCEQSN945n.jpg'); background-repeat:no-repeat; background-size: cover; background-attachment: fixed;">
    <v-card class="mx-auto mt-10 rounded-lg" width="60%" height="60%" color="black">
      <v-card width="90%" class="mx-auto mt-3" height="90%">
        <div class="pt-4">
          <v-text-field
            class="mx-auto mt-5"
            dense
            label="Username"
            hint="Username"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
          <v-text-field
            class="mx-auto mt-4"
            dense
            label="Password"
            hint="Password"
            type="password"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
          <v-text-field
            class="mx-auto mt-5"
            dense
            label="Email"
            hint="Email"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
        </div>
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