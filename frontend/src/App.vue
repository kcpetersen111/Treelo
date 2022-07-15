<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content style="flex-wrap: nowrap">
            <router-link :to="item.link" style="display: flex">
              <v-list-item-icon class="mr-6">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title class="text-left text-button">
                {{ item.title }}
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="blue--text lighten-1 text-h4 font-weight-bold">
        Budget Trello
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer>
      <router-link to="/contact">
        <v-card>
          <v-card-title> Contact us. </v-card-title>
        </v-card>
      </router-link>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    drawer: true,
    items: [
      {
        title: "Login",
        link: "/login",
        icon: "mdi-account-circle",
      },
      {
        title: "My Board",
        link: "/board",
        icon: "mdi-hammer",
      },
      {
        title: "About us",
        link: "/about",
        icon: "mdi-account-group",
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