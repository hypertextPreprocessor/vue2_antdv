import httpReq from '@src/utils/http.js';
import {useConfig} from '@store';
//import { message } from 'ant-design-vue';
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
//图形验证码的产生
export async function imgCode(){
    const store = useConfig();
    const axios = require('axios');
    axios.defaults.baseURL = `${store.apiHost}`;
    //var url = "https://miniprogram.yeyingqu.cn/camping/captcha.jpg";
    var url = '/captcha.jpg';
    var para=new Date().getTime();
    var response = await axios.get(url,{
        params:{
            uuid:para
        },
        responseType:"blob"
    });
    var src = URL.createObjectURL(response.data);
    return [src,para];
}
//获得publicKey
export function getPublicKey(){
    return httpReq.get('/getRsaPublicKey');
}
//获取验证图片  以及token
export function reqGet(data) {
    return httpReq.post('/code',data);
}
//发送短信
export function sendSmsCode(){
    return httpReq.get('/sms/send');
}
//验证码方式登录
export function loginBySmsCode({userName,smsCode,smsId,valicateCode,valicateId}){
    return httpReq.get('/loginBySmsCode',{
        params:{
            userName,smsCode,smsId,valicateCode,valicateId
        }
    });
}
//滑动或者点选验证
export function reqCheck(data) {
    var uri = encodeURIComponent(`captchaType=${data.captchaType}&pointJson=${data.pointJson}&token=${data.token}`);
    return httpReq.post(`/code/check?${uri}`);
    /*
    const params = new URLSearchParams({...data});
    console.log(params.toString());
    return httpReq.post('/code/check',params,{
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    });
    */
}
//登录接口
function login({userName,password,validateCode,validateCodeId}){
    return httpReq.get('/loginByPassword',{params:{
        userName,password,validateCode,validateCodeId
    }});
}
//设置新密码
export function setNewPassword({password,rePassword}){
    httpReq.get('/resetUserPassword',{
        params:{
            password,rePassword
        }
    })
}
//加载角色列表
export function loadRoleList(){
    return httpReq.get('/operationList');
}
//选择一个角色登录
export function chooseARole(operationId){
    return httpReq.get('/createTokenByOperationId',{
        params:{
            operationId:operationId
        }
    });
}
//退出登录
function usrLogout(){
    return httpReq.delete('/logout');
}
//获得路由列表
export function getRouteList(){
    return httpReq.get('/getRouter');
}
export {getVercode,login,usrLogout};
