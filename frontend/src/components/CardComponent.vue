<template>
  <v-card class="justify-center align-center mb-6 mx-4" style="display: flex">
    <!-- IF not editing card -->
    <v-card-title
      @click="editCard()"
      v-if="!editing"
      class="
        justify-center
        green--text
        text--darken-2
        font-weight-bold
        pr-1
        card-hovering
      "
      :class="{ done: cardData.done }"
    >
      {{ cardData.name }}
      <!-- {{ card.description }} -->
    </v-card-title>

    <!-- IF editing card -->
    <div v-else>
      <v-text-field
        @keydown.enter="updateCardLocal()"
        @keydown.esc="cancelUpdate()"
        class="green--text text--darken-2 font-weight-bold px-4"
        v-model="newCard.name"
        autofocus
      ></v-text-field>
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-1 mb-2 tree-buttons"
            v-on="on"
            v-bind="attrs"
            small
            @click="editCard()"
            ><v-icon>mdi-undo</v-icon></v-btn
          >
        </template>
        <span>Go Back</span>
      </v-tooltip>

      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-1 mb-2 tree-buttons"
            v-on="on"
            v-bind="attrs"
            small
            @click="updateCardLocal()"
            ><v-icon>mdi-sprout</v-icon></v-btn
          >
        </template>
        <span>Save Changes</span>
      </v-tooltip>

      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-1 mb-2 tree-buttons"
            v-on="on"
            v-bind="attrs"
            small
            @click="
              cardDone(cardIndex);
              editing = false;
            "
            ><v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>Check As Complete</span>
      </v-tooltip>
    </div>

    <div
      fab
      style="
        position: relative;
        float: right;
        margin-left: auto;
        padding: 0 0.5rem;
      "
    >
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="tree-buttons"
            v-on="on"
            v-bind="attrs"
            fab
            x-small
            @click="deleteCard()"
            ><v-icon>mdi-axe</v-icon></v-btn
          >
        </template>
        <span>Delete Leaf</span>
      </v-tooltip>
    </div>
  </v-card>
</template>

<script lang="ts">
let URL = "http://localhost:8081";
export default {
  name: "CardComponent",
  props: {
    fetchCards: Function,
    cardDone: Function,
    containerID: {},
    cardData: Object,
    cardIndex: Number,
    updateCard: Function,
  },
  data: function () {
    return {
      editing: false,
      newCard: {},
    };
  },
  created() {
    // console.log(this.$props.cardData);
  },
  methods: {
    //
    deleteCard: async function () {
      console.log(this.containerID);
      let response = await fetch(
        `${URL}/container/${this.containerID}/card/${this.cardData._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status == 200) {
        console.log("delete card successful");
        this.fetchCards();
      } else {
        console.log("Error while deleting", response.status);
      }
    },

    editCard: function () {
      if (!this.editing) {
        this.newCard = { ...this.cardData };
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
    },
  },
};
</script>
<style>
.done {
  text-decoration: line-through !important;
}
.card-hovering:hover {
  background-color: rgba(#fff, 0.8);
  opacity: 0.5;
  cursor: pointer;
}
</style>