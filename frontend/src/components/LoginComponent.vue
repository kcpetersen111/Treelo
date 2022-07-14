<template>
    <div>
        <v-card class="blue lighten-5 mx-auto mt-7 pb-4 px-7" loading max-width="500">
            <v-card-title>
                Welcome, Please Login
            </v-card-title>
            <v-text-field label="username" v-model="usernameInput"></v-text-field>
            <v-text-field label="password" v-model="passwordInput"></v-text-field>
            <v-card-actions>
                <v-btn @click="Login()">
                    Submit
                </v-btn>
                <v-btn @click="gotoRegister()">
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
    export default{
        name: "LoginPage",
        data: () => ({
            usernameInput: "",
            passwordInput: "",
        }),
        methods: {
            gotoRegister(){
                console.log("GO to Register page!");
            },
            Login(){
                console.log("Login in");
            },
        },
    }
    
</script>


