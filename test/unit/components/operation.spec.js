import { createLocalVue, shallow as render} from '@vue/test-utils';
import operation from '../../../src/components/operation.vue';


describe('Testing operation Control ', () => {
    
    it('check render data', async () => {
          
        // create an extended Vue constructor
        const localVue = createLocalVue();

        const props = {
            operation : {name : 'test operation'}
        };
      
        // install plugins as normal
        //localVue.use(Vuec);
   
        

        //debugger;
    
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