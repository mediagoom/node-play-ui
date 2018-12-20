<template>
  <div class="Uploader">
    <h1>Uploader</h1>

    <div ref="uploaderhost"/>
        
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.message">
        {{ error.message }}
      </li>
    </ul>
        
  </div>
</template>

<script>


import {build} from '@mediagoom/chunk-upload/lib/ui';

let upm = null;



export default {
    name: 'Uploader'
    , data () {
        return {
            // upm: new ChunkUpload()
            // ,
            errors: []
            , ids: []

        };
    }
    , created () {
        this.api = this.ioc('api');

        upm = build(this.$refs.uploaderhost,
            {'url': window.location.protocol + '//' + window.location.host + '/upload'
                , 'owner': 'uploader'});
        
        if(upm.vue_upload === undefined)
        {
            upm.on('new', (id) => {

                this.api.upload_id(id).then(server_id => {
                
                    let url = upm.uploader[id]._opt.url;
                    url += '/' + server_id;
                    upm.uploader[id]._opt.url = url;
                
                }).catch(e => {
                    this.errors.push(e);
                });

            });
        }

        upm.vue_upload = true;        

    }
    , mounted: function () {
             
        upm = build(this.$refs.uploaderhost,
            {'url': window.location.protocol + '//' + window.location.host + '/upload'
                , 'owner': 'uploader'});
                
      
    }
    , methods: {
 
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.Uploader
{
    max-width: 40em;
    margin: auto;
}


</style>
