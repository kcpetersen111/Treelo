<template>
  <v-parallax
    src="https://cdn.shopify.com/s/files/1/0326/7189/articles/General_Sherman_tree_2000x.jpg?v=1627936731"
    height="100%"
  >
    <v-card
      class="mx-auto my-auto pb-4 px-7 rounded-xl"
      color="rgba(255,255,255,.7)"
      flat
      width="400"
    >
      <v-card-title style="display: block">
        <b>Sign in</b>
      </v-card-title>

      <v-text-field
        class="rounded-pill"
        label="Email"
        color="black"
        v-model="usernameInput"
        :rules="[rules.requiredEmail, rules.email]"
        outlined
        autofocus
      ></v-text-field>

      <v-text-field
        class="rounded-pill"
        label="Password"
        outlined
        color="black"
        type="password"
        v-model="passwordInput"
        :rules="[rules.requiredPassWord]"
      ></v-text-field>

      <v-card-actions>
        <v-btn
          id="registration-button"
          class="mr-8 ml-14 mb-2 mt-n4 rounded-sm"
          elevation="12"
          @click="gotoRegister()"
        >
          Register
        </v-btn>
        <v-btn
          id="login-button"
          class="mr-auto ml-10 mb-2 mt-n4 rounded-sm"
          elevation="12"
          @click="postSession()"
        >
          Login
        </v-btn>
      </v-card-actions>

      <v-alert
        v-show="show"
        type="error"
        dense
        transition="scale-transition"
        dismissible
        style="border-radius: 25px; border: 2px solid black"
        >Login Unsuccessful</v-alert
      >
    </v-card>
  </v-parallax>
</template>

<script lang="ts">
// let URL = "http://localhost:8081";
import { URL } from "../config";
export default {
  name: "LoginComponent",
  props: {
    //
  },
  data: () => ({
    usernameInput: "",
    passwordInput: "",
    show: false,

    rules: {
      requiredEmail: (value: any) => !!value || "Valid Email Required.",
      requiredPassWord: (value: any) => !!value || "Valid Password Required.",
      email: (value: any) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    gotoRegister() {
      // console.log("GO to Register page!");
      this.$router.replace({ path: "/registration" });
    },
    postSession: async function () {
      this.show = false;

      let loginCredentials = {
        username: this.usernameInput,
        password: this.passwordInput,
      };

      let response = await fetch(URL + "/session", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let body = await response.json();
      console.log(body);

      if (response.status == 201) {
        console.log("login was a success");
        this.$router.replace({ path: "/board" });
      } else if (response.status == 401) {
        console.log("Unsuccessful");
        this.passwordInput = "";
        this.usernameInput = "";
        this.show = true;
      } else {
        console.log("Error", response.status, response);
      }
    },
  },
};
</script>
