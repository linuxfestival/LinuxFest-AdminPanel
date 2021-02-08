<!--method add career : add id-->
<template>
  <div>
    <h1>Add new company</h1>
    <div class="col-md-8 order-md-1">
      <form class="needs-validation">
        <div class="row">
          <div class="col-md-10 mb-3">
            <label for="companyName">Name</label>
            <input type="text" class="form-control" id="companyName"
                   placeholder="Company Name..."
                   v-model="inputCompany.name">
          </div>
        </div>
        <div class="mb-3">
          <label for="description">Description:</label>
          <textarea class="form-control" id="description"
                    placeholder="Description..."
                    v-model="inputCompany.description">
          </textarea>
        </div>
<!--        job opportunities            -->
        <hr style="border: solid #521c34 3px"/>
        <div v-for="job in inputCompany.job_opportunities">
          <div class="col-md-10 mb-3">
            <label for="jobName">Name</label>
            <input type="text" class="form-control" id="jobName"
                   placeholder="Job Name..."
                   v-model="job.jobName">
          </div>
          <div class="mb-3">
            <label for="jobDescription">Description:</label>
            <textarea class="form-control" id="jobDescription"
                      placeholder="Description..."
                      v-model="job.jobDescription">
          </textarea>
          </div>
          <div class="mb-3">
            <label for="link">company's link:  </label>
            <input id="link" type="text" class="form-control"
                   v-model="job.jlink">
          </div>
          <hr style="border: solid #521c34 2px"/>
        </div>
      </form>
      <button class="btn btn-info" @click="addCareer()">Add new Career opportunity</button>
      <button class="btn btn-warning" @click="removeCareer()">Remove Career opportunity</button>
      <br/>
      <hr/>
      <p>برای اضافه کردن عکس شرکت، پس از ساختن آن، از قسمت ویرایش شرکت، لوگوی آن را آپلود کنید</p>
      <button class="btn btn-primary btn-lg btn-block" @click="createCompany">Add New Company</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CareersCreate",
  data() {
    return {
      inputCompany: {
        name: '',
        description: '',
        job_opportunities: []
      },
    }
  },
  methods: {
    addCareer() {
      this.inputCompany.job_opportunities.push({
        jobName: "",
        jobDescription: "",
        jlink: ""
      })
    },
    removeCareer() {
      this.inputCompany.job_opportunities.pop()
    },
    createCompany(){
      axios({
        url: this.$store.getters.companiesAPI,
        method : 'POST',
        headers : {
          'Authorization' : "Bearer " + this.$store.getters.token,
          "Content-Type" : "application/json"
        },
        data: this.inputCompany
      }).then(response => {
        this.$router.push("/companies")
        this.$notify({
          group : "main",
          text : "Company created successfully",
          title : "Success",
          type : "success",
          position: "top center",
          duration: 3000,
        })
        console.log(response);
        this.$router.push('/careers');
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group : "main",
          text : "Error creating company.<br>"+error.response.data.message,
          title : "Error.",
          type : "error",
          position: "top center",
          duration: 5000,
        })
      })
    }
  }
}

</script>

<style scoped>

</style>