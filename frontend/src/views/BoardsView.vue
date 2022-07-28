<template>
  <div class="board">
    <v-container v-if="loggedIn">
      <span style="display: flex; justify-content: center">
        <v-btn
          class="tree-buttons"
          color="blue-grey lighten-3"
          v-if="boards.length > 1 && currentBoardIndex > 0"
          @click="moveBoardIndex(-1)"
        >
          <v-icon style="transform: rotate(270deg)"> mdi-pine-tree</v-icon>
        </v-btn>

        <div
          class="boardName"
          style="background-color: rgba(155, 155, 155, 0.7)"
        >
          <h1
            v-if="currentBoard.name.length > 0"
            class="text-h2 font-weight-bold"
          >
            {{ currentBoard.name }}
          </h1>
          <h1 v-else class="text-h2 font-weight-bold">
            Create A New Tree to get started!
          </h1>
        </div>

        <v-btn
          class="tree-buttons"
          color="blue-grey lighten-3"
          v-if="boards.length > 1 && currentBoardIndex < boards.length - 1"
          @click="moveBoardIndex(1)"
          ><v-icon style="transform: rotate(90deg)">mdi-pine-tree</v-icon>
        </v-btn>

        <v-btn
          v-if="!newBoard"
          @click="newBoard = true"
          class="tree-buttons"
          color="blue-grey ligthen-3"
        >
          +<v-icon>mdi-forest</v-icon>
        </v-btn>
      </span>

      <BoardComponent
        :boardData="currentBoard"
        :fetchBoards="fetchBoards"
        :key="currentBoardIndex"
      />
    </v-container>

    <v-container v-else-if="false">
      <div class="boardName" style="margin-left: 150px; margin-right: 150px">
        <h1 class="text-h2 black--text font-weight-bold"></h1>
        <div v-if="newBoard">
          <span style="display: flex; justify-content: center">
            <v-text-field
              maxlength="25"
              v-model="boardInfo"
              placeholder="Tree Name"
            ></v-text-field>
          </span>
          <v-btn
            class="tree-buttons mb-3"
            color="blue-grey lighten-3"
            @click="
              newBoard = false;
              boardInfo = '';
            "
            small
          >
            Cancel
          </v-btn>
          <v-btn
            @click="postBoard()"
            small
            class="ml-4 mb-3 tree-buttons"
            color="blue-grey lighten-3"
          >
            Create
          </v-btn>
        </div>
      </div>
    </v-container>

    <!--
      Show a loading screen if we haven't received a response yet
    -->
    <v-container v-else>
      <div class="boardName">
        <h1 class="white--text font-weight-bold">Loading ....</h1>
      </div>
    </v-container>

    <!--
    For creating a new tree
  -->
    <v-overlay
      v-if="newBoard"
      class="justify-center"
      :z-index="0"
      :value="newBoard"
    >
      <v-card class="blue pa-8">
        <v-card-title>Create A Tree</v-card-title>
        <v-text-field
          class="px-3"
          placeholder="Tree Name"
          v-model="boardInfo"
        ></v-text-field>
        <div style="display: flex; justify-content: space-between">
          <v-btn
            small
            @click="
              newBoard = false;
              boardInfo = '';
            "
          >
            Cancel
          </v-btn>
          <v-btn small @click="postBoard()">Submit</v-btn>
        </div>
      </v-card>
    </v-overlay>
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
    currentBoard: {
      _id: "",
      name: "",
      description: "",
      cards: [],
    },
    loggedIn: false,
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
    boardInfo: "",
    newBoard: false,
  }),
  created() {
    this.fetchBoards();
  },
  methods: {
    fetchBoards: async function (defaultIndex: number = 0) {
      let response = await fetch(`${URL}/board`, {
        credentials: "include",
      });

      if (response.status == 200) {
        this.boards = await response.json();
        this.loggedIn = true;
        // if we have no boards, return
        if (this.boards.length == 0) return;

        // is the index too big?
        if (this.boards.length <= this.currentBoardIndex)
          this.currentBoardIndex = this.boards.length - 1;

        // are we using a default index?
        if (defaultIndex > 0) {
          this.currentBoardIndex = defaultIndex;
        }

        this.currentBoard = this.boards[this.currentBoardIndex];
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
    postBoard: async function () {
      let info = {
        name: this.boardInfo,
      };
      let response = await fetch(`${URL}/board`, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status == 201) {
        console.log("post success");
        this.fetchBoards(this.boards.length);
        this.newBoard = false;
      } else {
        console.log("ERROR", response.status);
      }
      this.boardInfo = "";
    },
  },
});
</script>

<style>
.board {
  background: url("https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=841&q=80")
    no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}
.boardName {
  justify-content: center;
  border-radius: 100px 100px 100px 100px;
  padding: 0 20%;
}
.tree-buttons:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.tree-buttons:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>