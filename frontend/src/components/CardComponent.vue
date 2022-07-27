<template>
    <v-card 
      class="justify-center mb-6 mx-4" 
      style="display: flex">

      <!-- IF not editing card -->
      <v-card-title
        @click="editCard()"
        v-if="!editing"
        class="justify-center green--text text--darken-2 font-weight-bold pr-1"
      >
        {{ cardData.name }}
        <!-- {{ card.description }} -->
      </v-card-title>

      <!-- IF not editing card -->
      <div v-else>
        <v-text-field
          @keydown.enter="updateCardLocal()"
          @keydown.esc="cancelUpdate()"
          class="green--text text--darken-2 font-weight-bold px-4"
          v-model="newCard.name"
          autofocus
        ></v-text-field>
        <v-btn class="mb-2" @click="deleteCard()">-<v-icon>mdi-axe</v-icon></v-btn>
        <v-btn class="ml-2 mb-2" @click="updateCardLocal()">+<v-icon>mdi-forest</v-icon></v-btn>
        <v-btn class="ml-2 mb-2" @click="editCard()"><v-icon>mdi-undo</v-icon></v-btn>
      </div>
    </v-card>
</template>

<script lang="ts">
let URL = "http://localhost:8081";
export default {
  name: "CardComponent",
  props: {
    fetchCards: Function,
    containerID:{},
    cardData: Object,
    cardIndex: Number,
    updateCard: Function,
  },
  data: function () {
    return {
      editing: false,
      newCard: {},
    }
  },
  created() {
    // console.log(this.$props.cardData);
  },
  methods: {
    //
    deleteCard:async function(){
      console.log(this.containerID);
      let response = await fetch(`${URL}/container/${this.containerID}/card/${this.cardData._id}`,{
        method:"DELETE",
        credentials: "include",
      });

      if(response.status == 200){
        console.log("delete card successful");
        this.fetchCards();
      } else{
        console.log("Error while deleting",response.status);
      }
    },

    editCard: function () {
      if (!this.editing) {
        this.newCard = {...this.cardData};
        this.editing = true;
      } else {
        this.editing = false;
      }
    },
    updateCardLocal: async function () {
      await this.updateCard(this.cardIndex, this.newCard);
      this.editing = false;
    },
    cancelUpdate: function () {
      this.editing = false;
    }
  },
};
</script>
