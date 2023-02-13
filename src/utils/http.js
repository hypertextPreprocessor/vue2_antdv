const axios = require('axios');
//var {apiHost} = require('@config');
import {useConfig} from '@store';
import { message } from 'ant-design-vue';
//const controller = new AbortController();
//axios.defaults.baseURL = apiHost;

const httpReq = axios.create({
    timeout: 5000,
    headers:process.env.NODE_ENV=="development"?{
        'Content-Type':'application/json',
        "VERSION":"dev" //生产环境注释
    }:{
        'Content-Type':'application/json',
    }
});
httpReq.interceptors.request.use(function(config){
    var store = useConfig();
    config.baseURL = store.apiHost;
    /*
    if(/GET/i.test(config.method)){
        config.data = { unused: 0 };
    }
    */
    if(store.userToken!=undefined&&store.userToken!=null&&store.userToken!=""){
        config.headers['Authorization'] = 'bearer '+store.userToken;
    }
    return config;
},function(error){
    return Promise.reject(error);
});
/*
httpReq.interceptors.request.use(function(config){
    var store = useConfig();
    config.baseURL = store.apiHost;
    config.headers = {'content-type':'application/x-www-form-urlencoded','Authorization':'Basic bWluaS10ZXN0Om1pbmktdGVzdA=='}
    return config;
},function(error){
    return Promise.reject(error);
},{runWhen:atLoginApi});
*/
httpReq.interceptors.response.use(function(response){
    if(response.status === 200){
        var store = useConfig();
        if(store.environment==="development"){
            console.log(response);
        }
        if(!response.data.code){ //这里通常处理数据流
            if(response.headers["excel-content"]!=undefined && response.headers["excel-content"]=="download"){
                //console.log(response.headers["excel-content"]);
            }
        }else{
            if(response.data.code!=1){
                message.error(response.data.msg);
            }
        }
    }else{
        message.error(response.statusText);
    }
    return response;
},function(error){
    if(error.response!=undefined && error.response.data!=undefined){
        message.error(error.response.data.msg);
        return error.response;
    }else{
        message.error(error.message);
        return {
            data:{
                code:error.code,
                data:false,
                msg:error.message
            }
        }
    }
    //return Promise.reject(error);
});
export default httpReq;
