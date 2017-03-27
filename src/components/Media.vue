<template>
    <div v-if="(status=='ok' && filter=='ok') || (status!='ok' && filter=='working') " class="media">
        <h3>{{name}}</h3>

        <p v-if="filter!='ok'">{{id}} - {{status}}</p>
                      
        <img v-if="thumb && thumb.length" :src="imgurl" class="pthumb"/>
        <img v-if="dash || hls3" v-on:click="play()" class="picon" src="../assets/play-icon.png"/> 


          <ul v-if="errors && errors.length">
            <li v-for="error of errors">
              {{error.message}}
            </li>
          </ul>
        
    </div>
</template>

<script>

import axios from 'axios';
import router from '../router';
import config from './config';

export default {
    name: 'Media'
  , props: ['mediaid', 'idx', 'filter']
  , data () {
    return {status: null
                    , name: null
                    , id: null
                    , owner: null
                    , hls3: null
                    , dash: null
                    , thumb: []
                    , hls4: null
                    , playready: null
                    , widevine: null
                    , errors: []
                    , play () {
                        router.push({name: 'Play', params: { id: this.mediaid }})
                }
    }
  }
   // Fetches assets when the component is created.
   , created () {
       // axios.get(`/api/status/$(this.mediaid)`)
        axios.get('/api/status/' + this.mediaid)
    .then(response => {
      // JSON responses are automatically parsed.
      this.status = response.data.status;
      this.owner = response.data.owner;
      this.dash = response.data.dash;
      this.hls3 = response.data.hls3;
      this.thumb = response.data.thumb;
      this.name = response.data.name;
      this.id = this.mediaid;
       // alert(JSON.stringify(this.assets));
    })
    .catch(e => {
      this.errors.push(e);
    })
  }
  , computed: {
      imgurl: function () { return config.asset_root + '/' + this.owner + '/' + this.id + '/' + this.thumb[1]; }
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

.media {
    position: relative;
    width: 15em;
    margin-left: auto;
    margin-right: auto;
    
}

.pthumb {
    width: 15em;
    position: relative;
    z-index: 0;
}

.picon
{
    width: 4em;
    left: 5.6em;
    bottom: 2.2em;
    position: absolute;
    cursor: pointer;
    z-index: 1;
}
</style>
