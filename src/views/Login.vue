<template>
<div>
    <Navbar/>
    <div v-if="modalVisibility">
        <Modal :message="modalMessage" :detail="modaldetail"/>
    </div>
    <div class="container mt-5">
        <h2>Enter Your Details Below to Login!</h2><br>
        <div class="fields">
            <input type="text" placeholder="Enter User Name or Email" v-model="credential">
            <input type="password" placeholder="Enter Your Password" v-model="password">
            <button class="btn btn-warning" @click="login">Login</button>
       </div>
       <router-link to="/register">Click Here to Register if you Don't have an Account!</router-link>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/modal.vue';
import Navbar from '../components/navbar.vue';
export default {
    components: {Modal,Navbar},
    data(){
        return{
            credential: null,
            password: null,
            modalVisibility:false,
            modalMessage:'',
            modaldetail:'',
        }
    },
    methods: {
        login(){
            axios.post('http://127.0.0.1:8000/api/login',{
                credential: this.credential,
                password: this.password,
            }).then(response =>{
              if(response.data.status == false){
                this.modalMessage = 'Authentication Failed'
                this.modaldetail = response.data.message[0]
                this.toggleModalVisibility()
              }
              else{
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.$store.commit('loadToken')
                this.$store.commit('storeUser')
                this.$router.back()
              }
            }).catch(err =>{
                this.modalMessage = err.message
                this.modaldetail = 'Something Went Wrong, Please Try Again Later'
                this.toggleModalVisibility()
            });
        },
        toggleModalVisibility(){
            this.modalVisibility =  !this.modalVisibility;
        }
    },
    mounted() {
        if(this.$store.getters.loginToken){
            this.$router.back();
        }
    },
}
</script>

<style scoped>
    .fields{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 50px;
        width: 50%;
        margin: auto;
    }
    .fields input{
        width: 100%;
        border: none;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        padding: 10px 20px;
        margin-top: 20px;
        background-color: rgba(255, 255, 255, 0.397);
    }
    .fields button{
        display: block;
        margin: auto;
        padding: 10px 20px;
        margin-top: 20px;
        font-weight: bold;
    }
    a{
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
</style>