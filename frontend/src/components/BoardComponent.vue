<template>
  <v-container v-if="board.id != null">
    <h1 class="text-h2 blue--text font-weight-bold">{{ board.name }}</h1>
    <v-row>
      <v-col v-for="container in board.containers" :key="container.id">
        <ContainerComponent :containerData="container" />
      </v-col>
    </v-row>
  </v-container>

  <!--
    Show a loading screen if we haven't received a response with the board id yet
  -->
  <v-container v-else>
    <h1 class="text-h2 blue--text font-weight-bold">Loading ...</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ContainerComponent from "@/components/ContainerComponent.vue";

export default Vue.extend({
  name: "BoardComponent",
  components: {
    ContainerComponent,
  },
  data: () => ({
    board: {
      creatorID: null,
      id: null,
      name: null,
      containers: [
        {
          id: 0,
          name: "My Container default",
          description: "default container",
          cards: [],
        },
      ],
    },
  }),
  created() {
    this.fetchBoard();
  },
  methods: {
    fetchBoard() {
      // to be replaced with a fetch request later.
      let fetchedContainers = [
        // list of containers
        {
          // container 1
          id: 0,
          name: "My Container 1",
          description: "This container is also definitely for something",
          cards: [
            // list of cards
            {
              // card 1
              id: 0,
              name: "My card 1",
              description: "Card description",
              time: "01/01/2022",
            },
            {
              // card 2
              id: 1,
              name: "My card 2",
              description: "Card 2 description",
              time: "01/02/2022",
            },
            {
              // card 3
              id: 2,
              name: "My card 3",
              description: "Card 3 description",
              time: "01/05/2022",
            },
          ],
        },
        {
          // container 2
          id: 1,
          name: "My Container 2",
          cards: [
            // list of cards
            {
              // card 1
              id: 0,
              name: "My card 1 (container 2)",
              description: "Card (container 2) description",
              time: "01/03/2022",
            },
            {
              // card 2
              id: 1,
              name: "My card 2 (container 2)",
              description: "Card 2 (container 2) description",
              time: "01/04/2022",
            },
          ],
        },
      ];

      // Other data that will be fetched alongside the container
      let fetchedCreatorID = 0;
      let fetchedID = 0;
      let fetchedBoardName = "My Default Board";

      // Replace the board in
      this.board = {
        creatorID: fetchedCreatorID,
        id: fetchedID,
        name: fetchedBoardName,
        containers: fetchedContainers,
      };
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