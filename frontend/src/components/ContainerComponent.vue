<template>
  <!-- V-Card for entire container -->
  <v-card style="background-color: rgb(215, 225, 225)">
    <div fab style="float: right">
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="tree-buttons ma-2"
            v-on="on"
            v-bind="attrs"
            fab
            x-small
            @click="deleteContainer()"
            ><v-icon>mdi-axe</v-icon></v-btn
          >
        </template>
        <span>Delete Branch</span>
      </v-tooltip>
    </div>

    <v-card-title
      class="text-h4 blue--text font-weight-bold text-wrap container-hover"
      @click="
        newContainer = true;
        containerInfo = containerData.name;
      "
      v-if="!newContainer"
    >
      {{ containerData.name }}
    </v-card-title>

    <div v-if="newContainer">
      <v-text-field
        v-model="containerInfo"
        autofocus
        class="font-weight-bold px-6"
      ></v-text-field>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="tree-buttons"
            v-on="on"
            v-bind="attrs"
            @click="newContainer = false"
            ><v-icon>mdi-undo</v-icon></v-btn
          >
        </template>
        <span>Undo Changes</span>
      </v-tooltip>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="tree-buttons"
            v-on="on"
            v-bind="attrs"
            @click="updateContainer()"
            ><v-icon>mdi-sprout</v-icon></v-btn
          >
        </template>
        <span>Save Changes</span>
      </v-tooltip>
    </div>

    <v-list style="background-color: rgb(215, 225, 225)">
      <CardComponent
        v-for="(card, index) in fetchedCards"
        :key="card._id"
        :cardData="card"
        :fetchCards="fetchAllCards"
        :containerID="containerData._id"
        :cardIndex="index"
        :cardDone="cardDone"
        :updateCard="updateCard"
      />

      <v-card
        v-if="newCard == false"
        class="mx-4 pa-2"
        style="background-color: rgb(225, 235, 235)"
      >
        <v-btn class="tree-buttons justify-center" @click="newCard = !newCard"
          >Add a leaf&nbsp;<v-icon>mdi-leaf</v-icon></v-btn
        >
      </v-card>

      <v-card
        v-else
        class="mx-4 pa-2"
        style="
          background-color: white;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        "
      >
        <v-text-field
          class="mx-4"
          v-if="newCard"
          placeholder="add leaf info"
          v-model="cardInfo"
          autofocus
        ></v-text-field>
        <v-btn v-if="newCard" @click="newCard = !newCard">Cancel</v-btn>
        <v-btn v-if="newCard" @click="postCards()">Submit</v-btn>
      </v-card>
    </v-list>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
// let URL = "http://localhost:8081";
import { URL } from "../config";
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
    deleteContainer: async function () {
      let response = await fetch(
        `${URL}/board/${this.boardID}/container/${this.containerData._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status == 201) {
        this.fetchContainers();
        console.log("delete success");
      } else {
        console.log("ERROR", response.status);
      }
    },
    cardDone: async function (index: number) {
      let tempCard = this.fetchedCards[index];
      tempCard.done = !tempCard.done;

      let response = await fetch(`${URL}/card/${tempCard._id}`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(tempCard),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        this.fetchedCards[index] = await response.json();
        // this.fetchCard(this.fetchedCards[index]._id);
        this.fetchAllCards();
      } else {
        console.log("ERROR", response.status, response);
      }
      // console.log(this.fetchedCards[index]);
    },
    fetchAllCards: async function () {
      let response = await fetch(
        `${URL}/container/${this.containerData._id}/card`,
        {
          credentials: "include",
        }
      );

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
      if (this.cardInfo == "") {
        this.newCard = false;
        return;
      }

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
    updateContainer: async function () {
      let info = {
        name: this.containerInfo,
      };
      let response = await fetch(`${URL}/container/${this.containerData._id}`, {
        method: "PATCH",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 201) {
        this.fetchContainers();
        this.newContainer = false;
      } else {
        console.log("ERROR: ", response.status);
      }
    },
    // FETCH - Patch new card (callback for card component)
    updateCard: async function (index, newCard) {
      let response = await fetch(`${URL}/card/${newCard._id}`, {
        method: "PATCH",
        body: JSON.stringify(newCard),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 200) {
        this.fetchAllCards();
      }
    },
  },
};
</script>
<style>
.done div div:not(button) {
  /* text-decoration: line-through !important;*/
}
.container-hover:hover {
  background-color: rgb(215, 225, 225);
  opacity: 0.8;
  cursor: pointer;
}
</style>