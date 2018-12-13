
import ioc from './ioc';
import api from './api';

const services = {
    api : api()
};

export default ioc(services);
