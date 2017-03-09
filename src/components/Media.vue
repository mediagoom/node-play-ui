<template>
    <div class="Media">
        <h1>Media -{{mediaid}}-</h1>
       
                <p>{{idx}}</p>
                <p><strong>{{status}}</strong></p>
                <p>{{owner}}</p>
        

          <ul v-if="errors && errors.length">
            <li v-for="error of errors">
              {{error.message}}
            </li>
          </ul>
        
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Media'
  , props: ['mediaid']
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
                    , idx: null
    }
  }
   // Fetches assets when the component is created.
   , created () {
       // axios.get(`/api/status/$(this.mediaid)`)
        axios.get('/api/status/' + this.mediaid)
    .then(response => {
      // JSON responses are automatically parsed.
      this.status = response.data.status;
      this.dash = response.data.dash;
      this.hls3 = response.data.hls3;
      this.thumb = response.data.thumb;
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
