<template>
    <div class="Play">
        <h3>Play {{name}}</h3>
        <div class="playbody">
                <div id="playerhost"></div>
        </div>
          <ul v-if="errors && errors.length">
            <li v-for="error of errors">
              {{error.message}}
            </li>
          </ul>
        
    </div>
</template>

<script>

import axios from 'axios';
import Mgplay from 'mgplay';

let mgp = new Mgplay();

export default {
    name: 'Play'
  , props: ['mediaid', 'idx']
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
                        alert(this.dash);
                }
    }
  }
   // Fetches assets when the component is created.
   , created () {
       // axios.get(`/api/status/$(this.mediaid)`)
        axios.get('/api/status/' + this.$route.params.id)
    .then(response => {
      // JSON responses are automatically parsed.
      this.status = response.data.status;
      this.owner = response.data.owner;
      this.dash = response.data.dash;
      this.hls3 = response.data.hls3;
      this.thumb = response.data.thumb;
      this.id = response.data.id;
      this.name = response.data.name;

      mgp.play(window.location.protocol + '//' + window.location.host + '/play/' + this.owner + '/' + this.id + '/', response.data);

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

.playbody
{
    margin-left: 2em;
    margin-right: 2em;
}
</style>
