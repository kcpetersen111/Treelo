<template>
    <v-app>
        <v-parallax src="https://cdn.shopify.com/s/files/1/0326/7189/articles/General_Sherman_tree_2000x.jpg?v=1627936731" height="1000">
            <v-main>
                <v-card class=" mx-auto mt-7 pb-4 px-7 rounded-xl" color="rgba(255,255,255,.7)" flat width="400">
                    <v-card-title style="display: block">
                        <b>Sign in</b> 
                    </v-card-title>
                    <v-text-field class="rounded-pill" label="Email" outlined color="black" v-model="usernameInput" :rules="[rules.requiredEmail,rules.email]" autofocus></v-text-field>
                    <v-text-field class="rounded-pill" label="Password" outlined color="black" type="password" v-model="passwordInput" :rules="[rules.requiredPassWord]"></v-text-field>
                    <v-card-actions>
                        <v-btn id="login-button" class="mr-auto ml-10 mb-2 mt-n4 rounded-sm" elevation="12" @click="postSession()">
                            Login 
                        </v-btn>
                        <v-btn id="registration-button" class="mr-8 ml-14 mb-2 mt-n4 rounded-sm" elevation="12" @click="gotoRegister()">  
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
            
            rules:{
                requiredEmail: (value:any) => !!value || 'Valid Email Required.',
                requiredPassWord: (value:any) => !!value || 'Valid Password Required.',
                email: (value:any) => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                }
            },
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


