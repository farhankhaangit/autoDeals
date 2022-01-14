<template>
  <div class="modala">
      <div class="modal_body">
        <div class="modal_cont">
            <h4>{{message}}</h4>
            <p>{{detail}}</p>
            <button @click="close" class="btn btn-primary fw-bold">OK</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['message','detail'],
    methods: {
        close(){
            this.$parent.toggleModalVisibility()
        }
    },
}
</script>

<style scoped>
.modala{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.534);
    z-index: 99;
    top: 0;
}
.modal_body{
    width: 250px;
    height: 220px;
    border-radius: 20px;
    background: white;
    text-align: center;
    display: flex;
    align-items: center;
}
.modal_cont{
    width: 80%;
    margin: auto;
}
</style>