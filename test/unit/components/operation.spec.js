import { createLocalVue, shallow as render} from '@vue/test-utils';
import operation from '../../../src/components/operation.vue';
import IOC from '../../../src/IOC';


const fake_api = 
{

    redone: false

    , redo : async (media_id, op_id) => {

        dbg('redo', media_id, op_id);

        expect(media_id).to.not.be.an('undefined');
        expect(op_id).to.not.be.an('undefined');
        
        this.redone = true;

    }

};

const services = { api : fake_api};


describe('Testing operation Control ', () => {

    // create an extended Vue constructor
    const localVue = createLocalVue();
    localVue.use(IOC, services);
    
    it('check render data', /*async*/ () => {
        
        const props = {
            operation : {name : 'test operation'
                , type: 'exec'
                , propertyBag : {property: 'property'}
                , result: 'bad'
                , id: 'id'
                , succeeded: true
                , completed: true
            }   
        };
      
            
        const wrapper = render(operation, { localVue
            ,   propsData: props
            ,   methods: {
                //draw_data: function(){dbg('draw_data');}
            }
        });

        //await flushPromises();

        //console.log(wrapper.html());

        dbg('render', wrapper.html());

        
    
    });
        
});