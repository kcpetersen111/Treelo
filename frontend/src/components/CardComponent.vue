<template>
  <v-card class="justify-center ma-2" style="display: flex">
    
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
    <v-text-field
      v-else
      @keydown.enter="updateCardLocal()"
      class="green--text text--darken-2 font-weight-bold px-4"
      v-model="newCard.name"
    >
      
    </v-text-field>

  </v-card>
</template>

<script lang="ts">
export default {
  name: "CardComponent",
  props: {
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
    editCard: function () {
      if (!this.editing) {
        this.newCard = {...this.cardData};
        this.editing = true;
      }
    },
    updateCardLocal: async function () {
      await this.updateCard(this.cardIndex, this.newCard);
      this.editing = false;
    }
  },
};
</script>
