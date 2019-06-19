<template>
  <div class="flows">
    <h2>Flow Status {{ id }}</h2>
    <div class="flow">
      <div v-if="flow && flow.length">
        <div is="Operation" 
             v-for="(a, idx) of flow" 
             :key="a.id" 
             :operation="a" 
             :position="idx"
             :mediaid="mediaid"
        />
       
      </div>
    </div>

    <Errors :errors="errors"/>

  </div>
</template>
<script>

import axios from 'axios';
import operation from '../components/operation.vue';
import errors from '../components/errors.vue';

export default {
    name: 'Flow'
  
    , components: {'Operation': operation, 'Errors': errors}
    // Fetches assets when the component is created.
    , data () {
        return {
            id : null
            , flow: null
            , errors: []
        };
    }
    , computed:
  {
      mediaid(){return this.$route.params.id;}
  }, created () {
        
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

                        
                    });
                }
        
            })
            .catch(e => {
                this.errors.push(e);
            });
    }
    ,
};
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
