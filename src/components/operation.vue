<template>
    <div :class="classlook">-{{operation.name}} {{operation.modified}}</div>
</template>

<script>

export default {
    name: 'Operation'
  , props: ['operation', 'position']
  , data () {
        return {status: null
                    
                }
    }
   
   , created () {
      
    }
  
    , computed: {
        classlook () {
            if(this.operation)
                return this.operation.succeeded.toString() + '-' + this.operation.completed.toString(); 
            
            return "nope";
        }
    }
}
</script>


<style scoped lang="scss">
.true-true
{
    background-color: greenyellow;
}

.false-false
{
    background-color: cornflowerblue;
}

.false-true
{
    background-color: lightcoral;
}

</style>