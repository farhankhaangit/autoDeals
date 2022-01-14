<template>
  <div>
      <Navbar/>
    <div v-if="modalVisibility">
        <Modal :message="modalMessage" :detail="modaldetail"/>
    </div>
    <div v-if="modal2Visibility">
        <Modal2 :message="modalMessage" :detail="modaldetail"/>
    </div>
      <div class="container mb-5">
        <div class="fields row mb-5">
          <h3>Enter Your Car Details Below:</h3>
          <h4>Specifications:</h4>
          <div class="col-lg-4">
            <label for="brand">Make:</label>
            <select name="brand" id="" v-model="brand">
              <option>Toyota</option>
              <option>Honda</option>
              <option>KIA</option>
              <option>Suzuki</option>
              <option>Changan</option>
              <option>Hyundai</option>
              <option>Proton</option>
              <option>MG</option>
              <option>DFSK</option>
              <option>Prince</option>
              <option>Mazda</option>
              <option>Mitsubishi</option>
              <option>Audi</option>
              <option>Mercedes</option>
              <option>BMW</option>
              <option>Porsche</option>
              <option>Ford</option>
              <option>Nissan</option>
              <option>HAVAL</option>
              <option>Cherry</option>
              <option>Chevrolet</option>
              <option>Peogeot</option>
              <option>FAW</option>
              <option>Isuzu</option>
              <option>United</option>
            </select>
            <label for="name">Name:</label>
            <input type="text" name="name" placeholder="e.g: Corolla, Cultus" v-model="name">
            <label for="varient">Variant:</label>
            <input type="text" name="varient" placeholder="e.g: oriel, grande" v-model="variant">
            <label for="model">Model Year:</label>
            <input type="text" name="model" placeholder="e.g: 2013" v-model="model">
            <label for="assembly">Assembly:</label>
            <select name="assembly" id="" v-model="assembly">
              <option>Local</option>
              <option>Imported</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label for="engine">Engine Size:</label>
            <input type="text" name="engine" placeholder="e.g: 1500, leave empty if electric" v-model="engine">
            <label for="color">Color:</label>
            <input type="text" name="color" placeholder="e.g: black" v-model="color">
            <label for="type">Fuel Type:</label>
            <select name="type" id="" v-model="fuel">
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Petrol Hybrid</option>
              <option>Diesel Hybrid</option>
              <option>Plug in Hybrid</option>
              <option>Electric</option>
            </select>
            <label for="transmission">Transmission:</label>
            <select name="transmission" id="" v-model="transmission">
              <option>Manual</option>
              <option>Automatic</option>
              <option>CVT</option>
              <option>DCT</option>
              <option>AMT (AGS)</option>
              <option>iMT</option>
            </select>
            <label for="milage">Milage:</label>
            <input type="text" name="milage" placeholder="kilometers driven" v-model="milage">
          </div>
          <div class="col-lg-4">
            <label for="regCity">Registration City:</label>
            <input type="text" name="regCity" placeholder="e.g: lahore, islamabad" v-model="registration">
            <label for="contact">Contact Number:</label>
            <input type="text" name="contact" placeholder="e.g: active phone number" v-model="contact">
            <label for="location">Location:</label>
            <input type="text" name="location" placeholder="e.g: city and town name" v-model="location">
            <label for="price">Price:</label>
            <input type="text" name="price" placeholder="e.g: put a reasonable price" v-model="price">
          </div>
        </div>
        <h4>Features:</h4>
        <div class="checkboxes row mb-5">
          <div class="col-lg-3">
            <input type="checkbox" name="acc" value="Air Conditioner" @change="addFeature">
            <label for="acc">Air Conditioner</label><br>
            <input type="checkbox" name="abc" value="Air Bags" @change="addFeature">
            <label for="abc">Air Bags</label><br>
            <input type="checkbox" name="awc" value="Alloy Wheels" @change="addFeature">
            <label for="awc">Alloy Wheels</label><br>
            <input type="checkbox" name="clc" value="Central Locking" @change="addFeature">
            <label for="clc">Central Locking</label><br>
            <input type="checkbox" name="ccc" value="Cruise Control" @change="addFeature">
            <label for="ccc">Cruise Control</label><br>
            <input type="checkbox" name="klc" value="Key Less Entry" @change="addFeature">
            <label for="klc">Key Less Entry</label><br>
            <input type="checkbox" name="klc" value="Adjustable Steering" @change="addFeature">
            <label for="klc">Adjustable Steering</label><br>
          </div>
          <div class="col-lg-3">
            <input type="checkbox" name="imb" value="Immobilizer" @change="addFeature">
            <label for="imb">Immobilizer</label><br>
            <input type="checkbox" name="fgl" value="Fog Lights" @change="addFeature">
            <label for="fgl">Fog Lights</label><br>
            <input type="checkbox" name="psr" value="Parking Sensors" @change="addFeature">
            <label for="psr">Parking Sensors</label><br>
            <input type="checkbox" name="dfg" value="Defogger" @change="addFeature">
            <label for="dfg">Defogger</label><br>
            <input type="checkbox" name="htr" value="Heater" @change="addFeature">
            <label for="htr">Heater</label><br>
            <input type="checkbox" name="lcd" value="LCD Infotainment" @change="addFeature">
            <label for="lcd">LCD Infotainment</label><br>
            <input type="checkbox" name="adl" value="Adjustable Headlights" @change="addFeature">
            <label for="adl">Adjustable Headlights</label><br>
          </div>
          <div class="col-lg-3">
            <input type="checkbox" name="cob" value="Cool Box" @change="addFeature">
            <label for="cob">Cool Box</label><br>
            <input type="checkbox" name="armr" value="Arm Rest" @change="addFeature">
            <label for="armr">Arm Rest</label><br>
            <input type="checkbox" name="has" value="Height Adjustible Seats" @change="addFeature">
            <label for="has">Height Adjustible Seats</label><br>
            <input type="checkbox" name="pstg" value="Power Steering" @change="addFeature">
            <label for="pstg">Power Steering</label><br>
            <input type="checkbox" name="pwd" value="Power Windows" @change="addFeature">
            <label for="pwd">Power Windows</label><br>
            <input type="checkbox" name="pmr" value="Power Mirrors" @change="addFeature">
            <label for="pmr">Power Mirrors</label><br>
          </div>
          <div class="col-lg-3">
            <input type="checkbox" name="rtm" value="Retractable Mirrors" @change="addFeature">
            <label for="rtm">Retractable Mirrors</label><br>
            <input type="checkbox" name="psts" value="Power Seats" @change="addFeature">
            <label for="psts">Power Seats</label><br>
            <input type="checkbox" name="stcl" value="Steering Controls" @change="addFeature">
            <label for="stcl">Steering Controls</label><br>
            <input type="checkbox" name="racv" value="Rear AC Vents" @change="addFeature">
            <label for="racv">Rear AC Vents</label><br>
            <input type="checkbox" name="absb" value="ABS" @change="addFeature">
            <label for="absb">ABS</label><br>
            <input type="checkbox" name="trcn" value="Traction Control" @change="addFeature">
            <label for="trcn">Traction Control</label><br>
          </div>
        </div>
        <div class="mb-5">
          <h4>Comments:</h4><br>
          <textarea rows="5" placeholder="Any other details...." v-model="discription"></textarea>
        </div>
        <div class="mb-5">
          <h4>Add Title Image:</h4>
          <input type="file" ref="title_image" @change="getTitleImage" accept="image/jpg,image/png,image/jpeg"><br><br>
          <h4>Add Other Images:</h4>
          <input type="file" multiple ref="other_images" @change="getOtherImages" accept="image/jpg,image/png,image/jpeg">
        </div>
        <div class="mb-5 text-center">
          <button class="btn btn-warning" @click="done"><strong>Upload</strong></button>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '../components/navbar.vue';
import Modal from '../components/modal.vue';
import Modal2 from '../components/modal2.vue';
export default {
  components: {Navbar,Modal,Modal2},
  data(){
    return{
      brand: null, name: null, variant: null, model: null, assembly: null, engine: null, color: null,
      fuel: null, transmission: null, milage: null, registration: null, contact: null, location: null,
      price: null, posted_by: null, title_image: null, other_images: null , discription: null, features:[],
      
      modalVisibility:false,
      modal2Visibility:false,
      modalMessage:'',
      modaldetail:'',
    }
  },
  mounted() {
    this.$store.commit('loadToken')
    if(!this.$store.getters.loginToken){
      this.$router.push('login');
    }
    else {
      this.$store.commit('storeUser')
      this.posted_by = this.$store.getters.loggedUser.username
    }
  },
  methods: {
    postAd(){
      let formData = new FormData();

      if(this.title_image) formData.append('title_Image', this.title_image);
      if(this.brand) formData.append('brand', this.brand);
      if(this.posted_by) formData.append('posted_by', this.posted_by);
      if(this.name) formData.append('name', this.name);
      if(this.variant) formData.append('variant', this.variant);
      if(this.model) formData.append('model', this.model);
      if(this.assembly) formData.append('assembly', this.assembly);
      if(this.engine) formData.append('engine', this.engine);
      if(this.color) formData.append('color', this.color);
      if(this.fuel) formData.append('fuel', this.fuel);
      if(this.transmission) formData.append('transmission', this.transmission);
      if(this.milage) formData.append('milage', this.milage);
      if(this.registration) formData.append('registration', this.registration);
      if(this.contact) formData.append('contact', this.contact);
      if(this.location) formData.append('location', this.location);
      if(this.price) formData.append('price', this.price);
      if(this.discription) formData.append('discription', this.discription);

      if(this.other_images) {
        for( var i = 0; i < this.other_images.length; i++ ){
          let image = this.other_images[i];
          formData.append('other_images[' + i + ']', image);
        }
      }
      formData.append('features', this.features);
      
      axios.post('http://127.0.0.1:8000/api/save-ad',
      formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then(response =>{
        if(response.data.status == false){
          this.modalMessage = 'Failed'
          this.modaldetail = response.data.message[0]
          this.showModal()
        }
        if(response.data.status == true){
          this.modalMessage = 'Success'
          this.modaldetail = response.data.message
          this.showModal()
        }
      }).catch(err=>{
          this.modalMessage = 'Error Occured'
          this.modaldetail = err.message
          this.showModal()
      });
    },
    getTitleImage(){
      this.title_image = this.$refs.title_image.files[0]
    },
    getOtherImages(){
      this.other_images = this.$refs.other_images.files
    },
    toggleModalVisibility(){
        this.modalVisibility =  false
        this.modal2Visibility =  false
        if(this.modalMessage == 'Success'){
          this.$router.push('/')
        }
    },
    accepted(){
      this.modal2Visibility =  false
      this.postAd()
    },  
    done(){
      this.modalMessage = 'Are You Sure?'
      this.modaldetail = 'You will not be able to make changes!'
      this.modal2Visibility =  true
    },
    showModal(){
      this.modalVisibility =  true
    },
    addFeature(e){
      if(this.features.includes(e.target.value)){
        this.features.splice(this.features.indexOf(e.target.value),1)
      } else {
        this.features.push(e.target.value)
      }
    }
  },
}
</script>

<style scoped>
  .fields input, .fields select{
        display: block;
        border: none;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        padding: 5px 20px;
        margin-bottom: 20px;
        width: 90%;
        background-color: rgba(255, 255, 255, 0.397);
    }
    h4{
      margin-bottom: 20px;
    }
    .checkboxes input{
      margin-right: 10px;
    }
    textarea{
      display: block;
      width: 90%;
      margin: auto;
      border-radius: 20px;
      color: rgb(0, 0, 0);
      padding: 20px;
      margin-bottom: 20px;
      border: none;
      background-color: rgba(255, 255, 255, 0.397);
    }
</style>