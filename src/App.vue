<template>
  <div id="app">
    
    <img id="logo" src="./assets/logo.svg">
    <div>
      <router-link to="/">Home</router-link> | 
      <router-link to="/uploader">Uploader</router-link> |
      <router-link to="/working">Working</router-link>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
};

</script>

<style lang="scss">
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

a {
    color: #42b983;
    text-decoration:none;
}
</style>
