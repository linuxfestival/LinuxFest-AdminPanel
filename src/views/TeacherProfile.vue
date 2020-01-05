<template>
    <div>
        <h1>Teacher Profile:</h1>

        <div class="col-md-8 order-md-1">
            <div class="col-md-8 order-md-1">
            <form class="needs-validation" @submit.prevent="updateTeacher()" v-if="teacher != undefined">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="fullName">Full Name(Persian Letter only)</label>   
                        <input type="text" class="form-control" placeholder="Full Name..." v-model="teacher.fullName">
                    </div>
                </div>

                <div class="mb-3">
                        <label for="description">Description (Optional):</label>   
                        <textarea class="form-control" id="description" placeholder="Description..." v-model="teacher.description">

                        </textarea>
                </div>
            
                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Update Teacher</button>
            </form>

                <br>
                <br>
            <form @submit.prevent="submitFile()">
                <input class="form-control" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                <button class="btn btn-success ">Upload Image</button>
            </form>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import jalali from 'jalali-moment';
    export default {
        name: "TeacherProfile",
        data() {
            return {
                teacher : {},
                workshops : [],
                file : ''
            }
        },
        methods : {
            getJalali(date) {
                return jalali(date);
            },
            submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
                axios.post( this.$store.getters.teachersApi + 'pic/' + this.teacher._id,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization' : 'Bearer ' + this.$store.getters.token
                        }
                    }
                ).then(response => {
                    console.log(response);
                    console.log('SUCCESS!!');
                }).catch(error => {
                    console.log(error.response);
                    console.log('FAILURE!!');
                });
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            },
            getTeacherWithId(){
                console.log("Getting teacher with id " + this.$route.params.id);
                axios({
                url : this.$store.getters.teachersApi + "manage/" + this.$route.params.id,
                method : 'GET',
                headers : {
                    'Authorization' : 'Bearer ' + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
                this.teacher = response.data.teacher;
                this.workshops = response.data.workshops;
            }).catch(error => {
                console.log(error);
                // console.log("user obj to send " , this.user);
                if(error.response)
                    console.log(error.response);
            }).finally(() => {

            })
            },
            updateTeacher() {
                console.log("update teacher with id ", this.$route.params.id);
                delete this.teacher.createdAt;
                delete this.teacher.updatedAt;
                delete this.teacher.imagePath;
                delete this.teacher._id;
                delete this.teacher.__v;

                axios({
                    url : this.$store.getters.teachersApi + "manage/" + this.$route.params.id,
                    method : "PATCH",
                    data:  this.teacher,
                    headers : {
                        "Authorization" : "Bearer " + this.$store.getters.token,
                        "Content-Type" : "application/json"
                    }
                }).then(response => {
                    console.log(response);
                    this.getTeacherWithId();
                }).catch(error => {
                    console.log(error.response);
                })
            }
        },
        created() {
            // this.getUserWithId();
            this.getTeacherWithId();
        }
    }
</script>

<style scoped>

</style>