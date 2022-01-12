import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts: null,
    loginToken: null,
    user: null
  },
  mutations: {
    loadAdPosts(state, posts) {
      state.posts = posts
    },
    loadToken(state) {
      state.loginToken = localStorage.token
    },
    storeUser(state) {
      state.user = localStorage.username
    }
  },
  actions: {
    async loadAdPosts ({ commit }) {
      try {
         const response = await axios.get('http://127.0.0.1:8000/api/load-ads');
         commit('loadAdPosts', response.data)
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
      return state.user;
    }
  },
})
