import httpReq from '@src/utils/http.js';
import {useConfig} from '@store';
//import { message } from 'ant-design-vue';
var CryptoJS = require("crypto-js");
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
//获取验证图片  以及token
export function reqGet(data) {
    return httpReq.post('/code',data);
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
async function login({username,password,grantType="password",randomStr="clickWord",code}){
    var key = "pigxpigxpigxpigx";
    let iv = CryptoJS.enc.Latin1.parse(key);
    var encrypted = CryptoJS.AES.encrypt(password,iv,{
        iv:iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });
  const params = new URLSearchParams({username,password:encrypted.toString()});
  var uri_params = new URLSearchParams({grant_type:grantType,randomStr,code})
  /*
  var httpHeaders = {
      "Authorization": "Basic bWluaS1wcm9kOm1pbmktcHJvZA==",
      "Content-Type":"application/x-www-form-urlencoded"
  };
  var myHeaders = new Headers(httpHeaders);
  */
  var uri = uri_params.toString();
  var response = await httpReq.post(`/auth/oauth/token?${uri}`,params,{
    headers:{
        "Authorization": "Basic bWluaS1wcm9kOm1pbmktcHJvZA==",
        "Content-Type":"application/x-www-form-urlencoded"
    }
  });
    var {access_token} = response.data;
    sessionStorage.setItem('userToken',access_token);
    var store = useConfig();
    store.userToken = access_token;
    if(!response.data.code){
        var rex = {
            code:1,
            data:response.data,
            msg:"登录成功"
        }
        return rex;
    }else{
        return response.data;
    }
}
//退出登录
function usrLogout(){
    return httpReq.delete('/auth/token/logout');
}
//获得路由列表
export function getRouteList(){
    return httpReq.get('/getRouter');
}
export {getVercode,login,usrLogout};
