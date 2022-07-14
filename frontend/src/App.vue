<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.link">
                {{ item.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Budget Trello</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer>
      <!--  -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Calendar from "./components/Calendar.vue";

export default Vue.extend({
  name: "App",

  components: {
    Calendar,
  },

  data: () => ({
    drawer: true,
    items: [
      {
        title: "About us",
        link: "/about",
        icon: "mdi-account-circle",
      },
      {
        title: "Login",
        link: "/login",
        icon: "mdi-account-circle",
      },
      {
        title: "Registration",
        link: "/registration",
        icon: "mdi-bookshelf",
      },
      {
        title: "Budget Trello Board",
        link: "/board",
        icon: "mdi-hammer",
      },
      {
        title: "Contact us",
        link: "/contact",
        icon: "mdi-card-account-mail",
      },
    ],
  }),
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>