<template>
  <v-card>
    <v-container fluid style="margin: 0 auto; padding: 0px; width: 80%">
      <v-row dense>
        <v-card class="mt-2" style="width: 100%">
          <v-card-title class="text-h4 justify-center">
            Professional Goals
          </v-card-title>

          <v-card-text fluid class="text-h6" style="margin: 0 auto; width: 75%">
            I am passionate about machine learning applications for digital
            signal processing. Currently, I'm conducting undergraduate research
            on side-channel attacks using zero-permission sensors. <br />
            <br />

            Eventually, I would like to pursue a Ph.D. in Machine Learning, but
            for now, I am looking for cutting-edge research opportunities in
            industry roles.
          </v-card-text>
        </v-card>

        <v-card class="mt-2" style="width: 100%">
          <v-card-title class="text-h4 justify-center">
            Technical Skills
          </v-card-title>

          <v-row>
            <v-col v-for="skillType in technicalSkills" :key="skillType.id">
              <v-list>
                <v-subheader class="text-h5">
                  {{ skillType.name }}
                </v-subheader>

                <v-list-item-group>
                  <v-list-item v-for="skill in skillType.items" :key="skill">
                    <!-- <v-list-item-icon>
                  <v-icon v-text="language.icon"></v-icon>
                </v-list-item-icon> -->

                    <v-list-item-content>
                      <v-list-item-title class="text-h6">
                        {{ skill }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "AboutComponent",
  props: {
    //
  },
  data: () => ({
    technicalSkills: [
      {
        id: 0,
        name: "Languages",
        items: [
          "C",
          "C++",
          "Go",
          "Java",
          "Python",
          "Javascript",
          "Kotlin",
          "C#",
          "Swift",
          "SQL",
        ],
      },
      {
        id: 1,
        name: "Data Science Tools",
        items: [
          "Tensorflow",
          "Pytorch",
          "SK-Learn",
          "Pandas",
          "Matplotlib",
          "Numpy",
        ],
      },
      {
        id: 2,
        name: "Other Tools",
        items: ["Git", "Kubernetes", "Docker", "LaTeX"],
      },
    ],
  }),
};
</script>
