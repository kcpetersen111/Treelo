<template>
  <v-card class="justify-center ma-2" style="display: flex">
    <v-card-title class="justify-center green--text text--darken-2 font-weight-bold pr-1">
      {{ cardData.name }} 
      <v-btn @click="deleteCard()">-<v-icon>mdi-axe</v-icon></v-btn>
      <!-- {{ card.description }} -->
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
let URL = "http://localhost:8081";
export default {
  name: "CardComponent",
  props: {
    cardData: {
      _id: String,
      name: String,
      // description: String,
    },
    fetchCards:{},
    containerID:{},
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

    }
  },
};
</script>
