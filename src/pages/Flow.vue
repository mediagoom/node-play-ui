<template>
<div class="flows">
    <h2>Flow Status {{id}}</h2>
    <div class="flow">
        <div v-if="flow && flow.length">
            <div v-for="(a, idx) of flow" 
                is="Operation" 
                v-bind:key="a.id" 
                v-bind:operation="a" 
                v-bind:position="idx"
                v-bind:mediaid="mediaid"
            >
            </div>
       
       
    </div>
    </div>
</div>
</template>
<script>

import axios from 'axios';
import operattion from '../components/operation.vue';


export default {
    name: 'Flow'
  
  , data () {
        return {
            id : null
            , flow: null
    }
  }
  , components: {'Operation': operattion}
   // Fetches assets when the component is created.
   , created () {
        
        
        
        this.id = this.$route.params.id; 
        axios.get('/api/queue/' + this.$route.params.id)
        .then(response => {
        // JSON responses are automatically parsed.
        let flow = response.data;
        if(null != flow)
        {
            this.flow = flow.sort((a, b) =>{
                if(null === a.modified)
                {
                    if(null === b.modified)
                        return 0;

                    return 1;
                }else
                {
                    if(null === b.modified)
                        return -1;

                    if(a.modified > b.modified)
                        return 1;
                    else
                        return -1;
                }

                return 0;
            });
        }
        
        })
        .catch(e => {
        this.errors.push(e);
        })
  }
  , computed:
  {
      mediaid(){return this.$route.params.id;}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

%flow
{
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.flows
{
    @extend %flow;
    flex-direction: column;
}

.flow
{
    //max-width: 50%;
    @extend %flow;
}

</style>
