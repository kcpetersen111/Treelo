<template>
    <div>
        <v-app>
                <v-card class="green py-10 ">
                    <v-card-title class="justify-center">
                        <h1>ABOUT US</h1>
                    </v-card-title>
                    <v-card-text>
                        Here at [Budget Trello] we want to make your life alot easier!
                        We enjoy our trees.
                    </v-card-text>
                </v-card>
                <v-card class="black pa-12 my-10">
                    <v-card-title class="white--text">
                        <b>Our Team</b>
                    </v-card-title>
                    <v-container justify="center">
                        <v-row dense justify="center">
                        <v-col
                            v-for="card in cards"
                            :key="card.name"
                        >
                        <v-card max-width="200px" @click="AboutInfo(card)">
                            <v-img 
                                src="https://img.freepik.com/free-vector/tree_1308-36471.jpg?w=2000"
                                class="white--text"
                                max-width="200px"
                            >
                                <v-card-title v-text="card.name" class="justify-center mt-7"></v-card-title>
                            </v-img>
                        </v-card>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-card>
                <v-card v-show="about" class="red lighten-4 pb-16">
                    <v-card-text>{{AboutTxt}}</v-card-text>
                    <a :href=GitHub target="_blank" style="text-decoration: none;"><v-btn><v-icon>mdi-github</v-icon></v-btn></a>
                </v-card>
        </v-app>
    </div>

</template>

<script>
export default {
  name: "AboutComponent",
  props: {
    //
  },
  data: () => ({
      AboutTxt: "",
      GitHub:"",
      about: false,
      cards: [
      {name: "Chaz", about: "Chaz is pretty cool", github: "https://github.com/chaz-cox",},
      {name: "Kendall", about: "Kendall is pretty cool too", github: "https://github.com/kendallbaker12",},
      {name: "Kaleb", about: "Kaleb is pretty cool too", github: "https://github.com/kcpetersen111",},
      {name: "Jake", about: "Jake is pretty cool too", github: "https://github.com/Legac3e",},
      ],
    //
  }),
  methods: {
    AboutInfo(card){
        this.about = true;
        console.log(card.about);
        this.AboutTxt = card.about;
        console.log(card.github);
        this.GitHub = card.github;
    },
  },
};
</script>
