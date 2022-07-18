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
    let URL = "http://localhost:8080"
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

                let body = response.json();
                console.log(body);
                
                if(response.status == 201){
                    console.log("success");
                    this.usernameInput =  "";
                    this.passwordInput =  "";

                }else if (response.status == 401){
                    console.log("Unsuccessful");
                    this.passwordInput = "";

                }else{
                    console.log("Error", response.status, response);
                }
            },
        },
    }
    
</script>


