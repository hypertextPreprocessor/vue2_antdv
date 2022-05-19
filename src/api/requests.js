import httpReq from '@src/utlis/http.js';
import {useConfig} from '@store';
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
//登录接口
async function login({username,password,grantType="password"}){
    const params = new URLSearchParams({username,password,grant_type:grantType});
    var response = await httpReq.post('/auth/oauth/token',params);
    var {access_token} = response.data;
    sessionStorage.setItem('userToken',access_token);
    var store = useConfig();
    store.userToken = access_token;
    return response;
}
 async function getProductInfo(params){
    var response = await httpReq.get('/mini/product/page',params);
    return response;
}
//系统管理-组织管理：组织树形结构模块
async function loadOrgzTree(deptName=""){
    const params = new URLSearchParams({deptName});
    var response = await httpReq.get('/admin/dept/tree',params,{
        headers:{"content-type":"application/x-www-form-urlencoded"}
    })
    return response;
}
export {getVercode,login,loadOrgzTree,getProductInfo};
