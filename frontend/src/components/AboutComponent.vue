<template>
    <div>
        <v-app>
            <video src="https://static.videezy.com/system/resources/previews/000/036/687/original/18_015_06.mp4" autoplay loop playsinline muted></video>
                <v-card class="pa-12 my-10 mx-auto" width="90%" style="background-image: url('https://media.istockphoto.com/photos/snowstorm-texture-bokeh-lights-and-falling-snow-on-a-black-background-picture-id814528100?k=20&m=814528100&s=612x612&w=0&h=2AugqAD4SQ0Dj5SxyCc35Urt88YFZlE_RsUSMfl47y8='); background-repeat: no-repeat; background-size: 100%; opacity: 0.9;">
                    <v-card-title class="white--text" style="display:flex; justify-content: center; flex-direction: column;" >
                        <b>Here at Treelo we want to make your life easier!</b>
                        <v-card-subtitle>
                            <b>Click on a name to learn more about ourselves!</b>
                        </v-card-subtitle>
                    </v-card-title>
                    <v-container justify="center" >
                        <v-row dense justify="center">
                        <v-col
                            v-for="card in cards"
                            :key="card.name"
                            
                        >
                        <v-card max-width="200px" @click="AboutInfo(card)" style="color:skyblue">
                            <v-img 
                                :src="card.image"
                                class="white--text BW"
                                max-width="200px"
                                height="200px"
                            >
                                <v-card-title v-text="card.name" class="justify-center mt-12" ></v-card-title>
                            </v-img>
                        </v-card>
                        </v-col>
                        </v-row>
                    </v-container>  
                </v-card>
                <v-fade-transition>
                    <v-card v-show="about" class="red lighten-4 pb-16 mb-10 mx-auto" width=" 70%" style="background-image: url('https://i.stack.imgur.com/SvWWN.png'); border-radius:50px">
                        <v-card-text style="color:white">{{AboutTxt}}</v-card-text>
                        <v-img :src="picture" class="mx-auto" width="200"></v-img>
                        <a :href=GitHub target="_blank" style="text-decoration: none;"><v-btn class="mx-2 mt-2"><v-icon>mdi-github</v-icon></v-btn></a>
                        <a :href=LinkedIn target="_blank" style="text-decoration: none;"><v-btn class=" mx-2 mt-2"><v-icon>mdi-linkedin</v-icon></v-btn></a>
                        <a :href=resume target="_blank" style="text-decoration: none;"><v-btn class="mx-2 mt-2"><v-icon>mdi-file-account</v-icon></v-btn></a>
                    </v-card>
                </v-fade-transition>
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
      picture: "",
      resume: "",
      about: false,
      cards: [
      {name: "Chaz", 
        about: "I am Chaz Cox currently a Junior studying at Utah Tech University. I was born and raised in St. George Ut. I have attended code school boot camp and have enjoyed learning how to become a better developer. I enjoy learning new things and a I am excited to learn more this coming year in school. I would like to become an software engineer in the coming years, but for now I will continue learning and seeking out opportunities to gain more experience.", 
        github: "https://github.com/chaz-cox",
        linkedin: "https://www.linkedin.com/in/chaz-cox-b108a9236/",
        image:"https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/C4E03AQGixDoEFEj04Q/profile-displayphoto-shrink_800_800/0/1648961201711?e=1663804800&v=beta&t=YVUf85MGOLkd1RFd9ZoPGaf_uO_bW_5LvMIOm3ap6uE",
        resume: "https://drive.google.com/file/d/1A4KUsz0nGT31rLdDW89CXr43Jtq1nOej/view?usp=sharing",
        },
      {name: "Kendall", 
        about: "My Name is Kendall, i am currently a senior at Utah Tech University studying computer science and i will graduate in the spring of 2023. At Treelo i worked a lot on the frontend aspect of the website. I graduated High school from Desert Hills High School in sunny St. George Utah, After that i went on a church mission to Northern Italy for 2 years where i spoke and immersed myself in the italian culture! I orginally went to school for engineering but after taking one programming class i knew that was the path i wanted to take. I like to play video games in my spare time and love going fly fishing.", 
        github: "https://github.com/kendallbaker12",
        linkedin: "https://www.linkedin.com/in/kendall-baker-033210205/",
        image:"https://theedinburghreporter.co.uk/wp-content/uploads/2020/12/TREES-Tree-hugger-David-Knott-Curator-of-the-Living-Collection-RBGE.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/C5603AQFBrK9dga0q4A/profile-displayphoto-shrink_400_400/0/1658502459239?e=1663804800&v=beta&t=Zr5QVIgZ4GusXPKR_fI2k32EYscTdyQToP58PbA1JOQ",
        resume: "https://docs.google.com/document/d/1knAWIW5-9ZnJVnbweYofkyZOxmZarqaDDVXpoO1Bf34/edit",
        

    },
      {name: "Kaleb", 
        about: `I am a senior at Utah Tech University studying Computer Science.  I am passionate about Distributed Systems, Machine 
        Learning, and Academic Papers. I am currently doing undergraduate research with university timetabling. 
        Furthermore, I have attended the Utah Tech University Code School boot camp. Eventually, I would like to pursue a PhD in machine learning, but for now I am looking for a job working with cutting edge technologies.`, 
        github: "https://github.com/kcpetersen111",
        linkedin: "https://www.linkedin.com/in/kaleb-petersen-92bb19237/",
        image:"http://cdn.shopify.com/s/files/1/0062/8532/8445/products/Norfolk_Island_Pine_5_BB_grande.jpg?v=1607375158",
        picture: "https://media-exp1.licdn.com/dms/image/C4E03AQFCU9ZA0L-oRg/profile-displayphoto-shrink_400_400/0/1650147374237?e=1663804800&v=beta&t=JyPvXm8qbLExikLrc3OqamkvqaWWJjwpqoxQJ7vkj1o",
        resume: "https://github.com/kcpetersen111/resume"

    },
      {name: "Jake", 
        about: "Jake is pretty cool too", 
        github: "https://github.com/Legac3e",
        linkedin: "https://www.linkedin.com/in/jake-duckett-720967116/",
        image: "https://cdn.britannica.com/92/142292-004-459092B7.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/D5635AQEQuyWWbeYLlA/profile-framedphoto-shrink_800_800/0/1654923985946?e=1659110400&v=beta&t=tlrL6yh2bzpvrxs3hI59SM4snY1woPdfrrMOuh3Kb0c",
        resume: "",

    },
      ],
    //
  }),
  methods: {
    AboutInfo(card){
        
        //for opening card that has not been opened
        if(!this.about){
            this.about = true;
            this.AboutTxt = card.about;
            this.GitHub = card.github;
            this.LinkedIn = card.linkedin;
            this.picture = card.picture;
            this.resume = card.resume;
        }else if(this.AboutTxt == card.about){
            this.about = false;
            this.AboutTxt = "";
            this.GitHub = "";
            this.LinkedIn = "";
            this.picture = "";
            this.resume = "";
        }else{
            this.about = false;
            setTimeout(() => {
                this.about = true;
                this.AboutTxt = card.about;
                this.GitHub = card.github;
                this.LinkedIn = card.linkedin;
                this.picture = card.picture;
                this.resume = card.resume;
            },100);
        }
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
