import axios from 'axios';

const default_options = 
{
    api : '/api'
};

function get_api(options)
{
    if(undefined === options)
        options = {};

    options = Object.assign({}, default_options, options);

    return {
        
        redo : async (media_id, op_id) => {

            op_id = op_id.replace(/\//g, '%2F');

            const response = await axios.get(`${options.api}/queue/redo/${media_id}/${op_id}`);

            console.log(response.data);
    
        }

        , upload_id : async (id) => {
            
            const response = await axios.get(`/api/upload/${id}`);

            let server_id = response.data.id;

            return server_id;
             
        }
    };
}

export default get_api;