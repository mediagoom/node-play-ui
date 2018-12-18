<template>
  <div class="Assets">
    <h3>Media</h3>

    <div v-if="assets && assets.length" class="assets_body">
      <div is="Media" 
           v-for="(a, idx) of assets" 
           :key="a.mediaid" 
           :mediaid="a.id" 
           :idx="idx" 
           :filter="filter"
      />
    </div>
        

    <Uploader v-if="!assets.length && filter=='ok'"/>


    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.message" >
        {{ error.message }}
      </li>
    </ul>
        
  </div>
</template>

<script>

import axios from 'axios';
import Media from '../components/Media.vue';
import Uploader from '../pages/Uploader.vue';

export default {
    name: 'Assets'
    , components: {'Media': Media, 'Uploader': Uploader}

    // Fetches assets when the component is created.
    , props: ['filter']
    , data () {
        return {
            assets: []
            , errors: []
        };
    }
    , created () {
        axios.get('/api/list')
            .then(response => {
                // JSON responses are automatically parsed.
                this.assets = response.data.assets;
                // alert(JSON.stringify(this.assets));
            })
            .catch(e => {
                this.errors.push(e);
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.assets_body
{
  display: flex;
  max-width: 60em;
  margin: auto;
  flex-wrap: wrap; 
}
</style>
