<template>
    <nav class="nav flex-column align-items-start justify-content-start navbar-fixed bg-light h-100" v-if="isLoggedIn">
        <h5>Linux Fest Admin v1.0</h5>
        <router-link class="nav-link" to="/home">Home</router-link>
        <router-link class="nav-link" to="/users">Users</router-link>
        <router-link class="nav-link" to="/workshops">Workshops</router-link>
        <router-link class="nav-link" to="/teachers">Teachers</router-link>
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

</style>