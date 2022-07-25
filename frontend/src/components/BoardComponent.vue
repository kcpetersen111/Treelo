<template>
  <div id="wrapper">
    <v-row>
      <v-col v-for="(container, index) in fetchedContainers" :key="index">
        <ContainerComponent :containerData="container" />
      </v-col>
    </v-row>
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
