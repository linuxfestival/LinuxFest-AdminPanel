<template>
    <div>
        <h1>Workshops ({{workshops.length}}): </h1>
        <router-link to="/createworkshop" class="btn btn-md btn-success">Create New Workshop</router-link> 
        <div class="table-responsive mt-3">
            <table class="table table-sm table-hover isansFont">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Capacity</th>
                <th scope="col">Price</th>
                <th scope="col">Open for register?</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="workshop in workshops" class="text-center" :key="workshops.indexOf(workshop)">
                    <td>{{workshops.indexOf(workshop) + 1}}</td>
                    <td class="iransans">{{workshop.workshop.title}}</td>
                    <td class="iransans">{{workshop.workshop.description}}</td>
                    <td>{{workshop.workshop.capacity}}</td>
                    <td>{{workshop.workshop.price}}</td>
                    <td>{{workshop.workshop.isRegOpen}}</td>
                    <td class="iransans">{{getJalali(workshop.workshop.times[0].startTime).utc().locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td class="iransans">{{getJalali(workshop.workshop.times[0].endTime).utc().locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td class="d-flex align-items-center justify-content-center">
                        <router-link :to="'workshops/' + workshop.workshop._id" class="btn btn-just-icon btn-warning mr-1"><i class="material-icons">edit</i></router-link>
                        <button @click="deleteWorkshop(workshop.workshop._id)" class="btn btn-just-icon btn-danger"><i class="material-icons">close</i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>   
    </div>    
</template>

<script>
import axios from "axios";
import jalali from "jalali-moment";

export default {
    name : "Workshops",
    data() {
        return {
            workshops : []
        }
    },
    methods : {
        getJalali(date) {
            return jalali(date);
        },
        deleteWorkshop: function(workshopId) {
            if(window.confirm("Do you really want to delete workshop with id " + workshopId + " ?")){
                axios({
                url : this.$store.getters.workshopsApi + "manage/" + workshopId,
                method : "DELETE",
                headers : {
                    "Authorization" : "Bearer " + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
                  this.$notify({
                    group : "main",
                    text : "WorkShop deleted successfully,please refresh the page to update it",
                    title : "Success",
                    type : "success",
                    position: "top center",
                    duration: 3000,
                  })
                this.getWorkshops();
            }).catch(error => {
                console.log(error.response);
                  this.$notify({
                    group : "main",
                    text : "Error creating user.<br>"+"please refresh the page",
                    title : "Error.",
                    type : "error",
                    position: "top center",
                    duration: 5000,
                  })
            });    
            }  
        },
        getWorkshops: function() {
            console.log("calling workshops");
            axios({
                url : this.$store.getters.workshopsApi + "manage",
                method : "GET",
                headers : {
                    "Authorization" : "Bearer " + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
                this.workshops = response.data;
            }).catch(error => {
                console.log(error.response);
            });
        },
    },
    created() {
        this.getWorkshops();
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
</style>