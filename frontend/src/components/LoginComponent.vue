<template>
    <v-app>
        <v-parallax src="https://cdn.shopify.com/s/files/1/0326/7189/articles/General_Sherman_tree_2000x.jpg?v=1627936731" height="1000">
            <v-main>
                <v-card class=" mx-auto mt-7 pb-4 px-7" color="rgba(255,255,255,.7)" flat max-width="500">
                    <v-card-title style="display: block">
                        <b>Sign in</b> 
                    </v-card-title>
                    <v-text-field label="username" v-model="usernameInput"></v-text-field>
                    <v-text-field label="password" v-model="passwordInput"></v-text-field>
                    <v-card-actions>
                        <v-btn @click="postSession()">
                            Login 
                        </v-btn>
                        <v-btn @click="gotoRegister()">  
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-main>
        </v-parallax>
    </v-app>
</template>

<script lang="ts">
    URL = "localhost:8080"
    export default{
        name: "LoginComponent",
        props: {
            //
        },
        data: () => ({
            usernameInput: "",
            passwordInput: "",
        }),
        methods: {
            gotoRegister(){
                console.log("GO to Register page!");
                window.location.href = "/registration";
                //make this a route later??
            },
            postSession: async function(){
                let loginCredentials = {username: this.usernameInput, password: this.passwordInput};

                let response = await fetch(URL + "/session", {
                    method: "POST",
                    body: JSON.stringify(loginCredentials),
                    header: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                this.usernameInput =  "";
                this.passwordInput =  "";
                console.log("Login in");
            },
        },
    }
    
</script>


