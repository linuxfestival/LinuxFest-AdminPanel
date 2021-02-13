import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token : localStorage.getItem('token') || '',
    adminApi : 'http://linux.ce.aut.ac.ir/almightyone/',
    // adminApi : 'https://heartyhonoreddisk.ahmadforoughi.repl.co/almightyone/',
    usersApi : 'http://linux.ce.aut.ac.ir/users/',
    // usersApi : 'https://HeartyHonoredDisk.ahmadforoughi.repl.co/users/',
    workshopsApi : "http://linux.ce.aut.ac.ir/workshops/",
    // workshopsApi : "https://heartyhonoreddisk.ahmadforoughi.repl.co/workshops/",
    teachersApi : "http://linux.ce.aut.ac.ir/teachers/",
    // teachersApi : "https://heartyhonoreddisk.ahmadforoughi.repl.co/teachers/",
    mailApi: "http://linux.ce.aut.ac.ir/almightyone/mailit",
    companyAPi:"http://linux.ce.aut.ac.ir/companies/",
    discountsAPi:"http://linux.ce.aut.ac.ir/discounts/",
    loggedInAdmin : {},
  },

  mutations: {
    logout: function(state) {
      state.token = '';
      state.loggedInAdmin = {};
      localStorage.clear();
    },
    setToken: function(state, newToken) {
      state.token = newToken;
      localStorage.setItem('token', newToken);
      },
    setLoggedInAdmin: function(state, admin) {
      state.loggedInAdmin = admin;
    }
  },
  actions: {
    login : function({commit}, token,loggedInAdmin){
      commit('setToken',token);
      commit('setLoggedInAdmin', loggedInAdmin);
    }
  },
  modules: {
  },
  getters : {
    token : state => {
      return state.token;
    },
    isLoggedIn : state => {
      // return true;
      return state.token !== '';
    },
    adminApi : state => {
      return state.adminApi;
    },
    usersApi : state => {
      return state.usersApi;
    },
    teachersApi: state => {
      return state.teachersApi;
    },
    workshopsApi : state => {
      return state.workshopsApi;
    },
    loggedInAdmin : state => {
      return state.loggedInAdmin
    },
    emailAPi:state =>{
      return state.mailApi
},
    companiesAPI:state =>{
      return state.companyAPi
    },
    discountApi:state => {
      return state.discountsAPi
    }
  }
})
