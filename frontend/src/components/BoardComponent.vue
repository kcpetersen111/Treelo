<template>
  <v-container id="wrapper">
    <v-row>
      <v-col
        v-for="(container, index) in fetchedContainers"
        md="4"
        :key="index"
      >
        <ContainerComponent
          :containerData="container"
          :boardID="boardData._id"
          :fetchContainers="fetchContainers"
        />
      </v-col>
    </v-row>

    <v-overlay
      v-if="showContainer"
      class="justify-center"
      :z-index="0"
      :value="showContainer"
    >
      <v-card class="blue pa-8">
        <v-card-title>Create A Branch</v-card-title>
        <v-text-field class="px-3" placeholder="Branch Name">
          {{ containerInfo }}
        </v-text-field>
        <div style="display: flex; justify-content: space-between">
          <v-btn small @click="showContainer = false">Cancel</v-btn>
          <v-btn small @click="postContainer()">Submit</v-btn>
        </div>
      </v-card>
    </v-overlay>

    <div style="position: fixed; right: 1%; bottom: 10%">
      <v-btn
        @click="showContainer = true"
        class="tree-buttons"
        color="blue-grey lighten-3"
        >+<v-icon>mdi-source-branch</v-icon>
      </v-btn>
      <v-btn
        @click="overlay = !overlay"
        class="tree-buttons"
        color="blue-grey lighten-3"
      >
        -<v-icon>mdi-axe</v-icon></v-btn
      >
      <!-- delete board -->
    </div>

    <v-overlay :value="overlay">
      <v-card
        @focusout="overlay = false"
        width="400"
        height="400"
        class="mx-auto white--text"
        style="
          padding-top: 40%;
          background-image: url('https://images.unsplash.com/photo-1613858636109-354616495373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
          background-size: cover;
        "
      >
        <div>
          <h3>Are You Sure You want to delete?</h3>
          <v-btn @click="overlay = false">Cancel</v-btn>
          <v-btn @click="deleteBoard()"><v-icon>mdi-fire-alert</v-icon></v-btn>
        </div>
      </v-card>
    </v-overlay>
  </v-container>
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
    fetchBoards: Function,
  },
  components: {
    ContainerComponent,
  },
  data: () => ({
    fetchedContainers: [],
    showContainer: false,
    containerInfo: "",
    overlay: false,
    // currentBoardIndex:0,
  }),
  created() {
    this.fetchContainers();
  },
  methods: {
    fetchContainers: async function () {
      this.fetchedContainers = [];
      await this.fetchBoards();
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
    deleteBoard: async function () {
      // let userWantsToDeleteBoard = confirm(
      //   `Are you sure you want to delete the "${this.boardData.name}" tree?`
      // );
      // if (!userWantsToDeleteBoard) return;

      let boardID = this.boardData._id;
      let response = await fetch(`${URL}/board/${boardID}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.status == 200) {
        console.log("delete successful");
        // this.boardData = null;
        // this.boardData = await response.json();
        // this.$forceUpdate();
        // this.currentBoardIndex --;
        // this.boardData.fetchBoards();
        this.fetchBoards();
        console.log(this.boardData);
      } else {
        console.log("Error while deleting", response.status);
      }
    },
    postContainer: async function () {
      let id = this.boardData._id;
      let info = {
        containerName: this.containerInfo,
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
        this.fetchContainers();
      } else {
        console.log("ERROR", response.status);
      }
      this.containerInfo = "";
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
