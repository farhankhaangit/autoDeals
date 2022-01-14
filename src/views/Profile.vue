<template>
 <div>
   <Navbar/>
   <div v-if="modalVisibility">
    <Modal :message="modalMessage" :detail="modaldetail"/>
   </div>
    <div v-if="modal2Visibility">
        <Modal2 :message="modalMessage" :detail="modaldetail"/>
    </div>
   <div class="container mb-4 mt-4" v-if="this.user">
       <h3><strong>Your Details:</strong></h3>
       <div class="detail mb-4">
            <p><strong>UserName:</strong> <span style="float:right">{{this.user.username}}</span></p>
            <p><strong>Name:</strong> <span style="float:right; text-transform:capitalize">{{this.user.name}}</span></p>
            <p><strong>Email:</strong> <span style="float:right">{{this.user.email}}</span></p>
            <p><strong>Contact:</strong> <span style="float:right">{{this.user.contact}}</span></p>
            <p><strong>City:</strong> <span style="float:right">{{this.user.city}}</span></p>
            <p><strong>Member Since:</strong> <span style="float:right">{{this.user.created}}</span></p>
       </div>
       <h3><strong>Your Ads:</strong></h3>
       <div class="ads mt-5 mb-5">
            <div v-for="post in posts" :key="post">
                <PostAd :name="post.brand + ' ' + post.name + ' ' + post.variant"
                        :transmission="post.transmission"
                        :engine="post.engine_size"
                        :location="post.location"
                        :id="post.id"
                        :price="post.price"
                        :image_src="post.title_image"
                        :profile="true"/>
            </div>
            <div v-if="!posts">
                <h6>No Ads Yet!</h6>
            </div>
        </div>
   </div>
 </div>
</template>

<script>
import PostAd from '../components/post-ad.vue';
import Navbar from '../components/navbar.vue';
import Modal from '../components/modal.vue';
import Modal2 from '../components/modal2.vue';
import axios from 'axios'

export default {
  components: {PostAd,Navbar,Modal,Modal2},
  data(){
    return {
        modalVisibility:false,
        modal2Visibility:false,
        modalMessage:'',
        modaldetail:'',
        user: null,
        posts: null,
        idToDelete: null
    }
  },
  mounted() {
    this.$store.commit('loadToken')
    if(!this.$store.getters.loginToken){
      this.$router.push('/login');
    }
    else {
      this.$store.commit('storeUser')
      this.user = this.$store.getters.loggedUser

      axios.get(`http://127.0.0.1:8000/api/user-ads/${this.user.username}`)
      .then( response => {
          if(response.data.status){
            this.posts = response.data.data
            if(this.posts.length<1){
                this.posts = false
            }
          }
          else {
            this.modalMessage = 'Error'
            this.modaldetail = response.data.message
            this.toggleModalVisibility()
          }
      }).catch( err =>{
        this.modalMessage = 'Server Error'
        this.modaldetail = 'Something Went Wrong'
        this.toggleModalVisibility()
      });
    }
  },
  methods: {
    delete(){
      axios.get(`http://127.0.0.1:8000/api/delete/${this.idToDelete}`)
      .then(response => {
          if(response.data.status){
              this.modalMessage = 'Success!'
              this.modaldetail = response.data.message
              this.showModal()
          }
      }).catch(err => {
          this.modalMessage = 'Error'
          this.modaldetail = 'Something Went Wrong'
          this.showModal()
      })
    },
    deleteRequest(id){
      this.idToDelete = id
      this.confirm()
    },
    confirm(){
        this.modalMessage = 'Are You Sure?'
        this.modaldetail = 'Do this if your car is sold!'
        this.modal2Visibility =  true
    },
    toggleModalVisibility(){
        this.modal2Visibility =  false
        this.modalVisibility =  false
        if(this.modalMessage == 'Success!'){
            window.location.reload();
        }
    },
    accepted(){
        this.modal2Visibility =  false
        this.delete()
    },
    showModal(){
        this.modalVisibility =  true
    },
  },
}
</script>
<style scoped>
.detail{
    width: 40%;
    margin: auto;
    margin-top: 20px;
}
.ads{
  margin: 5% !important;
}
</style>