<template>
    <div>
        <h1>users ({{users.length}}) :</h1>
        <router-link to="/createuser" class="btn btn-success btn-md" >(+)Add New User</router-link>
      <div class="downloadBtn">
      <vue-csv-downloader
          class="btn btn-md btn-info mt-3 mb-3"
          :data="users"
          :fields="exportFieldsAll"
          :download-name="'allUsers' + (new Date()) + '.csv'"
      >
        Download this list as csv
      </vue-csv-downloader>
      </div>
        <div class="table-responsive mt-3">
            <table class="table table-sm table-hover isansFont">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">First-Name</th>
                <th scope="col">Last-Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone-Number</th>
                <th scope="col">Age</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Updated At</th>
                <th>Amirkabiri hastam?</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" class="text-center" :key="users.indexOf(user)">
                    <td>{{users.indexOf(user) + 1}}</td>
                    <td class="iransans">{{user.firstName}}</td>
                    <td class="iransans">{{user.lastName}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phoneNumber}}</td>
                    <td>{{user.age}}</td>
                    <td class="iransans">{{getJalali(user.createdAt).locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td class="iransans">{{getJalali(user.updatedAt).locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td v-if="user.studentNumber == undefined">no</td>
                    <td v-else>{{user.studentNumber}}</td>
                    <td class="d-flex align-items-center justify-content-center">
                        <router-link :to="'users/' + user._id" class="btn btn-just-icon btn-warning mr-1"><i class="material-icons">edit</i></router-link>
                        <button @click="deleteUser(user._id)" class="btn btn-just-icon btn-danger"><i class="material-icons">close</i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import jalali from "jalali-moment"
    import VueCsvDownloader from 'vue-csv-downloader';

    export default {
        name: "Users",
        data() {
            return {
                users : [],
              exportFieldsAll : [
                'firstName',
                'lastName',
                'phoneNumber',
                'studentNumber',
                'email'
              ]
            }
        },
      components:{
        VueCsvDownloader
      },
        methods : {
            getJalali: function(date){
                return jalali(date);
            },
            viewUser: function(userId) {
                console.log('view user ', userId);
                this.$router.push('/users/' + userId);
            },
            deleteUser: function(userId) {
                console.log('delete user ', userId);
                if(window.confirm("Are you sure to delete user with id " + userId + " ?")) {
                    axios({
                        url : this.$store.getters.usersApi + userId,
                        method : 'DELETE',
                        headers : {
                            'Authorization' : 'Bearer ' + this.$store.getters.token,
                            'Content-Type' : 'application/json'
                        }
                    }).then(response => {
                        console.log("delete user response",response);
                        this.getListOfUsers();
                    }).catch(error => {
                        console.log(error.response);
                    })
                }
            },
            getListOfUsers : function() {
                axios({
                    url : this.$store.getters.usersApi,
                    method : 'GET',
                    headers : {
                        "Authorization" : "Bearer " + this.$store.getters.token,
                        "Content-Type" : "application/json"
                    }
                }).then(response => {
                    console.log(response);
                    this.users = response.data;
                }).catch(error => {
                    console.log(error);
                    if(error.response)
                        console.log(error.response)
                }).finally(() =>{

                })
            }
        },
        created() {
            this.getListOfUsers()
        }
    }
</script>

<style scoped>
    .btn-just-icon {
        width:25px;
        height:25px;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .downloadBtn{
      display: flex;
      justify-content: center;
    }
</style>