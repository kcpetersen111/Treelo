<template>
  <div class="board">
    <v-container v-if="currentBoard._id != ''">
      <span style="display: flex; justify-content: center">
        <v-btn
          v-if="boards.length > 1 && currentBoardIndex > 0"
          @click="moveBoardIndex(-1)"
          >Left
        </v-btn>

        <h1 class="text-h2 blue--text font-weight-bold">
          {{ currentBoard.name }}
        </h1>

        <v-btn
          v-if="boards.length > 1 && currentBoardIndex < boards.length - 1"
          @click="moveBoardIndex(1)"
          >Right
        </v-btn>
      </span>

      <BoardComponent :boardData="currentBoard" :key="currentBoardIndex" />
    </v-container>

    <!--
    Show a loading screen if we haven't received a response yet
  -->
    <v-container v-else>
      <h1 class="text-h2 blue--text font-weight-bold">Loading ...</h1>
    </v-container>
  </div>
</template>



<script lang="ts">
// @ is an alias to /src
let URL = "http://localhost:8081";
import Vue from "vue";
import BoardComponent from "@/components/BoardComponent.vue";

export default Vue.extend({
  name: "BoardsView",
  components: {
    BoardComponent,
  },
  data: () => ({
    currentBoardIndex: 0,
    currentBoard: { _id: "", name: "", description: "", cards: [] },
    boards: [
      /*
      creatorID: -1,
      _id: -1,
      name: "",
      containers: [
        {
          id: 0,
          name: "My Container default",
          description: "default container",
          cards: [],
        },
      ],
      */
    ],
  }),
  created() {
    this.fetchBoards();
  },
  methods: {
    fetchBoards: async function () {
      let response = await fetch(`${URL}/board`, {
        credentials: "include",
      });

      if (response.status == 200) {
        this.boards = await response.json();
        console.log(this.boards);

        if (this.boards.length >= this.currentBoardIndex)
          this.currentBoardIndex = 0;

        this.currentBoard = this.boards[this.currentBoardIndex];
        console.log(this.currentBoard);
      } else {
        console.log("Error", response.status, response);
      }
    },
    moveBoardIndex: function (num: number) {
      if (this.boards.length <= 0) return;

      this.currentBoardIndex += num;

      if (this.currentBoardIndex < 0) {
        this.currentBoardIndex = 0;
      } else if (this.currentBoardIndex > this.boards.length - 1) {
        this.currentBoardIndex = this.boards.length - 1;
      }

      this.currentBoard = this.boards[this.currentBoardIndex];
      this.$forceUpdate();
    },
  },
});
</script>
