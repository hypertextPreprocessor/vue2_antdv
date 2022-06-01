import {defineStore} from 'pinia';
var userToken = sessionStorage.getItem("userToken");
var environment = process.env.NODE_ENV;
const useConfig = defineStore("config",{
    state:()=>({
        apiHost:"http://192.168.11.5:9999",//http://192.168.11.127:8080/api",
        environment:environment,  //生产环境改成 production,非必要不需要手动配置修改(开发和打包时自动切换)
        local:"Chinese",
        userToken:userToken,
        role:'admin'
    })
});
export {useConfig};