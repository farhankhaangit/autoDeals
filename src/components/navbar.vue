<template>
<div>
    <div v-if="modalVisibility">
        <Modal2 :message="modalMessage"/>
    </div>
  <div class="container">
    <div class="menu_bar">
      <img src="../assets/logo.png" alt="icon" class="img-fluid">
      <div>
        <router-link to="/" class="btn btn-dark">Home</router-link>
        <router-link to="/post-new-ad" class="btn btn-dark">Post Ad</router-link>
        <router-link to="/about-us" class="btn btn-dark">About Us</router-link>
      </div>
      <div v-if="!token">
        <router-link to="/login" class="btn btn-outline-primary" v-if="!token">Login/Register</router-link>
      </div>
      <div v-else>
        <button @click="logout" class="btn btn-outline-primary">Logout</button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Modal2 from '../components/modal2.vue';
export default {
    components: {Modal2},
  data(){
    return{
      modalVisibility: false,
      modalMessage:'',
    }
  },
  methods: {
    logout(){
      this.modalMessage = 'Are You Sure?'
      this.toggleModalVisibility() 
    },
    toggleModalVisibility(){
        this.modalVisibility =  !this.modalVisibility;
    },
    accepted(){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$store.commit('storeUser',null)
      window.location.reload();
    }
  },
  computed: {
    token() {
      return this.$store.getters.loginToken;
    }
  },
  mounted(){
    this.$store.commit('loadToken')
  },
} 
</script>
<style>
.menu_bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.menu_bar a{
  margin-left: 10px;
}
</style>

