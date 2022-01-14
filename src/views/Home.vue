<template>
 <div>
   <router-link to="post-new-ad" class="btn btn-warning postAd">Post New Ad!</router-link>
   <Navbar/>
   <div v-if="modalVisibility">
        <Modal :message="modalMessage" :detail="modaldetail"/>
    </div>
   <div class="landing text-center">
     <div>
        <h1 style="color: rgb(255, 251, 0); font-weight: bold;">AutoDeals.com</h1>
        <h2>browse cars below to get in your budget</h2>
        <br><h3>want to sale your car? <router-link to="post-new-ad">Click Here!</router-link></h3>
     </div>
   </div>
   <div class="filters mt-5">
     <div class="container">
       <h3>Set Filters: <br></h3>
       <div>
          <select name="" id="">
            <option value="" selected disabled>Search by Brand Name</option>
          </select>
          <input type="text" placeholder="Search by name">
          <select name="" id="">
            <option value="" selected disabled>Search by Engin Size</option>
          </select>
          <select name="" id="">
            <option value="" selected disabled>Search by Price Range</option>
          </select>
       </div>
     </div>
   </div>
   <div class="ads mt-5 mb-5">
     <div class="container">
        <div v-for="post in posts" :key="post">
          <PostAd :name="post.brand + ' ' + post.name + ' ' + post.variant"
                  :transmission="post.transmission"
                  :engine="post.engine_size"
                  :location="post.location"
                  :id="post.id"
                  :price="post.price"
                  :image_src="post.title_image"
                  :profile="false"/>
        </div>
     </div>
   </div>
 </div>
</template>

<script>
import PostAd from '../components/post-ad.vue';
import Navbar from '../components/navbar.vue';
import Modal from '../components/modal.vue';

export default {
  components: {PostAd,Navbar,Modal},
  data(){
    return {
        modalVisibility:false,
        modalMessage:'',
        modaldetail:'',
    }
  },
  computed: {
    posts(){
      return this.$store.getters.posts;
    },
  },

  created() {
    this.$store.dispatch('loadAdPosts');
    if(this.$store.getters.posts == false){
      this.toggleModalVisibility();
    }
  },
  methods: {
    toggleModalVisibility(){
        this.modalMessage = 'Server Not Responding'
        this.modaldetail = 'Please Come Back Later'
        this.modalVisibility =  true;
    }
  },
}
</script>
<style scoped>
.landing{
  background: linear-gradient(rgba(0, 0, 0, 0.603), rgba(0, 0, 0, 0.603)), url('../assets/main.jpg');
  background-size: 100% auto;
  min-height: 450px;
  display: flex;
  padding: 20px 40px;
  align-items: center;
  justify-content: center;
}
.landing h1, .landing h2, .landing h3{
  color: white;
  text-transform: capitalize;
  
}
.landing a{
  color: rgb(255, 251, 0);
  font-weight: bold;
  text-decoration: none;
}

.filters input, .filters select{
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-right: 20px;
  width: 22%;
  min-width: 250px;
  background: rgba(255, 255, 255, 0.356);
}
.ads{
  margin: 5% 15% !important;
}
.postAd{
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>