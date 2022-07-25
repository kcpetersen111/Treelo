<template>
<div id = "wrapper">
  <v-container v-if="boards[num]._id != -1">
    <v-btn @click="goLeft()">Left</v-btn><h1 class="text-h2 blue--text font-weight-bold" >{{ boards[num].name }}</h1><v-btn @click="goRight()">Right</v-btn>
    <v-row>
      <v-col v-for="(index,container) in containers" :key="index" >
        <ContainerComponent :containerData="container" />
        <!--<h1>{{ container.name }}</h1>
        <p>{{ container.description}}</p>-->
      </v-col>
    </v-row>
  </v-container>


  <!--
    Show a loading screen if we haven't received a response with the board id yet
  -->
  <v-container v-else>
    <h1 class="text-h2 blue--text font-weight-bold">Loading ...</h1>
  </v-container>
  </div>
</template>

<script lang="ts">
let URL = "http://localhost:8081"
import Vue from "vue";
import ContainerComponent from "@/components/ContainerComponent.vue";

export default Vue.extend({
  name: "BoardComponent",
  components: {
    ContainerComponent,
  },
  data: () => ({
    boards: {
      creatorID: -1,
      id: -1,
      name: "",
      containers: [
            {
          id: 0,
          name: "My Container default",
          description: "default container",
          cards: [],
        },
      ],
    },
    containers: [
       /* {_id: "id",
        creatorID: "creatorID",
        name: "name",
        description: "descrip",
        cards: [],},*/
        ],
        num:0,
  }),
  created() {
    this.fetchBoard();
  },
  methods: {
    fetchBoard: async function() {
        let response = await fetch(`${URL}/board`,{
            credentials: "include",
        });
        if(response.status == 200){
            let body = await response.json();
            this.boards = body;
            console.log(this.boards);
            for( let containerID in this.boards[this.num].container){
                this.getContainer(containerID);
            }
        }else{
            console.log("Error" , response.status,response);
        }
    },
    getContainer: async function(id) {
        let response = await fetch(`${URL}/container/${id}`,{
            credentials: "include",
        });
        if(response.status ==200){
            let body = await response.json();
            console.log("container",body);
            this.containers.push(body);
        }else{
            console.log("ERROR", response.status, response);
        }
    },
    goLeft: function(){
        this.containers = [];
        if (this.num == 0){
            this.num = this.boards.length;
        }else{
            this.num--;
        }
    },
    goRight: function(){
        this.containers = [];
        if (this.num == this.boards.length){
            this.num = 0;
        }else{
            this.num++;
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
