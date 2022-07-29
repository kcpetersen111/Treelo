<template>
  <div class="board">
    <v-container v-if="loggedIn" class="flex justify-center align-center">
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
        "
      >
        <v-btn
          class="tree-buttons"
          color="blue-grey lighten-3"
          v-if="boards.length > 1 && currentBoardIndex > 0"
          @click="moveBoardIndex(-1)"
          ><v-icon style="transform: rotate(270deg)">mdi-pine-tree</v-icon>
        </v-btn>
        <div
          v-if="currentBoard.name.length > 0"
          class="text-h2 font-weight-bold"
        >
          {{ currentBoard.name }}
        </div>
        <div v-else class="text-h2 font-weight-bold">
          Create A New Tree to get started!
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
          color="blue-grey lighten-3"
        >
          +<v-icon>mdi-forest</v-icon>
        </v-btn>

        <v-btn
          v-if="currentBoard.name.length > 0"
          @click="deleteBoardOverlay = !deleteBoardOverlay"
          class="tree-buttons"
          color="blue-grey lighten-3"
        >
          -<v-icon>mdi-axe</v-icon></v-btn
        >
      </div>

      <BoardComponent
        v-if="currentBoard.name.length > 0"
        :boardData="currentBoard"
        :fetchBoards="fetchBoards"
        :key="currentBoard._id"
      />
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
          maxlength="25"
          placeholder="Tree Name"
          v-model="boardInfo"
          autofocus
        ></v-text-field>
        <div style="display: flex; justify-content: space-between">
          <v-btn
            class="tree-buttons"
            @click="
              newBoard = false;
              boardInfo = '';
            "
            small
          >
            Cancel
          </v-btn>
          <v-btn @click="postBoard()" small class="tree-buttons">
            Create
          </v-btn>
        </div>
      </v-card>
    </v-overlay>

    <v-overlay :value="deleteBoardOverlay" v-if="deleteBoardOverlay">
      <v-card
        class="pa-16 ma-auto white--text"
        style="
          background-image: url('https://images.unsplash.com/photo-1613858636109-354616495373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
          background-size: cover;
        "
      >
        <v-card-title class="font-weight-bold text-h4"
          >Are You Sure You want to delete?</v-card-title
        >
        <v-card-actions>
          <v-btn x-large @click="deleteBoardOverlay = false">Cancel</v-btn>
          <v-btn x-large @click="deleteBoard()"
            ><v-icon>mdi-fire-alert</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>



<script lang="ts">
// @ is an alias to /src
// let URL = "http://localhost:8081";
import { URL } from "../config";
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
    deleteBoardOverlay: false,
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
        if (this.boards.length == 0) {
          this.currentBoard = {
            _id: "",
            name: "",
            description: "",
            cards: [],
          };

          return;
        }

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
      if (this.boardInfo == "") {
        this.newBoard = false;
        return;
      }

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
    deleteBoard: async function () {
      this.deleteBoardOverlay = false;
      // let userWantsToDeleteBoard = confirm(
      //   `Are you sure you want to delete the "${this.boardData.name}" tree?`
      // );
      // if (!userWantsToDeleteBoard) return;

      let boardID = this.currentBoard._id;
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
      } else {
        console.log("Error while deleting", response.status);
      }
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