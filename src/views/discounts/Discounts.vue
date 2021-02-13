<template>
  <div>
    <h1>Discounts ({{ discounts.length }}): </h1>
    <router-link to="/creatediscount" class="btn btn-md btn-success">Create new discount</router-link>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover isansFont">
        <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Percentage</th>
          <th scope="col">code</th>
          <th scope="col">count</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="dis in discounts" class="text-center" :key="discounts.indexOf(dis)">
          <td>{{ discounts.indexOf(dis) + 1 }}</td>
          <td class="iransans">{{ dis.percentage }}</td>
          <td class="iransans">{{ dis.code }}</td>
          <td class="iransans">{{ dis.count }}</td>
          <td class="d-flex align-items-center justify-content-center">
            <router-link :to="'discounts/' + dis._id" class="btn btn-just-icon btn-warning mr-1"><i
                class="material-icons">edit</i></router-link>
            <button @click="deleteDiscount(dis._id)" class="btn btn-just-icon btn-danger"><i class="material-icons">close</i>
            </button>
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
  name: "Discounts",
  data() {
    return {
      discounts: []
    }
  },
  methods: {
    getDiscounts: function () {
      axios({
        url: this.$store.getters.discountApi,
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response.data)
        this.discounts = response.data;
      }).catch(error => {
        console.log(error.response);
      })
    },
    deleteDiscount(discountId) {
      if (window.confirm("Are you sure to delete discount with id " + discountId + " ?")) {
        axios({
          url: this.$store.getters.discountApi + discountId,
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + this.$store.getters.token,
            "Content-Type": "application/json"
          }
        }).then(response => {
          console.log(response);
          this.$notify({
            group: "main",
            text: "Discount deleted successfully",
            title: "Success",
            type: "success",
            position: "top center",
            duration: 3000,
          })
          this.getDiscounts();
        }).catch(error => {
          console.log(error.response);
          this.$notify({
            group: "main",
            text: "Error updating user.<br>" + error.response.data.message,
            title: "Error.",
            type: "error",
            position: "top center",
            duration: 5000,
          })
        })
      }
    }
  },
  created() {
    this.getDiscounts()
  }
}
</script>

<style scoped>

</style>