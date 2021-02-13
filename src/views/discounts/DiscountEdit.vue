<template>
  <div>
    <h1>View Discount details with id {{ this.$route.params.id }}</h1>
    <div class="col-md-8 order-md-1">
      <form class="needs-validation" @submit.prevent="updateDiscount()">
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="percentage">percentage</label>
            <input id="percentage"
                   type="text"
                   class="form-control"
                   placeholder="percentage"
                   v-model="currentDiscounts.percentage">
            <label for="code">code</label>
            <input id="code"
                   type="text"
                   class="form-control"
                   placeholder="code_name"
                   v-model="currentDiscounts.code">
            <label for="count">count</label>
            <input id="count"
                   type="text"
                   class="form-control"
                   placeholder="count"
                   v-model="currentDiscounts.count">
            <label for="selectedUsers"><b>select users</b></label>
            <select id="selectedUsers" class="custom-select" multiple
                    v-model="selectedUsers" size=10>
              <option v-for="user in allUser"
                      :value="user._id"
                      :key="allUser.indexOf(user)">
                {{ user.firstName + " " + user.lastName }}
              </option>
            </select>
          </div>
        </div>
        <hr class="mb-4">
        <button class="btn btn-primary btn-lg btn-block"
                type="submit">Update
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DiscountEdit",
  data() {
    return {
      discounts: {
        percentage:0,
        count:0,
        code:"",
        users:[]
      },
      currentDiscounts:{
        percentage:0,
        count:0,
        code:"",
        users:[]
      },
      allUser: [],
      selectedUsers: []
    }
  },
  methods: {
    updateDiscount() {
      for (let u of this.selectedUsers) {
        let object = { user: u}
        this.discounts.users.push(object)
      }
      this.discounts.percentage = this.currentDiscounts.percentage;
      this.discounts.code = this.currentDiscounts.code;
      this.discounts.count = this.currentDiscounts.count;
      console.log(this.discounts)
      axios({
        url: this.$store.getters.discountApi + this.$route.params.id,
        method: "patch",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        },
        data: this.discounts
      }).then(response => {
        console.log(response.data);
        this.$notify({
          group: "main",
          text: "Discount updated successfully",
          title: "Success",
          type: "success",
          position: "top center",
          duration: 3000,
        })
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group: "main",
          text: "Error updating discount.<br>" + error.response.data,
          title: "Error.",
          type: "error",
          position: "top center",
          duration: 5000,
        })
      })
    },
    getCurrentDiscount() {
      axios({
        url: this.$store.getters.discountApi + this.$route.params.id,
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then(response => {
        this.currentDiscounts = response.data;
        for(let u of response.data.users){
          this.selectedUsers.push(u.user)
        }
      }).catch(error => {
        console.log(error.response);
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
        this.allUser = response.data;
      }).catch(error => {
        console.log(error);
        if (error.response)
          console.log(error.response)
      })
    }
  },
  created() {
    this.getCurrentDiscount()
    this.getAllUsers()
  }
}
</script>

<style scoped>

</style>