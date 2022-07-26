<template>
  <div id="wrapper">
    <v-row>
      <v-col v-for="(container, index) in fetchedContainers" :key="index">
        <ContainerComponent :containerData="container" />
      </v-col>
    </v-row>
    <div style="position: fixed; right: 1%; bottom: 10%">
      <v-btn @click="showContainer = true"
        ><v-icon>mdi-source-branch</v-icon></v-btn
      ><!--package-variant-plus-->
    </div>
    <div justify="center">
      <v-overlay :z-index="0" :value="showContainer">
        <v-card class="blue">
          <v-card-title>Create a Branch</v-card-title>
          <v-text-field
            placeholder="Container Name"
            v-model="containerInfo"
          ></v-text-field>
          <v-btn @click="showContainer = false">Cancel</v-btn>
          <v-btn @click="postContainer()">Submit</v-btn>
        </v-card>
      </v-overlay>
    </div>
  </div>
</template>

<script lang="ts">
let URL = "http://localhost:8081";
import Vue from "vue";
import ContainerComponent from "@/components/ContainerComponent.vue";

export default Vue.extend({
  name: "BoardComponent",
  props: {
    boardData: {
      _id: String,
      creatorID: String,
      name: String,
      description: String,
      container: Array,
    },
  },
  components: {
    ContainerComponent,
  },
  data: () => ({
    fetchedContainers: [],
    showContainer: false,
    containerInfo: "",
  }),
  created() {
    this.fetchContainers();
  },
  methods: {
    fetchContainers: async function () {
      for (let i = 0; i < this.boardData.container.length; i++) {
        let id = this.boardData.container[i];

        let response = await fetch(`${URL}/container/${id}`, {
          credentials: "include",
        });

        if (response.status == 200) {
          let body = await response.json();
          // console.log("container: ", body);
          this.fetchedContainers.push(body);
        } else {
          console.log("ERROR", response.status, response);
        }
      }
    },
    postContainer: async function () {
      let id = this.boardData._id;
      let info = {
        name: this.containerInfo,
      };
      let response = await fetch(`${URL}/board/${id}/container`, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response.json);
      if (response.status == 201) {
        console.log("post success");
        this.showContainer = false;
        this.containerInfo = "";
      } else {
        console.log("ERROR", response.status);
        this.containerInfo = "";
      }
    },
  },
});
</script>

<!-- // {
//   // container 3
//   id: 0,
//   name: "My Container 3",
//   containerDescription:
//     "This container is also definitely for something",
//   cards: [
//     // list of cards
//     {
//       // card 1
//       id: 0,
//       name: "My card 1 (container 3)",
//       description: "Card description",
//       time: "01/01/2022",
//     },
//     {
//       // card 2
//       id: 1,
//       name: "My card 2 (container 3)",
//       description: "Card 2 description",
//       time: "01/02/2022",
//     },
//   ],
// }, -->
