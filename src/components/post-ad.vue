<template>
<div>
  <div class="post">
      <button v-if="profile" @click="confirm">Delete?</button>
      <div class="row">
          <div class="col-xl-4 col-md-4 col-lg-4">
              <img :src="`http://127.0.0.1:8000/storage/${image_src}`" alt="post-image" class="img-fluid">
          </div>
          <div class="col-xl-8 col-md-8 col-lg-8">
              <h3><strong><router-link :to="`/ad-detail/${id}`">{{name}}</router-link><span style="float:right">Rs {{price}}/-</span></strong></h3><br>
              <h5><strong>Transmission</strong> <span style="float:right">{{transmission}}</span></h5>
              <h5><strong>Engine Size</strong> <span style="float:right">{{engine}}</span></h5>
              <h5><strong>Location</strong> <span style="float:right">{{location}}</span></h5>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import Modal from '../components/modal.vue';
import Modal2 from '../components/modal2.vue';
export default {
 props: ['name','transmission','engine','location','id','image_src','price','profile'],
  components: {Modal,Modal2},
    methods: {
        confirm(){
            this.$parent.deleteRequest(this.id)
        },
    },
}
</script>

<style scoped>
    .post{
        background: rgba(255, 255, 255, 0.39);
        border-radius: 20px;
        margin-bottom: 20px;
        padding: 20px;
        max-height: 250px;
        position: relative;
    }
    .post img{
        display: block;
        margin: auto;
        max-height: 210px;
    }
    .post h5{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .post h3{
        text-transform: capitalize;
    }
    .post a{
        text-decoration: none;
        color: black;
    }
    .post button{
        position: absolute;
        top: 25px;
        right: -100px;
        background: none;
        border: none;
        font-weight: bold;
    }
</style>