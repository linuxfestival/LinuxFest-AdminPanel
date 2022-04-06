<template>
    <nav class="nav flex-column align-items-start justify-content-start navbar-fixed"
         v-if="isLoggedIn"
         style="background: #521c34; color: white; padding:10px">
        <h5>Linux Fest Admin v1.0</h5>
        <router-link class="nav-link navLink" to="/home">Home</router-link>
        <router-link class="nav-link navLink" to="/users">Users</router-link>
        <router-link class="nav-link navLink" to="/workshops">Workshops</router-link>
        <router-link class="nav-link navLink" to="/teachers">Teachers</router-link>
        <router-link class="nav-link navLink" to="/email">Email Panel</router-link>
        <router-link class="nav-link navLink" to="/companies">Companies</router-link>
        <router-link class="nav-link navLink" to="/discounts">Discounts</router-link>
        <router-link class="nav-link navLink" to="/workshops/dump">Dump workshop</router-link>
        <button class="nav-link btn btn-block btn-danger" @click="logout()">Logout</button>
    </nav>
    <nav class="nav flex-column align-items-start justify-content-start" v-else>
        <h5>Linux Fest Admin v1.0</h5>
        Login First.
    </nav>
</template>

<script>
    export default {
        name: "TopMenu",
        computed : {
            isLoggedIn : function(){
                return this.$store.getters.isLoggedIn;
            }
        },
        methods : {
            logout: function() {
                this.$store.commit('logout');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
  .navLink{
    color: white;
  }
</style>