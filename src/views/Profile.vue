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
     <div class="row">
       <div class="col-lg-6">
          <h3><strong>Your Details:</strong></h3>
          <div class="detail mb-4">
                <p><strong>UserName:</strong> <span style="float:right">{{this.user.username}}</span></p>
                <p><strong>Name:</strong> <span style="float:right; text-transform:capitalize">{{this.user.name}}</span></p>
                <p><strong>Email:</strong> <span style="float:right">{{this.user.email}}</span></p>
                <p><strong>Contact:</strong> <span style="float:right">{{this.user.contact}}</span></p>
                <p><strong>City:</strong> <span style="float:right">{{this.user.city}}</span></p>
                <p><strong>Member Since:</strong> <span style="float:right">{{this.user.created}}</span></p>
          </div>
        </div>
        <div class="col-lg-6">
          <h3><strong>Notifications:</strong></h3>
          <div class="detail mb-4">
              <div class="caard">
                <ul v-if="notifications.length>0">
                  <div v-for="noti in notifications" :key="noti" style="position: relative;">
                    <li :class="[noti.status ? highlight : 'highlight']" @click="notiDetail(noti.id, $event)">
                    <h6><strong>{{noti.title}}<span style="float:right">{{noti.created_at}}</span></strong></h6>
                    <p>{{noti.body}}</p>
                  </li>
                  </div>
                </ul>
                <p v-else>No Notifications Yet!</p>
              </div>
          </div>
        </div>
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
        idToDelete: null,
        nameToDelete: null,
        notifications: [],
        highlight: false,
        config: null
    }
  },
  mounted() {
    this.$store.commit('loadToken')
    this.config = this.$store.getters.header
    if(!this.$store.getters.loginToken){
      this.$router.push('/login');
    }
    else {
      this.$store.commit('storeUser')
      this.$store.commit('loadHeader')
      this.config = this.$store.getters.header
      this.user = this.$store.getters.loggedUser
      
      axios.get(`http://127.0.0.1:8000/api/user-ads/${this.user.username}`,this.config)
      .then( response => {
          if(response.data.status){
            this.posts = response.data.data
            if(this.posts.length<1){
                this.posts = false
            }
            this.loadNotifications()
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
      axios.get(`http://127.0.0.1:8000/api/delete/${this.idToDelete}`,this.config)
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
    deleteRequest(id, adName){
      this.idToDelete = id
      this.nameToDelete = adName
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
            this.generateNotification()
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
    loadNotifications(){
      axios.get(`http://127.0.0.1:8000/api/get-notifications/${this.user.username}`,this.config)
      .then(response => {
          if(response.data.status){
              this.notifications = response.data.data
          }
      }).catch(err => {
          console.log("error")
      })
    },
    notiDetail(id,e){
      axios.get(`http://127.0.0.1:8000/api/mark-read/${id}`,this.config)
      .then(response => {
          if(response.data.status){
              e.target.classList.remove('highlight')
          }
      }).catch(err => {
          console.log("error")
      })
      // e.target.classList.remove('highlight')
    },
    generateNotification(){
            let config = this.$store.getters.header
            let data = {
                user_name: this.$store.getters.loggedUser.username,
                title: "Ad Deleted",
                body: "you deleted Ad for " + this.nameToDelete,
                status: 0
            }
            axios.post('http://127.0.0.1:8000/api/store-notification', data, config ).then(response =>{
              if(response.data.status == false){
                console.log(response.data.message)
              }
              else{
                console.log(response.data.message)
              }
            }).catch(err =>{
                console.log("something went wrong generating notification")
            });
            this.$router.back()
        }
  },
}
</script>
<style scoped>
.detail{
    width: 80%;
    margin: auto;
    margin-top: 20px;
}
.ads{
  margin: 5% !important;
}
  .caard{
    background: rgba(255, 255, 255, 0.301);
    border-radius: 20px;
    padding: 20px;
    height: 300px;
    
  }
  li{
    border-bottom: 1px solid black;
    cursor: pointer;
    padding: 5px 20px;
    margin-bottom: 5px;
  }
  li p{
    margin-bottom: 10px;
    font-size: 0.8rem;
    pointer-events: none
  }
  li h6{
    margin-bottom: 5px;
    font-size: 0.8rem;
    pointer-events: none
  }
  li span{
    color: rgb(114, 114, 114);
  }
  ul{
    list-style: none; 
    padding: 0px; 
    overflow-y: scroll;
    height: 100%;
  }
  .highlight{
    background: rgba(255, 255, 255, 0.753);
  }
  .highlight::after{
    content: '';
    position: absolute;
    top: 10px;
    left: 5px;
    background: red;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
</style>