<template>
  <v-card>
    <v-card-title class="text-h4 purple--text font-weight-bold">
      {{ containerData.name }}
    </v-card-title>
    <!--
    <v-card-text>
      {{ containerData.description }}
    </v-card-text>
    -->

    <v-list >
      <CardComponent
        v-for="card in fetchedCards"
        :key="card._id"
        :cardData="card"
      />
        <div class="text-right" >
            <v-btn class="ml-15 white" elevation="0" x-small @click="newCard = !newCard"   ><v-icon>mdi-leaf</v-icon></v-btn><!--note-plus-outline-->
        </div>
        <v-card v-if="newCard">
            <v-text-field placeholder="add leaf info" v-model="cardInfo"></v-text-field>
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
  },
  components: {
    CardComponent,
  },
  data: () => ({
    fetchedCards: [],
    newCard: false,
    cardInfo: "",
  }),
  created() {
    this.fetchCards();
  },
  methods: {
    fetchCards: async function () {
      this.fetchedCards = [];

      for (let i = 0; i < this.containerData.cards.length; i++) {
        let id = this.containerData.cards[i];

        let response = await fetch(`${URL}/card/${id}`, {
          credentials: "include",
        });

        if (response.status == 200) {
          let body = await response.json();
          console.log("card: ", body);
          this.fetchedCards.push(body);
        } else {
          console.log("ERROR", response.status, response);
        }

      }
    },
    postCards: async function (){
        let containerID= this.containerData._id;
        let info = {
            name: this.cardInfo,
        };
        let response = await fetch(`${URL}/container/${containerID}/card`,{
            method: "POST",
            body: JSON.stringify(info),
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
        });
        console.log(response.json);
        if (response.status == 201){
            console.log("post success");
            this.newCard = false;
            this.fetchCards();
        }else{
            console.log("ERROR", response.status);
        }
        this.cardInfo = "";
    },
  },
};
</script>
