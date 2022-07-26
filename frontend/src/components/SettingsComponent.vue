<template>
  <v-app style="background-image: url('https://t3.ftcdn.net/jpg/02/65/41/32/360_F_265413209_odsMQCc5XqnZPtm8mseWbomCEQSN945n.jpg'); background-repeat:no-repeat; background-size: cover; background-attachment: fixed;">
    <v-card class="mx-auto mt-10 rounded-lg" width="60vw" height="60vh" color="black" style="opacity:0.8">
      <v-card width="90%" class="mx-auto mt-3" height="90%" style="background-image:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDp5O3D0lIron9kM_n2n4ttsyJ3eVAEbmfEg&usqp=CAU'); background-size: cover;">
        <div class="pt-4">
          <v-card-title style="font-size: medium;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;" class="flex justify-center mt-2">Here you can update your personal info, or Logout</v-card-title>
          <v-btn @click="logOut()" style="float:right" class="mr-9">Sign Out</v-btn>
          <v-text-field
            class="pl-8 mb-4"
            dense
            label="Username"
            hint="Username"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
          <v-text-field
            class="pl-8 mb-4"
            dense
            label="Password"
            hint="Password"
            type="password"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
          <v-btn style="float:right" class="mr-9" large>Update your settings!</v-btn>
          <v-text-field
            class="pl-8 mb-4"
            dense
            label="Email"
            hint="Email"
            color="black"
            full-width
            v-ripple
            style="width:40%"
          ></v-text-field>
        
        </div>
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
    updatedUsername: "",
    updatedPassword: "",
    updatedEmail: ""
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