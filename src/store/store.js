import {defineStore} from 'pinia';
var userToken = sessionStorage.getItem("userToken");
var environment = process.env.NODE_ENV;
var ip = "http://192.168.11.106";   //部署生产环境仅仅更改这里的配置
if(environment === "development"){
    ip = `http://${IP_ADDR}:8080/api`;
}
const useConfig = defineStore("config",{
    state:()=>({
        apiHost:ip,
        environment:environment,  //生产环境改成 production,非必要不需要手动配置修改(开发和打包时自动切换)
        local:"Chinese",
        userToken:userToken,
        userId:null,
        role:'admin',
        dynamicRoute:false      //是否采用服务端的路由进行动态渲染;
    })
});
export {useConfig};