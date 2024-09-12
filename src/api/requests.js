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
//商会成员 - 分页列表
export function loadMemberPageList({memberName="",legalName="",current=1,size=10}={}){
    return httpReq.get('/member/page',{
        params:{
            memberName,legalName,size,current
        }
    })
}
//商会成员 - 详情信息
export function loadMemberById(id){
    return httpReq.get('/member/info',{
        params:{id}
    });
}
//商会成员 - 新增成员
export function addMember(data){
    return httpReq.post('/member/save',data);
}
//商会成员 - 修改成员
export function editMember(data){
    return httpReq.put('/member/update',data);
}
//商会成员 - 删除成员
export function delMember(id){
    return httpReq.delete('/member/delete',{data:{id}});
}


//商会成员 - 分页列表
export function loadGroupPageList({starName="",company="",current=1,size=10}={}){
    return httpReq.get('/star/page',{
        params:{
            starName,company,size,current
        }
    })
}
//商会成员 - 详情信息
export function loadGroupById(id){
    return httpReq.get('/star/info',{
        params:{id}
    });
}
//商会成员 - 新增成员
export function addGroup(data){
    return httpReq.post('/star/save',data);
}
//商会成员 - 修改成员
export function editGroup(data){
    return httpReq.put('/star/update',data);
}
//商会成员 - 删除成员
export function delGroup(id){
    return httpReq.delete('/star/delete',{data:{id}});
}
export {getVercode,login,usrLogout};
