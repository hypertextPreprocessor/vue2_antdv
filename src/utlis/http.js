const axios = require('axios');
//var {apiHost} = require('@config');
import {useConfig} from '@store';
import { message } from 'ant-design-vue';
//const controller = new AbortController();
//axios.defaults.baseURL = apiHost;
//单单对登录有不同的请求方式
function atLoginApi(config){
    return config.url === "/auth/oauth/token";
}
const httpReq = axios.create({
    timeout: 5000,
    headers:{'content-type':'application/json'}
});
httpReq.interceptors.request.use(function(config){
    var store = useConfig();
    config.baseURL = store.apiHost;
    if(store.userToken){
        config.headers['Authorization'] = 'basic '+store.userToken;
    }
    return config;
},function(error){
    return Promise.reject(error);
});
httpReq.interceptors.request.use(function(config){
    var store = useConfig();
    config.baseURL = store.apiHost;
    config.headers = {'content-type':'application/x-www-form-urlencoded','Authorization':'Basic bWluaS10ZXN0Om1pbmktdGVzdA=='}
    return config;
},function(error){
    return Promise.reject(error);
},{runWhen:atLoginApi});
httpReq.interceptors.response.use(function(response){
    var store = useConfig();
    if(store.environment==="dev"){
        console.log(response);
    }
    if(response.config.url==="/auth/oauth/token"){
        return response
    }
    return response;
},function(error){
    console.log(error);
    if(error.response!=undefined && error.response.data!=undefined){
        message.error(error.response.data.msg);
    }else{
        message.error(error.message);
    }
    //controller.abort();
    return Promise.reject(error);
});
export default httpReq;