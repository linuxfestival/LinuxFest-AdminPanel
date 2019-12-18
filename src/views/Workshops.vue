<template>
    <div>
        <h1>Workshops ({{workshops.length}}): </h1>
        <router-link to="/createworkshop" class="btn btn-md btn-success">Create New Workshop</router-link>    
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
        }
    },
    created() {
        this.getWorkshops();
    }
}
</script>

<style scoped>

</style>