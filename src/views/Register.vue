<template>
<div>
    <Navbar/>
    <div v-if="modalVisibility">
        <Modal :message="modalMessage" :detail="modaldetail"/>
    </div>
    <div class="container mt-5">
        <h2>Enter Your Details Below to Register!</h2><br>
        <div class="fields">
            <input type="text" placeholder="Enter Your First Name" v-model="f_name">
            <input type="text" placeholder="Enter Your Last Name" v-model="l_name">
            <input type="text" placeholder="Enter a Unique User Name" v-model="userName">
            <input type="text" placeholder="Enter Your City" v-model="city">
            <input type="text" placeholder="Enter Your Email" v-model="email">
            <input type="text" placeholder="Enter Your Active Phone Number" v-model="contact">
            <input type="password" placeholder="Enter Your Password" v-model="password">
            <input type="password" placeholder="Confirm Your Password" v-model="confirm">
       </div>
       
        <button class="btn btn-warning" @click="registerUser">Register</button>
       <router-link to="/login">Click Here to Login if you Already have an Account!</router-link>
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
            f_name: null,
            l_name: null,
            userName: null,
            city: null,
            email: null,
            contact: null,
            password: null,
            confirm: null,
            fullName:null,
            modalVisibility:false,
            modalMessage:'',
            modaldetail:'',
        }
    },
    methods: {
        registerUser(){
            this.fullName = this.f_name + ' ' + this.l_name
            if(!(this.password == this.confirm)){
                this.modalMessage = 'Password Error'
                this.modaldetail = 'Passwords does not match'
                this.toggleModalVisibility() 
                return
            }
            axios.post('http://127.0.0.1:8000/api/register',{
                name: this.fullName,
                username: this.userName,
                city: this.city,
                email: this.email,
                contact: this.contact,
                password: this.password,
            }).then(response => {
                if(response.data.status == true){
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('username', response.data.user.username)
                this.$store.commit('loadToken')
                this.$store.commit('storeUser')
                this.modalMessage = 'Success'
                this.modaldetail = response.data.message
                this.showModal()
            }
            if(response.data.status == false){
                this.modalMessage = 'Validation Error'
                this.modaldetail = response.data.message[0]
                this.showModal()
            }
            }).catch(err =>{
                this.modalMessage = err.message
                this.modaldetail = 'Something Went Wrong, Please Try Again Later'
                this.showModal()
            });
        },
        toggleModalVisibility(){
            this.modalVisibility =  false;
            if(this.modalMessage=='Success'){
                this.$router.back()
            }
        },
        showModal(){
            this.modalVisibility =  true;
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
        margin-bottom: 20px;
    }
    .fields input{
        width: 40%;
        border: none;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        padding: 10px 20px;
        margin-top: 20px;
    }
    button{
        display: block;
        margin: auto;
        padding: 10px 20px;
        font-weight: bold;
    }
    a{
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
</style>