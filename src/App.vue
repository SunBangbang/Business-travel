<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.top-nav{
  padding-top:10px
}
.content{
  margin-top:60px
}
#home{
  height:auto;
  overflow:hidden;
  max-width:40rem;
  margin:0 auto
}
.commonstyle{
  padding:0 15px;
  height:46px;
  background-color:#fff;
  -webkit-box-pack:justify;
  -ms-flex-pack:justify;
  justify-content:space-between
}
.commonstyle,.commonstyle .commonstyletitle{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -ms-flex-align:center;
  align-items:center
}
.commonstyle .commonstyletitle .commonstyletitlefont{
  padding-left:10px;
  font-size:14px
}
</style>
