<template>
    <div>
        <h1>Create New User:</h1>
        <div class="col-md-8 order-md-1">
            <form class="needs-validation" @submit.prevent="createNewUser()">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" placeholder="First Name..." v-model="inputData.firstName">
                    </div>
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" placeholder="Last Name..." v-model="inputData.lastName">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="inputData.email">
                    <div class="invalid-feedback">
                        Please enter a valid email.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password..." v-model="inputData.password">
                    <div class="invalid-feedback">
                        Please enter a valid password.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" class="form-control" id="phoneNumber" placeholder="Phone Number..." v-model="inputData.phoneNumber">
                    <div class="invalid-feedback">
                        Please enter a valid password.
                    </div>
                </div>

                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Create New User</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "UsersCreate",
        data() {
            return {
                inputData : {
                    firstName : "",
                    lastName : "",
                    email : "",
                    password : "",
                    phoneNumber : "",
                }
            }
        },
        methods : {
            createNewUser: function() {
                console.log('input data ', this.inputData);
                axios({
                    url: this.$store.getters.usersApi + 'ac',
                    method : 'POST',
                    headers : {
                        'Authorization' : "Bearer " + this.$store.getters.token,
                        "Content-Type" : "application/json"
                    },
                    data: this.inputData
                }).then(response => {
                    console.log(response);
                    this.$router.push('/users');
                }).catch(error => {
                    console.log(error);
                    if(error.response)
                        console.log(error.response);
                })
            }
        },
        mounted(){
            console.log('user crate mounted');
        }
    }
</script>

<style scoped>

</style>