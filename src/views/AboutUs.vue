<template>
  <div>
      <Navbar/>
      <div class="container">
        <br><h3>About Us!</h3><br>
        <p>
          Welcome to <strong>AutoDeals.com</strong>, your number one source for used cars. We're dedicated to 
          giving you the very best of what we can, with a focus on three characteristics, ie: 
          dependability, customer service and uniqueness.
          Founded in 2021 by <strong>Farhan Khan</strong>, AutoDeals.com has come a long way from its 
          beginnings in a home office. When Farhan Khan first started out, his/her passion 
          for Cars drove him to action, ie: do intense 
          research, quit his day job, and gave him the impetus to turn hard work and 
          inspiration into to a booming online platform. We now serve customers all over 
          Pakistan, and are thrilled to be a part 
          of the fair trade wing of the industry.
          <br><br>
          We hope you enjoy our services as much as we enjoy offering them to you. If you have 
          any questions or comments, please don't hesitate to contact us.
          <br><br>
          Sincerely, <br>
          <strong>Farhan Khan</strong>, Founder &amp; CEO
        </p>
        <br><h3>Contact Us!</h3><br>
        <div class="contact">
          Reach us by filling form below: <br><br>
          <input type="text" placeholder="Your Name"><br>
          <textarea name="" id="" cols="" rows="10" placeholder="Your Message"></textarea><br>
          <button class="btn btn-warning">Send Message</button>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';
export default {
  components: {Navbar},

}
</script>

<style scoped>
p{
  width: 80%;
  margin: auto;
  text-align: center;
  font-size: 20px;
}
.contact{
  width: 50%;
  display: block;
  margin: auto;
  margin-bottom: 50px;
}
.contact input, .contact textarea{
  display: block;
  width: 100%;
  background: rgba(255, 255, 255, 0.349);
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
}
.contact button{
  margin: auto;
  display: block;
}
</style>