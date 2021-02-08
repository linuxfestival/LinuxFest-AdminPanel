<template>
  <div>
    <h1>Companies ({{companies.length}}): </h1>
    <router-link to="/careercreate" class="btn btn-md btn-success">Add New Company</router-link>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover isansFont">
        <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Logo</th>
          <th scope="col">career opportunities</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="company in companies" class="text-center"
            :key="companies.indexOf(company)">
          <td>{{companies.indexOf(company) + 1}}</td>
          <td class="iransans">{{company.name}}</td>
          <td class="iransans">{{company.description}}</td>
          <td><img class="avatar-image" :src="imagesURL+ 'pic/' + company._id"
                   :alt="company.name + 's image. bad url'"></td>
          <td class="iransans">{{company.job_opportunities.length}}</td>
          <td class="d-flex align-items-center justify-content-center">
            <router-link :to="'companies/' + company._id "
                         class="btn btn-just-icon btn-warning mr-1">
              <i class="material-icons">edit</i></router-link>
            <button @click="deleteCompany(company._id)" class="btn btn-just-icon btn-danger"><i class="material-icons">close</i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllCareers",
  data(){
    return{
      companies:[],
      imagesURL:""
    }
  },
  methods: {
    getCompanies() {
      axios({
        url : this.$store.getters.companiesAPI,
        method : "GET",
      }).then(response => {
        console.log(response);
        this.companies = response.data;
      }).catch(error => {
        console.log(error.response);
      });
    },
    deleteCompany(companyId) {
      if (window.confirm("Are you sure to delete company with id " + companyId + "?")) {
        axios({
          url: this.$store.getters.companiesAPI + 'manage/' + companyId,
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.token,
          }
        }).then(response => {
          console.log("delete company response", response);
          this.$notify({
            group: "main",
            text: "company deleted successfully",
            title: "Success",
            type: "success",
            position: "top center",
            duration: 3000,
          })
          this.getCompanies()
        }).catch(error => {
          console.log(error.response);
          this.$notify({
            group: "main",
            title: "Error.",
            text: "please refresh the page and try again",
            type: "error",
            position: "top center",
            duration: 8000,
          })
        })
      }
    }
  },
  created() {
    this.getCompanies();
    this.imagesURL = this.$store.getters.companiesAPI
    console.log(this.companies)
  }
}
</script>

<style scoped>
.avatar-image {
  width:100px;
  height:100px;
}
</style>