<template>
  <div>
    <h1>Create new teacher :</h1>
    <div class="col-md-8 order-md-1">
      <form class="needs-validation" @submit.prevent="createNewDiscount()">
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="percentage">percentage</label>
            <input id="percentage"
                   type="text"
                   class="form-control"
                   placeholder="percentage"
                   v-model="discounts.percentage">
            <label for="code">code</label>
            <input id="code"
                   type="text"
                   class="form-control"
                   placeholder="code_name"
                   v-model="discounts.code">
            <label for="count">count</label>
            <input id="count"
                   type="text"
                   class="form-control"
                   placeholder="count"
                   v-model="discounts.count">
            <label for="selectedUsers"><b>select users</b></label>
            <select id="selectedUsers" class="custom-select" multiple
                    v-model="selectedUsers" size=10>
              <option v-for="user in users"
                      :value="user._id"
                      :key="users.indexOf(user)">
                {{ user.firstName +" "+ user.lastName }}
              </option>
            </select>
          </div>
        </div>
        <hr class="mb-4">
        <button class="btn btn-primary btn-lg btn-block"
                type="submit">Create New Discount
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "discountCreate",
  data() {
    return {
      discounts: {
        percentage:0,
        count:0,
        code:"",
        users:[]
      },
      users:[],
      selectedUsers:[]
    }
  },
  methods : {
    createNewDiscount() {
      for(let u of this.selectedUsers){
        let object = {
          user:u
        }
        this.discounts.users.push(object)
      }
      console.log(this.discounts);
      axios({
        url : this.$store.getters.discountApi,
        method : "POST",
        data : this.discounts,
        headers : {
          "Authorization" : "Bearer " + this.$store.getters.token,
          "Content-Type" : "application/json"
        }
      }).then(response => {
        console.log(response);
        this.$notify({
          group : "main",
          text : "Discounts created successfully",
          title : "Success",
          type : "success",
          position: "top center",
          duration: 3000,
        })
        this.$router.push('/discounts');
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
      })
    },
    getAllUsers() {
      axios({
        url: this.$store.getters.usersApi,
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.users = response.data;
      }).catch(error => {
        console.log(error);
        if (error.response)
          console.log(error.response)
      })
    }
  },
  created() {
    this.getAllUsers();
  }
}
</script>

<style scoped>

</style>