<template>
  <v-card>
    <v-container fluid style="margin: 0 auto; padding: 0px; width: 80%">
      <v-card class="mt-2" style="width: 100%">
        <v-card-title class="text-h4 justify-center">
          Publications
        </v-card-title>

        <v-row v-for="publication in publications" :key="publication.id">
          <v-card-text>
            <span>
              <i>{{ publication.date }} [{{ publication.type }}]</i>
              {{ publication.authors }} <b>{{ publication.title }}</b> to
              <b>{{ publication.workshopShort }}</b> ({{
                publication.workshopLong
              }})
            </span>
          </v-card-text>

          <!--
          <v-card-actions
            v-if="publication.icon !== '' && publication.link !== ''"
          >

            <v-icon v-if="publication.icon !== ''">
              {{ publication.icon }}
            </v-icon>

            <a v-if="publication.link !== ''"></a>
          </v-card-actions> -->
        </v-row>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PublicationsComponent",
  props: {
    //
  },
  data: () => ({
    publications: [
      {
        id: 0,
        date: "Apr. 2022",
        type: "Presentation",
        authors: "David Gary",
        title: "Sound Wave Extraction Methods from Modern Accelerometers",
        workshopShort: "SURS",
        workshopLong: "Southern Utah Regional Symposium",
        link: "https://docs.google.com/presentation/d/1EYEU_azXYi1dknt6pp7tzTmo-h-e-4kL_xEXfTLYSsM/edit?usp=sharing",
        icon: "mdi-link-variant",
      },
      {
        id: 1,
        date: "Mar. 2022",
        type: "Paper Accepted for Publication",
        authors: "Erick Gutierrez, David Gary, Ren Quinn",
        title:
          "ACCess Granted: Inferring Mobile Device Keystrokes Using Background Accelerometer Data",
        workshopShort: "Curiosity",
        workshopLong:
          "Curiosity Interdisciplinary Journal of Research and Innovation",
        link: "",
        icon: "",
      },
      {
        id: 2,
        date: "Mar. 2022",
        type: "Paper Accepted for Publication",
        authors: "David Gary, Erick Gutierrez, Ren Quinn",
        title: "Sound Wave Extraction from Background Accelerometer Readings",
        workshopShort: "Curiosity",
        workshopLong:
          "Curiosity Interdisciplinary Journal of Research and Innovation",
        link: "",
        icon: "",
      },
      {
        id: 3,
        date: "Feb. 2022",
        type: "Poster Presentation",
        authors: "David Gary",
        title: "Sound Wave Extraction Methods from Modern Accelerometers",
        workshopShort: "UCUR",
        workshopLong: "Utah Conference on Undergraduate Research",
        link: "https://drive.google.com/file/d/14mD-yLh-9m2G7m1ul8AmxbsZN-lWU-hx/view?usp=sharing",
        icon: "mdi-link-variant",
      },
    ],
  }),
};
</script>
