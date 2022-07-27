<template>
  <div class="board" >
    <v-container v-if="boards.length !=0 && loggedIn" >
      <div v-if="!newBoard">
        <span style="display: flex; justify-content: center">
          <v-btn
            v-if="boards.length > 1 && currentBoardIndex > 0"
            @click="moveBoardIndex(-1)"
            ><v-icon style="transform: rotate(270deg);"> mdi-pine-tree</v-icon>
          </v-btn>

          <h1 class="text-h2 blue--text font-weight-bold">
            {{ currentBoard.name }}
          </h1>

          <v-btn
            v-if="boards.length > 1 && currentBoardIndex < boards.length - 1"
            @click="moveBoardIndex(1)"
            ><v-icon style="transform: rotate(90deg);">mdi-pine-tree</v-icon>
          </v-btn>
          <v-btn v-if=" currentBoardIndex == boards.length -1 || boards.length == 0" @click="newBoard = true;">
            +<v-icon>mdi-forest</v-icon>
          </v-btn>
        </span>
        <BoardComponent :boardData="currentBoard" :fetchBoards="fetchBoards" :key="currentBoardIndex" />
      </div>
      <div v-if="newBoard">
        <span style="display: flex; justify-content:center">
          <v-text-field v-model="boardInfo" placeholder="Tree Name"></v-text-field>
        </span>
        <v-btn @click="newBoard = false;">
          Cancel
        </v-btn>
        <v-btn @click="postBoard()">
          Submit
        </v-btn>
      </div>
    </v-container>

    <!--
    Show a loading screen if we haven't received a response yet
  -->
    <v-container v-else-if="loggedIn">
          <v-btn @click="newBoard = true;">
            +<v-icon>mdi-forest</v-icon>
          </v-btn>
      <h1 class="text-h2 blue--text font-weight-bold">Create A New Tree to get started!</h1>
      <div v-if="newBoard">
        <span style="display: flex; justify-content:center">
          <v-text-field v-model="boardInfo" placeholder="Tree Name"></v-text-field>
        </span>
        <v-btn @click="newBoard = false; boardInfo = '';">
          Cancel
        </v-btn>
        <v-btn @click="postBoard()">
          Submit
        </v-btn>
      </div>
    </v-container>

    <v-container v-else>
      <h1 class="red--text font-weight-bold">PLEASE LOG IN!</h1>
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
    currentBoard: {_id: "", name: "", description: "", cards: [] },
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
    fetchBoards: async function (defaultIndex:number=0) {
      let response = await fetch(`${URL}/board`, {
        credentials: "include",
      });

      if (response.status == 200) {
        this.boards = await response.json();
        this.loggedIn = true;
        // if we have no boards, return
        if (this.boards.length == 0)
          return;

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
    postBoard: async function(){
     let info = {
      name: this.boardInfo,
     };
     let response = await fetch(`${URL}/board`,{
          method: "POST",
          body: JSON.stringify(info),
          headers:{
            "Content-Type": "application/json"
          },
          credentials: "include",
     });
     if (response.status == 201){
      console.log("post success");
      this.fetchBoards(this.boards.length);
      this.newBoard = false;
     }else{
      console.log("ERROR", response.status);
     }
     this.boardInfo = "";

    },
  },
});
</script>

<style>
.board{
  background: url("https://i.pinimg.com/originals/fa/1d/48/fa1d48f051a9baf60958dbdbf4da68bb.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 100%;

}
</style>