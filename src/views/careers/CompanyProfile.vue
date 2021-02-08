<template>
  <div>
    <h1>View company details with id {{ this.$route.params.id }}</h1>
    <div class="col-md-8 order-md-1">
      <div class="col-md-8 order-md-1">
        <form class="needs-validation">
          <div class="row">
            <div class="col-md-12 mb-3">
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
            <div class="mb-3">
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
              <label for="link">company's link: </label>
              <input id="link" type="text" class="form-control"
                     v-model="job.jlink">
            </div>
            <hr style="border: solid #521c34 2px"/>
          </div>
        </form>
        <div style="display: flex;justify-content: space-between">
          <button class="btn btn-info" @click="addCareer()">Add new Career opportunity</button>
          <br/>
          <button class="btn btn-warning" @click="removeCareer()">Remove Career opportunity</button>
        </div>
        <br/>
        <button class="btn btn-primary btn-lg btn-block"
                style="margin-bottom: 30px"
                @click="updateCompany">Update Company
        </button>
        <hr/>
        <form @submit.prevent="submitFile()">
          <label for="logo">company's logo:</label>
          <input class="form-control" ref="file"
                 id="logo"
                 type="file"
                 @change="handleFileUpload()"/>
          <br/>
          <button class="btn btn-success col-12" style="margin-bottom: 20px">{{ uploadText }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CompanyProfile",
  data() {
    return {
      inputCompany: {},
      file: "",
      uploadText: "Upload"
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

    updateCompany() {
      axios({
        url: this.$store.getters.companiesAPI + "manage/" + this.$route.params.id,
        method: "patch",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        },
        data: this.inputCompany
      }).then(response => {
        console.log(response.data);
        this.$notify({
          group: "main",
          text: "Company updated successfully",
          title: "Success",
          type: "success",
          position: "top center",
          duration: 3000,
        })
        this.getCurrentCompany()
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group: "main",
          text: "Error updating company.<br>" + error.response.data.message,
          title: "Error.",
          type: "error",
          position: "top center",
          duration: 5000,
        })
      })
    },
    getCurrentCompany() {
      axios({
        url: this.$store.getters.companiesAPI + "find/" + this.$route.params.id,
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then(response => {
        this.inputCompany = response.data;
      }).catch(error => {
        console.log(error.response);
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      this.uploadText = "laoding ..."
      let formData = new FormData();
      formData.append('companyLogo', this.file);
      console.log(this.file)
      axios.post(this.$store.getters.companiesAPI + 'pic/' + this.inputCompany._id,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + this.$store.getters.token
            }
          }
      ).then(response => {
        this.uploadText = "upload image"
        this.$notify({
          group: "main",
          text: "SUCCESS!!",
          title: "Success",
          type: "success",
          position: "top center",
          duration: 3000,
        })
      }).catch(error => {
        console.log(error.response);
        this.uploadText = "upload image"
        this.$notify({
          group: "main",
          text: "ّFAILD",
          title: "Error.",
          type: "error",
          position: "top center",
          duration: 5000,
        })
        console.log('FAILURE!!');
      });
    },
  },
  created() {
    this.getCurrentCompany();
  }
}
</script>

<style scoped>

</style>