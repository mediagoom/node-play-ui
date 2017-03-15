<template>
    <div class="Uploader">
        <h1>Uploader</h1>

        <input id="file_input" multiple type="file" v-on:change='selectFiles' />

        <ul v-if="ids.length" id="example-1">
          <li v-for="id in ids">
          {{ id.idx }}
          <p>{{ id.status }}</p>
          <p>{{ id.serverid }}</p>
          <a v-on:click='resumeUpload(id.idx)'>start</a>
          </li>
        </ul>
        


          <ul v-if="errors && errors.length">
            <li v-for="error of errors">
              {{error.message}}
            </li>
          </ul>
        
    </div>
</template>

<script>

import {UploadManager} from 'chunk-upload';
import axios from 'axios';

let upm = new UploadManager();

    upm.setOptions({'url': window.location.protocol + '//' + window.location.host + '/upload'
    , 'owner': 'uploader'});

export default {
  name: 'Uploader'
  , data () {
      return {
         // upm: new ChunkUpload()
         // ,
         errors: []
         , ids: []

    }
  }
  , created () {
      upm.on('new', (id) => {
        axios.get('/api/upload/' + id).then(response => {
        // JSON responses are automatically parsed.
        let serverid = response.data.id;

        let url = upm.uploader[id]._opt.url;
            url += '/' + serverid;
            upm.uploader[id]._opt.url = url;

        let idx = this.ids.length;

        this.ids.push({id: id, status: 'paused', serverid: serverid, idx: idx});
        }).catch(e => {
            this.errors.push(e);
        })
      });
    }
    , methods: {
       selectFiles: function (event) {
           upm.selectFiles(event.target);
       }
       , resumeUpload: function (idx) {
           let id = this.ids[idx].id;

           upm.uploader[id].resume();

           this.ids[idx].status = 'running';
       }

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
