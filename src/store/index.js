import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts: null,
    loginToken: null,
    loggedUserDetail: null
  },
  mutations: {
    loadAdPosts(state, posts) {
      state.posts = posts
    },
    loadToken(state) {
      state.loginToken = localStorage.token
    },
    storeUser(state) {
      state.loggedUserDetail = JSON.parse(localStorage.user)
    },
    deleteUser(state){
      state.loggedUserDetail = null
    }
  },
  actions: {
    async loadAdPosts ({ commit }) {
      try {
         const response = await axios.get('http://127.0.0.1:8000/api/load-ads');
         if(response.data.status){
          commit('loadAdPosts', response.data.data)
         }
         else{
          commit('loadAdPosts', false)
         }
       }
      catch (error) {
        commit('loadAdPosts', false)
      }
    },
  },
  modules: {
  },
  getters: {
    posts(state){
      return state.posts;
    },
    loginToken(state){
      return state.loginToken;
    },
    loggedUser(state){
      return state.loggedUserDetail;
    }
  },
})
