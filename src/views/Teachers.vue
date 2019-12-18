<template>
    <div>
        <h1>Teachers ({{teachers.length}}): </h1>
    </div>
</template>

<script>
import axios from 'axios';
import jalali from 'jalali-moment';

export default {
    name : "Teachers",
    data() {
        return {
            teachers : []
        }
    },
    methods : {
        getJalali: function(date) {
            return jalali(date);
        },
        getTeachers : function() {
            //getting list of teachers
            axios({
                url : this.$store.getters.teachersApi,
                method : "GET",
                headers : {
                    "Authorization" : "Bearer " + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
                this.teachers = response.data;
            }).catch(error => {
                console.log(error.response);
            })
        }
    },
    created() {
        this.getTeachers();
    }
}
</script>

<style scoped>

</style>






