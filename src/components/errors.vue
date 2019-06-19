<template>

  <ul v-if="errors && errors.length">
    <li v-for="error of errors" :key="error.message" >
      
      <span v-if="error.response.data.msg">{{ error.response.data.msg }}</span>
      <span v-if="!error.response.data.msg">{{ error.message }}</span>
     
    </li>
  </ul>

</template>

<script>




export default {
    name: 'Errors'
    , props: ['errors']
    , data () {
        return {};        
    }
    // Fetches assets when the component is created.
    , computed: {
       
    }, created () {
        
    }
    ,

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>