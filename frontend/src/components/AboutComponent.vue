<template>
    <div>
        <v-app>
            <video src="https://static.videezy.com/system/resources/previews/000/036/687/original/18_015_06.mp4" autoplay loop playsinline muted></video>
                <v-card class="green py-10 mx-auto" width="80%">
                    <v-card-title class="justify-center">
                        <h1>ABOUT US</h1>
                    </v-card-title>
                    <v-card-text>
                        Here at [Budget Trello] we want to make your life alot easier!
                        We enjoy our trees.
                    </v-card-text>
                </v-card>
                <v-card class="pa-12 my-10 mx-auto" width="90%" style="background-image: url('https://media.istockphoto.com/photos/snowstorm-texture-bokeh-lights-and-falling-snow-on-a-black-background-picture-id814528100?k=20&m=814528100&s=612x612&w=0&h=2AugqAD4SQ0Dj5SxyCc35Urt88YFZlE_RsUSMfl47y8='); background-repeat: no-repeat; background-size: 100%; opacity: 0.9;">
                    <v-card-title class="white--text">
                        <b>Our Team</b>
                    </v-card-title>
                    <v-container justify="center">
                        <v-row dense justify="center">
                        <v-col
                            v-for="card in cards"
                            :key="card.name"
                        >
                        <v-card max-width="200px" @click="AboutInfo(card)" to="/about" >
                            <v-img 
                                :src="card.image"
                                class="white--text BW"
                                max-width="200px"
                                height="200px"
                            >
                                <v-card-title v-text="card.name" class="justify-center mt-7"></v-card-title>
                            </v-img>
                        </v-card>
                        </v-col>
                        </v-row>
                    </v-container>  
                </v-card>
                <v-card v-show="about" class="red lighten-4 pb-16" href="/about">
                    <v-card-text>{{AboutTxt}}</v-card-text>
                    <a :href=GitHub target="_blank" style="text-decoration: none;"><v-btn class="mx-2"><v-icon>mdi-github</v-icon></v-btn></a>
                    <a :href=LinkedIn target="_blank" style="text-decoration: none;"><v-btn><v-icon>mdi-linkedin</v-icon></v-btn></a>
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
      LinkedIn: "",
      about: false,
      cards: [
      {name: "Chaz", 
        about: "Chaz is pretty cool", 
        github: "https://github.com/chaz-cox",
        linkedin: "https://www.linkedin.com/in/chaz-cox-b108a9236/",
        image:"https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
        },
      {name: "Kendall", 
        about: "Kendall is pretty cool too", 
        github: "https://github.com/kendallbaker12",
        linkedin: "https://www.linkedin.com/in/kendall-baker-033210205/",
        image:"https://theedinburghreporter.co.uk/wp-content/uploads/2020/12/TREES-Tree-hugger-David-Knott-Curator-of-the-Living-Collection-RBGE.jpg",
    },
      {name: "Kaleb", 
        about: "Kaleb is pretty cool too", 
        github: "https://github.com/kcpetersen111",
        linkedin: "https://www.linkedin.com/in/kaleb-petersen-92bb19237/",
        image:"http://cdn.shopify.com/s/files/1/0062/8532/8445/products/Norfolk_Island_Pine_5_BB_grande.jpg?v=1607375158",
    },
      {name: "Jake", 
        about: "Jake is pretty cool too", 
        github: "https://github.com/Legac3e",
        linkedin: "https://www.linkedin.com/in/jake-duckett-720967116/",
        image: "https://cdn.britannica.com/92/142292-004-459092B7.jpg",
    },
      ],
    //
  }),
  methods: {
    AboutInfo(card){
        this.about = true;
        this.AboutTxt = card.about;
        this.GitHub = card.github;
        this.LinkedIn = card.linkedin;
    },
  },
};
</script>

<style>
    .BW{
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }
</style>
