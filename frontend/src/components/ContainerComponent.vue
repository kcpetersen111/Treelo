<template>
  <!-- V-Card for entire container -->
  <v-card>
    <div fab style=" float:right;"> 
      <v-btn @click="deleteContainer()" fab x-small><v-icon>mdi-axe</v-icon></v-btn>
    </div>
    <v-card-title class="text-h4 blue--text font-weight-bold text-wrap" 
      style="word-break:break-word; -webkit-hyphens: manual; -moz-hyphens: manual; -ms-hyphens: manual; hyphens: manual;"
     @click="newContainer = true; containerInfo = containerData.name" v-if="!newContainer">
      {{ containerData.name }}
    </v-card-title>
    <div v-if="newContainer">
      <v-text-field  v-model="containerInfo" autofocus></v-text-field>
      <v-btn @click="newContainer = false"><v-icon>mdi-undo</v-icon></v-btn>
      <v-btn @click="updateContainer()"><v-icon>mdi-sprout</v-icon></v-btn>
    </div>
    <!--
    <v-card-text>
      {{ containerData.description }}
    </v-card-text>
    -->

    <v-list>
      <CardComponent
        v-for="(card,index) in fetchedCards"
        :key="card._id"
        :cardData="card"
        :fetchCards="fetchAllCards"
        :containerID="containerData._id"
        :cardIndex="index"
        :cardDone="cardDone"
        :updateCard="updateCard"
        
      />
      <div class="text-right mr-2" style="overflow-wrap: break-word; word-wrap: break-word; hyphens: auto;">
        <v-btn
          class="pa-0 white"
          elevation="0"
          x-small
          v-if="!newCard"
          @click="newCard = !newCard"
          ><v-icon>mdi-leaf</v-icon></v-btn
        ><!--note-plus-outline-->
      </div>
      <v-text-field
        class="mx-4"
        v-if="newCard"
        placeholder="add leaf info"
        v-model="cardInfo"
      ></v-text-field>
      <v-btn 
        v-if="newCard"
        @click="postCards()">Submit</v-btn>
      <v-btn 
        v-if="newCard"
        @click="newCard = !newCard">Cancel</v-btn>
    </v-list>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
let URL = "http://localhost:8081";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "ContainerComponent",
  props: {
    containerData: {
      _id: String,
      creatorID: String,
      name: String,
      description: String,
      cards: Array,
    },
    boardID: {},
    fetchContainers: Function,
  },
  components: {
    CardComponent,
  },
  data: () => ({
    cards: [],
    newContainer: false,
    containerInfo: "",
    fetchedCards: [],
    newCard: false,
    cardInfo: "",
  }),
  created() {
    this.cards = this.containerData.cards;
    this.fetchAllCards();
  },
  methods: {
    deleteContainer: async function(){
      let response = await fetch(`${URL}/board/${this.boardID}/container/${this.containerData._id}`,{
        method: "DELETE",
        credentials: "include",
      });
      if (response.status == 201){
        this.fetchContainers();
        console.log("delete success");
      }else{
        console.log("ERROR", response.status);
      }
    },
    cardDone: async function(index:number) {
      let tempCard = this.fetchedCards[index];
      tempCard.done = !tempCard.done;

      let response = await fetch(`${URL}/card/${tempCard._id}`,{
        method: "PATCH",
        credentials: "include",
        body:JSON.stringify(tempCard),
        headers:{
          "Content-Type": "application/json",
        },
      }); 

      if(response.status == 200){
        this.fetchedCards[index] = await response.json();
        // this.fetchCard(this.fetchedCards[index]._id);
        this.fetchAllCards();
      } else{
        console.log("ERROR", response.status, response);

      }
      // console.log(this.fetchedCards[index]);
    },
    fetchAllCards: async function () {
      let response = await fetch(`${URL}/container/${this.containerData._id}/card`,{
        credentials: "include",
      });
      
      if (response.status == 200) {
        this.fetchedCards = await response.json();
        
      } else {
        console.log("ERROR", response.status, response);
      }

      // for (let i = 0; i < this.cards.length; i++) {
      //   let id = this.cards[i];
      //   let fetchedCard = await this.fetchCard(id);
      //   this.fetchedCards.push(fetchedCard);
      // }
    },
    fetchCard: async function (id: Number) {
      let response = await fetch(`${URL}/card/${id}`, {
        credentials: "include",
      });
      let card;

      if (response.status == 200) {
        card = await response.json();
        console.log("card: ", card);
      } else {
        console.log("ERROR", response.status, response);
      }

      return card;
    },
    postCards: async function () {
      let containerID = this.containerData._id;
      let info = {
        name: this.cardInfo,
      };
      let response = await fetch(`${URL}/container/${containerID}/card`, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      this.cardInfo = "";

      if (response.status == 201) {
        console.log("post card success");
        this.newCard = false;
        let justCreatedCard = await response.json();
        this.fetchedCards.push(justCreatedCard);
      } else {
        console.log("ERROR", response.status);
      }
    },
    refreshSelf: async function () {
      let id = this.containerData._id;

      let response = await fetch(`${URL}/container/${id}`, {
        credentials: "include",
      });

      if (response.status == 200) {
        let body = await response.json();
        // console.log("container: ", body);
        this.cards = body.cards;
        this.fetchAllCards();
      } else {
        console.log("ERROR", response.status, response);
      }
    },
    updateContainer: async function(){
      let info = {
        name: this.containerInfo,
      };
      let response = await fetch(`${URL}/container/${this.containerData._id}`,{
        method: "PATCH",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 201){
        this.fetchContainers();
        this.newContainer = false;
      }else{
        console.log("ERROR: ", response.status);
      }
    },
    // FETCH - Patch new card (callback for card component)
    updateCard: async function (index, newCard) {
      let response = await fetch(`${URL}/card/${newCard._id}`, {
        method: "PATCH",
        body: JSON.stringify(newCard),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (response.status == 200) {
        this.fetchAllCards();
      }
    }
  },
};
</script>
<style>
  .done div div:not(button){
    /* text-decoration: line-through !important;*/
  }
</style>