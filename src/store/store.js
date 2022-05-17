import {defineStore} from 'pinia';
var userToken = sessionStorage.getItem("userToken");
const useConfig = defineStore("config",{
    state:()=>({
        apiHost:"http://192.168.11.120:8080/api",
        environment:"dev",  //生产环境改成 production
        local:"Chinese",
        userToken:userToken,
        role:'admin'
    })
});
export {useConfig};