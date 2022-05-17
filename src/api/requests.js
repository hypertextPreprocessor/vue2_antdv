import httpReq from '@src/utlis/http.js';
import {useConfig} from '@store';
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
async function login({username,password,grantType="password"}){
    const params = new URLSearchParams({username,password,grant_type:grantType});
    var response = await httpReq.post('/auth/oauth/token',params);
    var {access_token} = response.data;
    sessionStorage.setItem('userToken',access_token);
    var store = useConfig();
    store.userToken = access_token;
    return response;
}
export {getVercode,login};