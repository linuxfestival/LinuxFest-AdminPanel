<template>
  <div style="padding-top:20px">
    <h1>
      Email Panel
    </h1>
    <div class="emailPanel col-10">
      <form @submit.prevent="sendEmail">
        <div class="col-10">
          <label for="users"><b>select workshop's users</b></label>
          <select id="users" class="custom-select" multiple
                  v-model="selectedWorkshops" size=5>
            <option v-for="workshop in workshops"
                    :value="workshop"
                    :key="workshops.indexOf(workshop)">
              {{ workshop.workshop.title }}
            </option>
          </select>
        </div>
        <br/>
        <div style="display: flex;flex-direction: column" class="col-12">
          <label for="title"><b>email's title</b></label>
          <input id="title" v-model="emailData.title">
          <br/>
          <label>
            <b>write your message here</b>
          </label>
          <textarea v-model="emailData.html"></textarea>
        </div>
        <button class="btn btn-md btn-success mt-3 col-11">{{btn1}}</button>
        <button class="btn btn-md btn-success mt-3 col-11" @click="sendEmailAllUsers">{{btn2}}</button>
        <label for="users"><b>select workshop's users</b></label>
      </form>
      <form>
        <label for="selectedUsers"><b>select users</b></label>
        <select id="selectedUsers" class="custom-select" multiple
                v-model="selectedUsers" size=10>
          <option v-for="user in users"
                  :value="user"
                  :key="users.indexOf(user)">
            {{ user.firstName +" "+ user.lastName }}
          </option>
        </select>
        <button class="btn btn-md btn-success mt-3 col-11" @click.prevent="sendEmailSelectedUser">{{btn3}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components:{
    VueEditor
  },
  data() {
    return {
      workshops: [],
      message:"",
      selectedWorkshops: [],
      selectedUsers:[],
      users: [],
      emailData:{
        mails:[],
        title:"",
        html:""
      },
      btn1:'Send email to selected workshop\'s users',
      btn2:'Send email to all users',
      btn3:'Send email to selected users'
    }
  },
  methods: {
    sendEmailSelectedUser:function (){
      this.btn3 = "loading,please wait"
      let emails = []
        for (let u of this.selectedUsers) {
          emails.push(u.email);
      }
      this.emailData.mails = emails;
      axios({
        url : this.$store.getters.emailAPi,
        method : "POST",
        data :  this.emailData,
        headers : {
          Authorization : "Bearer " + this.$store.getters.token,
          "Content-Type" : "application/json"
        }
      }).then(response => {
        console.log(response);
        this.btn3 = "Send email to selected users"
        this.$notify({
          group : "main",
          text : "email sent successfully",
          title : "Success",
          type : "success",
          position: "top center",
          duration: 3000,
        })
        this.emailData.html= "";
        this.emailData.title="";
        this.emailData.mails = []
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group : "main",
          text : "Error creating user.<br>Check Console for error message",
          title : "Error.",
          type : "error",
          position: "top center",
          duration: 5000,
        })
      })
    },
    sendEmail: function () {
      this.btn1="loading, please wait"
      let emails = []
      for (let workshop of this.selectedWorkshops) {
        for (let u of workshop.participants) {
          emails.push(u.email);
        }
      }
      this.emailData.mails = emails;
      console.log(this.emailData);
      axios({
        url : this.$store.getters.emailAPi,
        method : "POST",
        data :  this.emailData,
        headers : {
          Authorization : "Bearer " + this.$store.getters.token,
          "Content-Type" : "application/json"
        }
      }).then(response => {
        this.btn1 = "Send email to selected workshop\'s users"
        console.log(response);
        this.$notify({
          group : "main",
          text : "email sent successfully",
          title : "Success",
          type : "success",
          position: "top center",
          duration: 3000,
        })
        this.emailData.html= "";
        this.emailData.title="";
        this.emailData.mails = []
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group : "main",
          text : "Error creating user.<br>Check Console for error message",
          title : "Error.",
          type : "error",
          position: "top center",
          duration: 5000,
        })
      })
    },
    sendEmailAllUsers() {
      this.btn2 = "loading,please wait"
      console.log("start emailing to all users")
      let emails = []
      for (let u of this.users) {
        emails.push(u.email);
      }
      this.emailData.mails = emails;
      console.log(this.emailData);
      axios({
        url : this.$store.getters.emailAPi,
        method : "POST",
        data :  this.emailData,
        headers : {
          Authorization : "Bearer " + this.$store.getters.token,
          "Content-Type" : "application/json"
        }
      }).then(response => {
        this.btn2 = "send email to all users"
        console.log(response);
        this.$notify({
          group : "main",
          text : "email sent successfully",
          title : "Success",
          type : "success",
          position: "top center",
          duration: 3000,
        })
        this.emailData.html= "";
        this.emailData.title="";
        this.emailData.mails = []
      }).catch(error => {
        console.log(error.response);
        this.$notify({
          group : "main",
          text : "Error creating user.<br>Check Console for error message",
          title : "Error.",
          type : "error",
          position: "top center",
          duration: 5000,
        })
      })
    },
    getWorkshops: function () {
      axios({
        url: this.$store.getters.workshopsApi + "manage",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token,
          "Content-Type": "application/json"
        }
      }).then(response => {
        // console.log("workshops:")
        // console.log(response.data);
        this.workshops = response.data;
      }).catch(error => {
        console.log(error.response);
      });
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
        // console.log("All users")
        // console.log(response.data);
        this.users = response.data;
      }).catch(error => {
        console.log(error);
        if (error.response)
          console.log(error.response)
      }).finally(() => {
      })
    }
  },
  created() {
    this.getWorkshops();
    this.getAllUsers();
  }
}
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  color: darkslategray;
}

.emailPanel{
  border:solid #521c34 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5%;
  align-items: center;
  padding: 20px;
}
</style>