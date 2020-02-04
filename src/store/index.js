import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token : localStorage.getItem('token') || '',
    adminApi : 'http://skillcenter.aut.ac.ir/linuxfestapialmightyone/',
    usersApi : 'http://skillcenter.aut.ac.ir/linuxfestapiusers/',
    workshopsApi : "http://skillcenter.aut.ac.ir/linuxfestapiworkshops/",
    teachersApi : "http://skillcenter.aut.ac.ir/linuxfestapiteachers/",
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
      return state.token != '';
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
    }
  }
})
