<template>
<div>
  <Navbar/>
   <div v-if="modalVisibility">
        <Modal :message="modalMessage" :detail="modaldetail"/>
    </div>
  <div class="container mb-5" v-if="this.adDetail">
      <div class="images caard">
        <h3><strong>Pictures:</strong></h3><br>
        <div class="view">
            <div style="height:500px; display:flex; align-items:center;">
              <img :src="`http://127.0.0.1:8000/storage/${image}`" alt="detail image" class="img-fluid">
            </div>
            <div class="sliderbtn">
              <button class="btn btn-primary" @click="prevImage()">Prev</button>
              <p>Image {{this.imageCounter+1}} of {{this.images.length}}</p>
              <button class="btn btn-primary" @click="nextImage()">Next</button>
            </div>
        </div>
      </div>
      <div class="title mt-5 mb-4">
        <h6>Posted By: {{this.adDetail.posted_by}}</h6>
        <h1>{{this.adDetail.brand+' '+this.adDetail.name+' '}} <span style="text-transform: uppercase">{{this.adDetail.variant}}</span></h1>
        <h6>Posted: {{this.adDetail.created_at}}</h6>
      </div>
      <div class="specs caard row">
          <h3><strong>Car Specifications:</strong></h3><br>
          <div class="specs_details mt-4">
                <div class="block">
                <h5>Model Year</h5>
                <p>{{this.adDetail.model}}</p>
              </div>
              <div class="block">
                <h5>Assembly</h5>
                <p>{{this.adDetail.assembly}}</p>
              </div>
              <div class="block">
                <h5>Engine Size</h5>
                <p>{{this.adDetail.engine_size}}</p>
              </div>
              <div class="block">
                <h5>Color</h5>
                <p>{{this.adDetail.color}}</p>
              </div>
              <div class="block">
                <h5>Fuel Type</h5>
                <p>{{this.adDetail.fuel_type}}</p>
              </div>
              <div class="block">
                <h5>Transmission</h5>
                <p>{{this.adDetail.transmission}}</p>
              </div>
              <div class="block">
                <h5>Milage</h5>
                <p>{{this.adDetail.milage}} KMs</p>
              </div>
              <div class="block">
                <h5>Registration City</h5>
                <p>{{this.adDetail.registration_city}}</p>
              </div>
              <div class="block">
                <h5>Location</h5>
                <p>{{this.adDetail.location}}</p>
              </div>
              <div class="block">
                <h5>Contact</h5>
                <p>{{this.adDetail.contact}}</p>
              </div>
              <div class="block">
                <h5>Price</h5>
                <p>Rs {{this.adDetail.Price}}/-</p>
              </div>
          </div>
      </div>

      <div class="specs caard mt-5">
          <h3><strong>Car Features:</strong></h3><br>
          <div class="specs_details">
              <div class="block" v-for="feature in features" :key="feature">
                <p>{{feature}}</p>
              </div>
          </div>
      </div>
      <div class="caard disc mt-5">
        <h3><strong>Seller's Comments:</strong></h3><br>
        <pre>{{this.adDetail.discription}}

          <strong>Please Mention AutoDeals.com while Calling Seller,
          Thank you.</strong>
        </pre>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/navbar.vue';
import Modal from '../components/modal.vue';
export default {
  components: {Navbar,Modal},
  data(){
    return{
      adDetail: null,
      modalVisibility:false,
      modalMessage:'',
      modaldetail:'',
      features: [],
      images: [],
      image: null,
      imageCounter: 0
    }
  },
  methods: {
    showModal(){
      this.modalVisibility =  true;
    },
    toggleModalVisibility(){
      this.modalVisibility =  false;
      this.$router.back()
    },
    setDisplayImage(){
      this.image = this.images[0]
    },
    nextImage(){
      this.imageCounter++
      if(this.imageCounter<this.images.length){
        this.image = this.images[this.imageCounter]
      }
      else{
        this.imageCounter = 0
        this.image = this.images[this.imageCounter]
      }
    },
    prevImage(){
      this.imageCounter--
      if(this.imageCounter<0){
        this.imageCounter = this.images.length-1
        this.image = this.images[this.imageCounter]
      }
      else{
        this.image = this.images[this.imageCounter]
      }
    }
  },
  mounted() {
      axios.get(`http://127.0.0.1:8000/api/ad-detail/${this.$route.params.id}`)
      .then( response =>{
        if(response.data.status == true){
          this.adDetail = response.data
          this.features = this.adDetail.features
          this.images.push([this.adDetail.title_image])
          this.images = this.images.concat(this.adDetail.images)
          this.setDisplayImage()
        }
        else{
          this.modalMessage = response.data.message
          this.modaldetail = 'fdfzgfx'
          this.showModal()
        }
      }).catch(error => {
      this.modalMessage = 'Error'
      this.modaldetail = 'Cannot Fetch Detail'
      this.showModal()
    })
  },
}

</script>

<style scoped>
  h1{
    text-transform: capitalize;
    font-weight: bold;
  }
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .specs span{
    float: right;
  }
  .caard{
    background: white;
    border-radius: 20px;
    padding: 20px 40px;
  }
  .block{
    text-align: center;
    width: 25%;
  }
  .specs_details{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .images img{
    display: block;
    margin: auto;
    max-height: 500px;
  }
  .sliderbtn{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }
</style>