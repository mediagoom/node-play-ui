<template>
    <div class="Assets">
        <h3>Media</h3>
        <div v-if="assets && assets.length">
            <div v-for="(a, idx) of assets" 
                is="Media" 
                v-bind:key="a.mediaid" 
                v-bind:mediaid="a.id" 
                v-bind:idx="idx" 
                v-bind:filter="filter"
            >
            </div>
        </div>

        <Uploader v-if="!assets.length && filter=='ok'">
        </Uploader>


          <ul v-if="errors && errors.length">
            <li v-for="error of errors">
              {{error.message}}
            </li>
          </ul>
        
    </div>
</template>

<script>

import axios from 'axios';
import Media from './Media.vue';
import Uploader from './Uploader.vue';

export default {
  name: 'Assets'
  , props: ['filter']
  , data () {
    return {
          assets: []
        , errors: []
    }
  }
  , components: {'Media': Media, 'Uploader': Uploader}

   // Fetches assets when the component is created.
   , created () {
    axios.get(`/api/list`)
    .then(response => {
      // JSON responses are automatically parsed.
       this.assets = response.data.assets;
       // alert(JSON.stringify(this.assets));
    })
    .catch(e => {
      this.errors.push(e);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
