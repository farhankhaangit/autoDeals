<template>
  <div class="modala">
      <div class="modal_body">
        <div class="modal_cont">
            <h4>{{message}}</h4>
            <p>{{detail}}</p>
            <button @click="accept">Yes</button>
            <button @click="close">No</button>
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
        },
        accept(){
            this.$parent.accepted()
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
.modal_cont button{
    border: none;
    font-weight: bold;
    color: yellow;
    background: black;
    border-radius: 10px;
    padding: 10px 20px;
    margin-right: 10px;
}
</style>