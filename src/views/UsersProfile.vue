<template>
    <div>
        <h1>users profile</h1>

        <div class="col-md-8 order-md-1">
            <form class="needs-validation" @submit.prevent="updateUser()">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="firstName">First Name(Persian Letter only)</label>   
                        <input type="text" class="form-control" placeholder="First Name..." v-model="user.firstName">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="firstName">Last Name(Persian Letter only)</label>   
                        <input type="text" class="form-control" placeholder="Last Name..." v-model="user.lastName">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="age">Age(Number only)</label>   
                        <input type="number" class="form-control" placeholder="Age..." v-model="user.age">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="user.email">
                    <div class="invalid-feedback">
                        Please enter a valid email.
                    </div>
                </div>

                <!-- <div class="mb-3">
                    <label for="password">Password (Strong Enough)</label>
                    <input type="password" class="form-control" id="password" placeholder="Password..." v-model="user.password">
                    <div class="invalid-feedback">
                        Please enter a valid password.
                    </div>
                </div> -->

                <div class="mb-3">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" class="form-control" id="phoneNumber" placeholder="Phone Number..." v-model="user.phoneNumber">
                    <div class="invalid-feedback">
                        Please enter a valid password.
                    </div>
                </div>


                <div class="mb-3">
                    <label for="studentNumber">Student Number(if amirkabiri otherwise ignore)</label>
                    <input type="text" class="form-control" id="studentNumber" placeholder="Amirkabir Student Number..." v-model="user.studentNumber">
                    <div class="invalid-feedback">
                        Please enter a valid studentNumber.
                    </div>
                </div>

                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Update User</button>
            </form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import jalali from 'jalali-moment';
    export default {
        name: "UsersProfile",
        data() {
            return {
                user : {}
            }
        },
        methods : {
            getJalali(date) {
                return jalali(date);
            },
            getUserWithId(){
                console.log("Getting user with id " + this.$route.params.id);
                axios({
                url : this.$store.getters.usersApi + this.$route.params.id,
                method : 'GET',
                headers : {
                    'Authorization' : 'Bearer ' + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
                // this.user = response.data;
                // this.getAllUsers();
            }).catch(error => {
                console.log(error);
                console.log("user obj to send " , this.user);
                if(error.response)
                    console.log(error.resopnse);
            }).finally(() => {

            })
            },
            getAllUsers() {
                axios({
                    url : this.$store.getters.usersApi,
                    method : 'GET',
                    headers : {
                        "Authorization" : "Bearer " + this.$store.getters.token,
                        "Content-Type" : "application/json"
                    }
                }).then(response => {
                    console.log(response);
                    // this.users = response.data;
                    for(let i = 0 ; i < response.data.length ; i++) {
                        if(response.data[i]._id == this.$route.params.id) {
                            this.user = response.data[i];
                            break;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    if(error.response)
                        console.log(error.response)
                }).finally(() =>{

                })
            },
            updateUser() {
                console.log("update user with id ", this.$route.params.id);
                delete this.user.workshops;
                delete this.user.createdAt;
                delete this.user.updatedAt;
                delete this.user._id;
                delete this.user.__v;
                console.log("user obj to send " , this.user);

                axios({
                    url : this.$store.getters.usersApi + this.$route.params.id,
                    method : "PATCH",
                    data: this.user,
                    headers : {
                        "Authorization" : "Bearer " + this.$store.getters.token,
                        "Content-Type" : "application/json"
                    }
                }).then(response => {
                    console.log(response);
                    this.getAllUsers();
                }).catch(error => {
                    console.log(error.response);
                })
            }
        },
        created() {
            // this.getUserWithId();
            this.getAllUsers();
        }
    }
</script>

<style scoped>

</style>