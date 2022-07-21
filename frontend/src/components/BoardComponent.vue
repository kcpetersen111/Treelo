<template>
  <v-container>
    <v-title class="text-h2 blue--text font-weight-bold">
      {{ board.boardName }}
    </v-title>
    <v-row>
      <v-col v-for="container in board.containers" :key="container.containerID">
        <v-list>
          <v-card>
            <v-list-title class="text-h4">
              {{ container.containerName }}
            </v-list-title>
            <v-item v-for="card in container.cards" :key="card.id">
              <v-card>
                <v-item-title>
                  {{ card.name }}
                </v-item-title>
              </v-card>
            </v-item>
          </v-card>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BoardComponent",
  props: {
    //
  },
  data: () => ({
    board: {
      //
    },
  }),
  created() {
    this.setBoard(); // to be replaced with a fetch request later.
  },
  methods: {
    setBoard() {
      this.board = {
        creatorID: 0,
        boardID: 0,
        boardName: "My Board",
        containers: [
          // list of containers
          {
            // container 1
            containerID: 0,
            containerName: "My Container 1",
            containerDescription:
              "This container is also definitely for something",
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
            ],
          },
          {
            // container 2
            containerID: 1,
            containerName: "My Container 2",
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
          {
            // container 3
            containerID: 0,
            containerName: "My Container 3",
            containerDescription:
              "This container is also definitely for something",
            cards: [
              // list of cards
              {
                // card 1
                id: 0,
                name: "My card 1 (container 3)",
                description: "Card description",
                time: "01/01/2022",
              },
              {
                // card 2
                id: 1,
                name: "My card 2 (container 3)",
                description: "Card 2 description",
                time: "01/02/2022",
              },
            ],
          },
        ],
      };
    },
  },
});
</script>
