
function get_plugin(pre_services){
    
    
    return {
	
        install(Vue, services) {

            if(undefined === services)
                services = {};

            services = Object.assign({}, pre_services, services);
            
            Vue.$ioc = services;
            Vue.mixin({
                methods: {
                    ioc(service)
                    {
                        return services[service];
                    }
                }
            });
        }
    };
}


export default get_plugin;