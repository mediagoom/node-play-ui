<template>
    <div class="Uploader">
        <h1>Uploader</h1>

        <div class="lead" v-on:click="openselect">
        
            

                <img src="../assets/upload-folder-icon.svg" class="uploadimg"/>
                <div class="select">&nbsp; Select Files &nbsp; >> </div>

                
       
        </div>
        
        <p>- OR -</p>
        <div class="usize drag">
            <input id="file_input" multiple type="file" v-on:change='selectFiles' class='uploader usize' />
            <p class="dragtext">drag and drop them here.</p>
        </div>

        <ul v-if="ids.length" id="example-1">
          <li v-for="id in ids">
          <p>{{ id.id }}</p>
          <p>{{ id.status }}</p>
          <p>{{ id.perc }}</p>
          <a v-if="id.status=='paused'" v-on:click='resumeUpload(id.idx)'>start</a>
          <a v-if="id.status=='running'" v-on:click='pauseUpload(id.idx)'>pause</a>
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


import {UploadManager} from '@mediagoom/chunk-upload/lib';
import axios from 'axios';

let upm = null;

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
      upm = new UploadManager();

      console.log('NEW UPLOADMANAGER');

     upm.setOptions({'url': window.location.protocol + '//' + window.location.host + '/upload'
        , 'owner': 'uploader'});

      upm.on('new', (id) => {
        axios.get('/api/upload/' + id).then(response => {
        // JSON responses are automatically parsed.
        let serverid = response.data.id;

        let url = upm.uploader[id]._opt.url;
            url += '/' + serverid;
            upm.uploader[id]._opt.url = url;

        let idx = this.ids.length;

        upm.uploader[id]._opt.tag = idx;

        this.ids.push({id: id, status: 'paused', serverid: serverid, idx: idx, perc: 0});
        }).catch(e => {
            this.errors.push(e);
        })
     });

     upm.on('progress', (sn, id) => {
         let idx = upm.uploader[id]._opt.tag;
         this.ids[idx].perc = sn;
     });

     upm.on('completed', (id) => {
         let idx = upm.uploader[id]._opt.tag;
         this.ids[idx].perc = '100';
         this.ids[idx].status = 'compleated'
     });
    }
    , methods: {
       openselect: function (event) {
           let el = document.getElementById('file_input');
               el.click();
       }
       , selectFiles: function (event) {
           upm.selectFiles(event.target);
       }
       , resumeUpload: function (idx) {
           let id = this.ids[idx].id;

           upm.uploader[id].resume();

           this.ids[idx].status = 'running';
       }
       , pauseUpload: function (idx) {
           let id = this.ids[idx].id;

           upm.uploader[id].pause();

           this.ids[idx].status = 'paused';
       }

  }

}
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
    text-decoration:none;
}

.uploader{
    opacity: 0;
    width:100%;
    height: auto;
    position: absolute;
    border: 3px solid;
    left:0px;
}

.usize{
    height: 8em;
}

.drag
{    
    background-color: rgba(64, 170, 107, 0.30);
    margin-left: auto;
    margin-right: auto;
    width:80%;
    border-radius: 4px;
    position: relative;
    min-width:12.8em;
   
}

.dragtext
{
    position: relative;
    top: 2em;
    color: #42b983;
}

.lead
{
    border: 1px solid;
    border-radius: 4px;
    border-color: black;
    margin-left: auto;
    margin-right: auto;
    width:12em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 0.2em;
    padding-right: 0.2em;
    cursor: pointer;

}

.uploadimg
{
    width: 1.6em;
   
   
}

.select
{
    display:inline;
    top: -0.3em;
    position: relative;
   
}

</style>
