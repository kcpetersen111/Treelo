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

      <v-col md="4">
        <v-card
          v-if="newContainer == false"
          class="mx-4 pa-2"
          style="background-color: rgb(225, 235, 235)"
        >
          <v-btn
            @click="newContainer = !newContainer"
            class="tree-buttons justify-center"
            color="blue-grey lighten-3"
            >Add A Branch&nbsp;<v-icon>mdi-leaf</v-icon></v-btn
          >
        </v-card>

        <v-card
          v-else
          class="mx-4 pa-2"
          style="
            background-color: white;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
          "
        >
          <v-text-field
            v-if="newContainer"
            class="mx-4"
            placeholder="Add branch info"
            v-model="containerInfo"
            autofocus
          ></v-text-field>
          <v-btn v-if="newContainer" @click="newContainer = !newContainer"
            >Cancel</v-btn
          >
          <v-btn v-if="newContainer" @click="postContainer()">Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// let URL = "http://localhost:8081";
import { URL } from "../config";
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
    newContainer: false,
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
    postContainer: async function () {
      if (this.containerInfo == "") {
        this.newContainer = false;
        return;
      }

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
        this.newContainer = false;
        this.fetchContainers();
      } else {
        console.log("ERROR", response.status);
      }
      this.containerInfo = "";
    },
  },
});
</script>