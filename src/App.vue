<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <TopMenu class="col-md-2"></TopMenu>
      <router-view class="col-md-10"/>
    </div>
  </div>
</template>

<script>
  import TopMenu from '@/components/TopMenu'
  export default {
    name : 'App',
    components : {
      TopMenu
    },computed :{
      isLoggedIn : function() {
        return this.$store.getters.isLoggedIn;
      }
    }
  }
</script>

<style>
.hv-100 {
  min-height:100vh;
}
</style>
