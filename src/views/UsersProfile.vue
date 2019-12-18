<template>
    <h1>users profile</h1>
</template>

<script>
    import axios from 'axios';
    import jalali from 'jalali-moment';
    export default {
        name: "UsersProfile",
        data() {
            return {
                user : {}
            }
        },
        methods : {
            getJalali(date) {
                return jalali(date);
            }
        },
        created() {
            axios({
                url : this.$store.getters.usersApi + this.$route.params.id,
                method : 'GET',
                headers : {
                    'Authorization' : 'Bearer ' + this.$store.getters.token,
                    "Content-Type" : "application/json"
                }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            }).finally(() => {

            })
        }
    }
</script>

<style scoped>

</style>