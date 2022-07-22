<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content style="flex-wrap: nowrap">
            <router-link :to="item.link" style="display: flex">
              <v-list-item-icon class="mr-6">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title
                class="text-left text-button font-weight-bold nav-list-title"
              >
                {{ item.title }}
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h4 font-weight-bold">
        Treelo
      </v-toolbar-title>
        <v-btn color="indigo" fab class="mx-auto mr-3" @click="goToSettings()">
          <v-icon color="green">
            mdi-pine-tree
          </v-icon>
        </v-btn>
    </v-app-bar>

    <v-main class="px-0">
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
    userCard: true,
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
  methods: {
    goToSettings(){
      window.location.href = "/settings";
    }
  }
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

.v-navigation-drawer__image {
  opacity: 60%;
}

.v-toolbar__image {
  opacity: 80%;
}

a {
  text-decoration: none;
}

.nav-list-title,
.v-toolbar__title {
  color: #ffffff;
}

.router-link-exact-active > .nav-list-title {
  // color: #42b983;
  color: #00ff8c;
}
</style>
