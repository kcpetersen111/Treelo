<template>
  <v-app
    style="
      background-image: url('https://t3.ftcdn.net/jpg/02/65/41/32/360_F_265413209_odsMQCc5XqnZPtm8mseWbomCEQSN945n.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
    "
  >
    <v-container
      class="mx-auto mt-8 rounded-lg font-weight-bold"
      color="black"
      style="width: 50%"
    >
      <v-card
        class="pa-8"
        style="
          background-image: url('https://static.vecteezy.com/ti/vecteur-libre/p2/2422203-resume-nature-montagne-vue-bleu-et-vert-fond-degrade-gratuit-vectoriel.jpg');
          background-size: cover;
        "
      >
        <v-card-title class="flex justify-center mt-2 font-weight-bold">
          Update User Profile
        </v-card-title>

        <v-text-field
          v-model="updatedUsername"
          label="Username"
          hint="Username"
          color="black"
          dense
          v-ripple
        ></v-text-field>
        <v-text-field
          label="Password"
          hint="Password"
          type="password"
          color="black"
          dense
          v-ripple
          v-model="updatedPassword"
        ></v-text-field>
        <v-text-field
          label="Email"
          hint="Email"
          color="black"
          dense
          v-ripple
          v-model="updatedEmail"
        ></v-text-field>

        <v-btn class="ma-4" large @click="updateSettings()">
          Update settings
        </v-btn>
        <v-btn large @click="logOut()"> Sign Out </v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// let URL = "http://localhost:8081";
import { URL } from "../config";
export default {
  name: "SettingsComponent",
  props: {
    //
  },
  data: () => ({
    //
    updatedUsername: "",
    updatedPassword: "",
    updatedEmail: "",
  }),
  methods: {
    updateSettings: async function () {
      let newSettings = {
        username: this.updatedEmail,
        name: this.updatedUsername,
        password: this.updatedPassword,
      };
      // console.log(newSettings);
      let response = await fetch(URL + "/users", {
        method: "PATCH",
        body: JSON.stringify(newSettings),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status == 200) {
        console.log("updating was a success!");
        this.updatedEmail = "";
        this.updatedUsername = "";
        this.updatedPassword = "";
      } else {
        console.log("Error", response.status, response);
      }
      console.log(await response.json());
    },
    logOut: async function () {
      let response = await fetch(URL + "/session", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.status == 204) {
        this.username = "";
        this.$router.replace({ path: "/login" });
      }
    },
  },
};
</script>
