<template>
<div id="app">
    
    <img src="./assets/logo.svg" id="logo">
    <div>
        <router-link to="/">Home</router-link> | 
        <router-link to="/uploader">Uploader</router-link> |
        <router-link to="/working">Working</router-link>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1em;
}

#logo {
    width: 5em;
    margin-bottom: 0.2em;
}
</style>
