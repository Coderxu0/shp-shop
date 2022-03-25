<template>
  <div id="body">
    <h2 class="title">商品正在运来的路上，快去去看看其他商品吧~   <button class="btn" @click="goback">走 你</button></h2>
    
  </div>
</template>

<script>
export default {
  methods:{
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
 #body{
   height: 50vh;
   position: relative;
 }
 .title{
   color:rgb(148, 146, 144);
   position:absolute;
   top:50%;
   left:50%;
 }
 .btn{
   color:white;
   right:10%;
   width: 60px;
   height: 40px;
   background-color: rgb(231, 92, 74);
   border: 0;
   border-radius: 10%;
   margin-left: 50px;
 }
</style>