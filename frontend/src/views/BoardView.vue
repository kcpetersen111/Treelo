<template>
  <div class="board">
    <BoardComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import BoardComponent from "@/components/BoardComponent.vue";

export default {
  name: "BoardView",
  components: {
    BoardComponent,
  },
};
</script>
