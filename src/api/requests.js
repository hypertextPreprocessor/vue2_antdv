import httpReq from '@src/utlis/http.js';
import {useConfig} from '@store';
import { message } from 'ant-design-vue';
//var CryptoJS = require("crypto-js");
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
//登录接口
async function login({username,password,grantType="password"}){
    /*
    var key = "thanks,pig4cloud";//"pigxpigxpigxpigx";
    var encrypted = CryptoJS.AES.encrypt(password,key,{
        iv:CryptoJS.enc.Latin1.parse(key),
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });
    */
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
    handleErrPop(response);
    return response;
}
//系统管理-组织管理：组织树形结构模块
async function loadOrgzTree(deptName=""){
    //const params = new URLSearchParams({deptName:deptName});
    var response = await httpReq.get('/admin/dept/tree',{params:{
        deptName:deptName
    }},{headers: {'content-type': 'application/x-www-form-urlencoded'}})
    handleErrPop(response);
    return response;
}
//系统管理-组织管理：新增一个组织
async function addNewOrgz(params){
    var response = await httpReq.post('/admin/dept',params);
    handleErrPop(response);
    return response;
}
//系统管理-组织管理：编辑一个组织
async function editAOrgz(params){
    var response = await httpReq.put('/admin/dept',{
        ...params
    });
    handleErrPop(response);
    return response;
}
//统一规范错误抛出弹窗
function handleErrPop(res){
    var {code,msg} = res.data;
    if(code!==1){
        message.error(msg);
    }
}
export {getVercode,login,loadOrgzTree,getProductInfo,addNewOrgz,editAOrgz};
