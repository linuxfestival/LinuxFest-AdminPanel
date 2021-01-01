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
            
<!--                <div class="mb-3">-->
<!--                        <label for="imagePath">Image Path (Optional - Set Empty until Fixed):</label>-->
<!--                        <input type="url"-->
<!--                               class="form-control"-->
<!--                               id="imagePath" placeholder="ImagePath..."-->
<!--                               v-model="newTeacher.imagePath">-->
<!--                </div>-->

            
                <hr class="mb-4">
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
                // imagePath : ""
            }
        }
    },
    methods : {
        createNewTeacher() {
            console.log(this.inputData);
            axios({
                url : this.$store.getters.teachersApi,
                method : "POST",
                data : this.newTeacher,
                headers : {
                    "Authorization" : "Bearer " + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }   
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.response)
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