<template>
    <div>
        <h1>Teachers ({{teachers.length}}): </h1>
        <router-link to="/createteacher" class="btn btn-md btn-success">Create new teacher</router-link>
        <div class="table-responsive mt-3">
            <table class="table table-sm table-hover isansFont">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Updated At</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="teacher in teachers" class="text-center" :key="teachers.indexOf(teacher)">
                    <td>{{teachers.indexOf(teacher) + 1}}</td>
                    <td class="iransans">{{teacher.teacher.fullName}}</td>
                    <td class="iransans">{{teacher.teacher.description}}</td>
                    <td><img class="avatar-image" :src="teachersURL + 'pic/' + teacher.teacher._id" :alt="teacher.teacher.fullName + 's image. bad url'"></td>
                    <td class="iransans">{{getJalali(teacher.teacher.createdAt).locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td class="iransans">{{getJalali(teacher.teacher.updatedAt).locale('fa').format('YYYY/M/D HH:mm')}}</td>
                    <td class="d-flex align-items-center justify-content-center">
                        <router-link :to="'teachers/' + teacher.teacher._id" class="btn btn-just-icon btn-warning mr-1"><i class="material-icons">edit</i></router-link>
                        <button @click="deleteTeacher(teacher.teacher._id)" class="btn btn-just-icon btn-danger"><i class="material-icons">close</i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jalali from 'jalali-moment';

export default {
    name : "Teachers",
    data() {
        return {
            teachers : [],
            teachersURL: this.$store.getters.teachersApi
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
                console.log(response.data)
                this.teachers = response.data;
            }).catch(error => {
                console.log(error.response);
            })
        },
        deleteTeacher(teacherId) {
            if(window.confirm("Are you sure to delete teacher with id " + teacherId + " ?")) {
                axios({
                    url : this.$store.getters.teachersApi + "manage/" + teacherId,
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
                    this.getTeachers();
                }).catch(error => {
                    console.log(error.response);
                  this.$notify({
                    group : "main",
                    text : "Error updating user.<br>"+error.response.data.message,
                    title : "Error.",
                    type : "error",
                    position: "top center",
                    duration: 5000,
                  })
                })
            }
        }
    },
    created() {
        this.getTeachers();
        
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
    .avatar-image {
        width:150px;
        height:150px;
    }
</style>






