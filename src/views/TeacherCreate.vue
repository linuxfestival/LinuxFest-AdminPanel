<template>
    <div>
        <h1>Create new teacher :</h1>
        <div class="col-md-8 order-md-1">
            <form class="needs-validation" @submit.prevent="createNewTeacher()">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="fullName">Full Name(Persian Letter only)</label>   
                        <input id="fullName"
                               type="text"
                               class="form-control"
                               placeholder="Full Name..."
                               v-model="newTeacher.fullName">
                    </div>
                </div>

                <div class="mb-3">
                        <label for="description">Description (Optional):</label>   
                        <textarea class="form-control"
                                  id="description"
                                  placeholder="Description..."
                                  v-model="newTeacher.description">

                        </textarea>
                </div>
                <hr class="mb-4">
              <p>برای اضافه کردن عکس مدرس، پس از ساختن آن، از قسمت ویرایش استاد، لوگوی آن را آپلود کنید</p>
                <button class="btn btn-primary btn-lg btn-block"
                        type="submit">Create New Teacher</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name : "TeacherCreate",
    data() {
        return {
            newTeacher: {
                fullName : "",
                description: "",
            }
        }
    },
    methods : {
        createNewTeacher() {
            console.log(this.inputData);
            axios({
                url : this.$store.getters.teachersApi + "manage/",
                method : "POST",
                data : this.newTeacher,
                headers : {
                    "Authorization" : "Bearer " + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }   
            }).then(response => {
                console.log(response);
              this.$notify({
                group : "main",
                text : "Teacher created successfully",
                title : "Success",
                type : "success",
                position: "top center",
                duration: 3000,
              })
              this.$router.push('/teachers');
            }).catch(error => {
                console.log(error.response)
                this.$notify({
                group : "main",
                text : "Error creating user.<br>"+error.response.data.error,
                title : "Error.",
                type : "error",
                position: "top center",
                duration: 5000,
              })
            }).finally(() => {
                
            })
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>