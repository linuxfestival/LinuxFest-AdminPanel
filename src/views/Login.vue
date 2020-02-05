<template>
        <form class="form-signin d-flex align-items-center justify-content-center flex-column" @submit.prevent="login()">
            <h1 class="h3 mb-3 font-weight-normal w-50">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="password" id="inputEmail" class="form-control form-control-success mt-2 w-50" placeholder="Username" v-model="inputData.username" autofocus="true">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control mt-2 w-50" placeholder="Password" v-model="inputData.password">
            <button class="btn btn-lg btn-primary btn-block mt-2 w-50" type="submit">Sign in</button>
        </form>

</template>

<script>
    import axios from "axios";
    export default {
        name: "Login",
        data() {
            return {
                inputData: {
                    username : "",
                    password : "",
                }
            }
        },
        methods : {
            login: function() {
                console.log('input data:',this.inputData);
                if(this.formIsOk) {
                    axios({
                        url : this.$store.getters.adminApi + 'login',
                        method : "POST",
                        data: this.inputData,
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    }).then(response => {
                        console.log(response);
                        this.$store.dispatch('login',response.data.token,response.data.admin);
                        this.$router.push('/home');
                    }).catch(error => {
                        console.log(error);
                        if(error.response)
                            console.log(error.response);
                    }).finally(() => {

                    });
                }else {
                    console.log('form is not ok.')
                }
            }
        },
        computed : {
            usernameProvided : function() {
                return Boolean(this.inputData.username);
            },
            passwordIsProvided: function() {
                return Boolean(this.inputData.password);
            },
            formIsOk: function() {
                return this.usernameProvided && this.passwordIsProvided;
            }
        }
    }
</script>

<style scoped>

</style>