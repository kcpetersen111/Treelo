<template>
  <v-card>
    <div fab style=" float:right;"> 
      <v-btn @click="deleteContainer()" fab x-small><v-icon>mdi-axe</v-icon></v-btn>
    </div>
    <v-card-title class="text-h4 purple--text font-weight-bold">
      {{ containerData.name }}
    </v-card-title>
    <!--
    <v-card-text>
      {{ containerData.description }}
    </v-card-text>
    -->

    <v-list>
      <CardComponent
        v-for="card in fetchedCards"
        :key="card._id"
        :cardData="card"
      />
      <div class="text-right">
        <v-btn
          class="ml-15 white"
          elevation="0"
          x-small
          @click="newCard = !newCard"
          ><v-icon>mdi-leaf</v-icon></v-btn
        ><!--note-plus-outline-->
      </div>
      <v-card v-if="newCard">
        <v-text-field
          placeholder="add leaf info"
          v-model="cardInfo"
        ></v-text-field>
        <v-btn @click="postCards()">Submit</v-btn>
      </v-card>
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
  },
  components: {
    CardComponent,
  },
  data: () => ({
    cards: [],
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
        console.log("delete success");
      }else{
        console.log("ERROR", response.status);
      }
    },
    fetchAllCards: async function () {
      this.fetchedCards = [];

      for (let i = 0; i < this.cards.length; i++) {
        let id = this.cards[i];
        let fetchedCard = await this.fetchCard(id);
        this.fetchedCards.push(fetchedCard);
      }
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
  },
};
</script>
