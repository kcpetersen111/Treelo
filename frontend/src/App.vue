<template>
  <v-app v-cloak>
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
      <v-app-bar-nav-icon @click="openNav()" v-if="username"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h4 font-weight-bold">
        Treelo
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="username" class="pr-4">
        Hello {{ username.charAt(0).toUpperCase() + username.slice(1) }}!
      </div>
      <v-btn v-if="username" color="indigo" fab class="mx-auto mr-3" @click="changeRoute('/settings')">
        <v-icon color="green"> mdi-pine-tree </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    
    <v-bottom-navigation 
    v-if="username == ''"
    width="100%"
    style="
        background-image: url('https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg');
        background-size: cover;
      "
      grow
      >
      <v-btn @click="changeRoute('/login')">
        <span class="white--text">Login</span>
        <v-icon class="white--text">mdi-login</v-icon>
      </v-btn>

      <v-btn @click="changeRoute('/contact')">
        <span class="white--text">Contact Us</span>
        <v-icon class="white--text">mdi-email</v-icon>
      </v-btn>

      <v-btn @click="changeRoute('/about')">
        <span class="white--text">About Us</span>
        <v-icon class="white--text">mdi-human-greeting-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import {URL} from './config';
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    userCard: true,
    username: "",
    items: [
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
    changeRoute(route){
      this.$router.replace({path:route});
    },
    // will get the name so that it can show up at the top
    kalebsMethod: async function () {
      let response = await fetch(URL + "/session", {
        method: "GET",
        credentials: "include",
      });
      if (response.status != 200 && this.$router.currentRoute.path != '/login') {
        this.$router.replace({path: "/login"});
      } else if (response.status == 200) {
        let body = await response.json();
        this.username = body.name;
        if (this.$router.currentRoute.path != '/board')
          this.$router.replace({path: "/board"});
      }
    },
    openNav: function () {
      if (this.username) {
        this.drawer = !this.drawer;
      }
    }
  },
  created() {
    this.kalebsMethod();
  },
});
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

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
