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
                <v-fab-transition>
                    <v-card v-show="about" class="red lighten-4 pb-16 mx-auto" width=" 70%" href="about">
                        <v-card-text>{{AboutTxt}}</v-card-text>
                        <v-img :src="picture" class="mx-auto" width="200"></v-img>
                        <a :href=GitHub target="_blank" style="text-decoration: none;"><v-btn class="mx-2 mt-2"><v-icon>mdi-github</v-icon></v-btn></a>
                        <a :href=LinkedIn target="_blank" style="text-decoration: none;"><v-btn class="mt-2"><v-icon>mdi-linkedin</v-icon></v-btn></a>
                    </v-card>
                </v-fab-transition>
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
      about: false,
      cards: [
      {name: "Chaz", 
        about: "My name is Chaz Cox and I am a full stack Web Developer for Treelo. I am an accomplished coder and programmer, and I enjoy using my skills to contribute to the exciting technological advances that happen every day at Treelo. I graduated from the Utah Tech University in 2024 with a bachelor's degree in computer science. While in school, I earned the 2022 The Great Binary Search TREE Award for my exemplary academic performance and leadership skills.", 
        github: "https://github.com/chaz-cox",
        linkedin: "https://www.linkedin.com/in/chaz-cox-b108a9236/",
        image:"https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/C4E03AQGixDoEFEj04Q/profile-displayphoto-shrink_800_800/0/1648961201711?e=1663804800&v=beta&t=YVUf85MGOLkd1RFd9ZoPGaf_uO_bW_5LvMIOm3ap6uE",
        },
      {name: "Kendall", 
        about: "Kendall is pretty cool too", 
        github: "https://github.com/kendallbaker12",
        linkedin: "https://www.linkedin.com/in/kendall-baker-033210205/",
        image:"https://theedinburghreporter.co.uk/wp-content/uploads/2020/12/TREES-Tree-hugger-David-Knott-Curator-of-the-Living-Collection-RBGE.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/C5603AQFBrK9dga0q4A/profile-displayphoto-shrink_400_400/0/1658502459239?e=1663804800&v=beta&t=Zr5QVIgZ4GusXPKR_fI2k32EYscTdyQToP58PbA1JOQ",

    },
      {name: "Kaleb", 
        about: `Kaleb Petersen
        (435) 703 3652 • Kcpetersen111@gmail.com • github.com/kcpetersen111
        Skills
        Languages: Python, Java, Go, C++, SQL, Perl
        Tools & Frameworks: Git, LATEX, Pandas, Numpy, SkLearn, Tensorflow
        Education
        Utah Tech University Saint George, UT
        Bachelor of Science in Computer Science Expected: May 2023
        Honors: Dean’s List (Fall 2021, Spring 2022)
        Related Coursework: Software Engineering, Distributed Systems, and Computer Networks
        Awards: 2nd Place 2022 ACM Programming Competition
        Utah Tech University Saint George, UT
        Associate of Science in General Sciences May 2020
        Experience
        Freelance Saint George, UT
        Freelance Data Scientist April 2022 - Present
        • Format and clean data about blockchains
        • Done with bash scripts, python, pandas, etheriumETL, and web3py.
        • Working under experienced data scientists.
        Utah Tech University Saint George, UT
        Undergraduate Researcher January 2022 - Present
        • Researched approaches to university time tabling.
        • Working to create such a system for my university.
        • Working in a small team guided by multiple professors.
        SUCCESS Academy Saint George, UT
        Tutor July 2019 - May 2020
        • Math and Computer Science Tutor.
        • Credited as the only reason multiple students were able to pass.
        • Hired by the school to tutor.
        Achievements
        Sterling Scholar 2020
        Success Academy High School
        Michael F. Peterson Youth Leadership Camp 2019
        Dixie Power Electric
        Eagle Scout 2016
        Boy Scouts of America`, 
        github: "https://github.com/kcpetersen111",
        linkedin: "https://www.linkedin.com/in/kaleb-petersen-92bb19237/",
        image:"http://cdn.shopify.com/s/files/1/0062/8532/8445/products/Norfolk_Island_Pine_5_BB_grande.jpg?v=1607375158",
        picture: "https://media-exp1.licdn.com/dms/image/C4E03AQFCU9ZA0L-oRg/profile-displayphoto-shrink_400_400/0/1650147374237?e=1663804800&v=beta&t=JyPvXm8qbLExikLrc3OqamkvqaWWJjwpqoxQJ7vkj1o",

    },
      {name: "Jake", 
        about: "Jake is pretty cool too", 
        github: "https://github.com/Legac3e",
        linkedin: "https://www.linkedin.com/in/jake-duckett-720967116/",
        image: "https://cdn.britannica.com/92/142292-004-459092B7.jpg",
        picture: "https://media-exp1.licdn.com/dms/image/D5635AQEQuyWWbeYLlA/profile-framedphoto-shrink_800_800/0/1654923985946?e=1659110400&v=beta&t=tlrL6yh2bzpvrxs3hI59SM4snY1woPdfrrMOuh3Kb0c",

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
        }else if(this.AboutTxt == card.about){
            this.about = false;
            this.AboutTxt = "";
            this.GitHub = "";
            this.LinkedIn = "";
            this.picture = "";
        }else{
            this.about = false;
            setTimeout(() => {
                this.about = true;
                this.AboutTxt = card.about;
                this.GitHub = card.github;
                this.LinkedIn = card.linkedin;
                this.picture = card.picture;
            },40);
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
