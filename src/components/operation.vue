<template>
  <div :class="classlook" >
        
    <div class="operation_head">
      <div/>
      <div class="operation_name" v-on:click="toggle_detail()">{{ operation.name }}</div>
      <div v-if="(!operation.succeeded) && operation.completed" class="command redo" v-on:click="redo()"/>
      <div v-if="operation.succeeded || (!operation.completed)" class="command" />
    </div>

    <div :class="classdetail">
          
      <div v-for="(a) of Object.keys(operation)"
           :key="a">
        <span v-if="a != 'propertyBag'"> {{ a }} {{ operation[a] }}</span>
      </div>

          
    </div>

  </div>
</template>

<script>

export default {
    name: 'Operation'
    , props: ['operation', 'position', 'mediaid']
    , data () {
        return {
            status: null
            , detail : false
            , toggle_detail(){ this.detail = !this.detail;}
            , redo()
            {
                this.operation.completed = false;
                this.api.redo(this.mediaid, this.operation.id).then(() => {  }).catch(err => { alert(err.message); } );
            }
        };
    }
   
    , computed: {
        classlook () {
            const time = new Date();

            if(this.operation)
                if(null == this.operation.lease_time || this.operation.lease_time < time)
                    return 'look ' + this.operation.succeeded.toString() + '-' + this.operation.completed.toString(); 
                else
                    return 'look leasetime';
            
            return 'nope';
        }
        , classdetail ()
        {
            if(this.detail)
                return 'opedetails';
            else
                return 'hidden opedetails';
        }
    }, created () {
        this.api = this.ioc('api');
    }
  
    ,
};
</script>


<style scoped lang="scss">

.look
{
    border: 0.07em solid;
    border-radius: 0.2em;
    border-color: $text-color;

    margin-bottom: 0.3em;

    display: flex;
    flex-direction: column;

    
}

.operation_head
{
    display: flex;
}

%click
{
    cursor: pointer;
}

.operation_name
{
    flex-grow: 2;
    @extend %click;
}

.command
{
    width: .9em;
    margin: .2em;
}

.redo
{
    background-image: url('../assets/redo.svg');
    background-repeat: no-repeat;
    
   
    @extend %click;

}

.leasetime
{
    background-color: yellow;
}

.true-true
{
    background-color: $bg-color;
   
}

.false-false
{
    //background-color: cornflowerblue;
   
}

.false-true
{
    background-color: lightcoral;
    border-color: red;
    
}

.hidden
{
    display: none;
}

.opedetails
{
    padding-top: .1em;
}

</style>