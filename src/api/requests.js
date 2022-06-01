import httpReq from '@src/utlis/http.js';
import {useConfig} from '@store';
import { message } from 'ant-design-vue';
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
        headers:{'content-type':'application/x-www-form-urlencoded'}
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
  var uri = uri_params.toString();
  var response = await httpReq.post(`/auth/oauth/token?${uri}`,params,{
    headers: {
      "Authorization": "Basic bWluaS1wcm9kOm1pbmktcHJvZA==",
      'content-type': "application/x-www-form-urlencoded"
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
// product sort
 export async function ProductSortInfo(query){
    var response = await httpReq.get('/mini/productCategory/page',query);
    handleErrPop(response);
    return response;
}
export async function productSortSearch(query){
    var response = await httpReq.get('/mini/productCategory/list',query);
    handleErrPop(response);
    return response;
}
export async function productSortOperate(params){
    var response = await httpReq.post('/mini/productCategory/save',params);
    handleErrPop(response);
    return response;
}

// product province
export async function productProvinceInfo(query){
    var response = await httpReq.get('/mini/cityProduct/getSysFilePage',query);
    handleErrPop(response);
    return response;
}
export async function productProvinceAdd(params){
    var response = await httpReq.post('/mini/cityProduct/saveOrUpdate',params);
    handleErrPop(response);
    return response;
}
export async function productProvinceSingleInfo(id){
    var response = await httpReq.post(`/mini/cityProduct/${id}`);
    handleErrPop(response);
    return response;
}

// product video
export async function productVideoInfo(query){
    var response = await httpReq.get('/mini/productVideo/page',query);
    handleErrPop(response);
    return response;
}
export async function productVideoSearch(query){
    var response = await httpReq.get('/mini/productVideo/list',query);
    handleErrPop(response);
    return response;
}
export async function productVideoUpload(params){
    var response = await httpReq.post('/mini/productVideo/upload',params);
    handleErrPop(response);
    return response;
}
export async function productVideoAdd(params){
    var response = await httpReq.post('/mini/productVideo/save',params);
    handleErrPop(response);
    return response;
}
export async function productVideoDel(params){
    var response = await httpReq.post('/mini/productVideo/delById',params);
    handleErrPop(response);
    return response;
}
export async function productVideoEdit(params){
    var response = await httpReq.put('/mini/productVideo/update',params);
    handleErrPop(response);
    return response;
}
export async function productVideoSingleInfo(id){
    var response = await httpReq.post(`/mini/productVideo/${id}`);
    handleErrPop(response);
    return response;
}


// page carousel
export async function pageCarouselInfo(params){
    var response = await httpReq.post('/mini/slide/page',params);
    handleErrPop(response);
    return response;
}
export async function pageCarouselAdd(params){
    var response = await httpReq.post('/mini/slide/saveOrUpdate',params);
    handleErrPop(response);
    return response;
}
export async function pageCarouselDel(params){
    var response = await httpReq.delete('/mini/slide/delById',params);
    handleErrPop(response);
    return response;
}

// page poster
export async function pagePosterInfo(query){
    var response = await httpReq.get('/mini/advertisingMap/page',query);
    handleErrPop(response);
    return response;
}
export async function pagePosterSearch(query){
    var response = await httpReq.get('/mini/advertisingMap/list',query);
    handleErrPop(response);
    return response;
}
export async function pagePosterAdd(params){
    var response = await httpReq.post('/mini/advertisingMap/save',params);
    handleErrPop(response);
    return response;
}
export async function pagePosterDel(params){
    var response = await httpReq.delete('/mini/advertisingMap/delById',params);
    handleErrPop(response);
    return response;
}
export async function pagePosterEdit(params){
    var response = await httpReq.put('/mini/advertisingMap/update',params);
    handleErrPop(response);
    return response;
}
export async function pagePosterSingleInfo(id){
    var response = await httpReq.get(`/mini/advertisingMap/${id}`);
    handleErrPop(response);
    return response;
}

// page notice
export async function pageNoticeInfo(query){
    var response = await httpReq.get('/mini/notice/page',query);
    handleErrPop(response);
    return response;
}
export async function pageNoticeSearch(query){
    var response = await httpReq.get('/mini/notice/list',query);
    handleErrPop(response);
    return response;
}
export async function pageNoticeAdd(params){
    var response = await httpReq.post('/mini/notice/save',params);
    handleErrPop(response);
    return response;
}
export async function pageNoticeDel(params){
    var response = await httpReq.delete('/mini/notice/delById',params);
    handleErrPop(response);
    return response;
}
export async function pageNoticeEdit(params){
    var response = await httpReq.put('/mini/notice/update',params);
    handleErrPop(response);
    return response;
}
export async function pageNoticeSingleInfo(id){
    var response = await httpReq.get(`/mini/notice/${id}`);
    handleErrPop(response);
    return response;
}

// page sold
export async function pageSoldInfo(query){
    var response = await httpReq.get('/mini/promotionBar/page',query);
    handleErrPop(response);
    return response;
}
export async function pageSoldSearch(query){
    var response = await httpReq.get('/mini/promotionBar/list',query);
    handleErrPop(response);
    return response;
}
export async function pageSoldAdd(params){
    var response = await httpReq.post('/mini/promotionBar/save',params);
    handleErrPop(response);
    return response;
}
export async function pageSoldDel(params){
    var response = await httpReq.delete('/mini/promotionBar/delById',params);
    handleErrPop(response);
    return response;
}
export async function pageSoldEdit(params){
    var response = await httpReq.put('/mini/promotionBar/update',params);
    handleErrPop(response);
    return response;
}
export async function pageSoldSingleInfo(id){
    var response = await httpReq.get(`/mini/promotionBar/${id}`);
    handleErrPop(response);
    return response;
}

// recommand FAQ
export async function recommandFAQInfo(query){
    var response = await httpReq.get('/mini/question/page',query);
    handleErrPop(response);
    return response;
}
export async function recommandFAQSearch(query){
    var response = await httpReq.get('/mini/question/list',query);
    handleErrPop(response);
    return response;
}
export async function recommandFAQAdd(params){
    var response = await httpReq.post('/mini/question/save',params);
    handleErrPop(response);
    return response;
}
export async function recommandFAQDel(params){
    var response = await httpReq.delete('/mini/question/delById',params);
    handleErrPop(response);
    return response;
}
export async function recommandFAQEdit(params){
    var response = await httpReq.put('/mini/question/update',params);
    handleErrPop(response);
    return response;
}
export async function recommandFAQSingleInfo(id){
    var response = await httpReq.get(`/mini/question/${id}`);
    handleErrPop(response);
    return response;
}
// recommand attribution
export async function recommandAttributionInfo(query){
    var response = await httpReq.get('/mini/questionOption/page',query);
    handleErrPop(response);
    return response;
}
export async function recommandAttributionSearch(query){
    var response = await httpReq.get('/mini/questionOption/list',query);
    handleErrPop(response);
    return response;
}
export async function recommandAttributionHandle(params){
    var response = await httpReq.post('/mini/questionOption/saveOrUpdate',params);
    handleErrPop(response);
    return response;
}
export async function recommandAttributionDel(params){
    var response = await httpReq.delete('/mini/questionOption/delById',params);
    handleErrPop(response);
    return response;
}

// recommand deploy
export async function recommandDeployInfo(query){
    var response = await httpReq.get('/mini/productOption/page',query);
    handleErrPop(response);
    return response;
}


// report commercialAndClient
export async function reportCommercialAndClientInfo(params){
    var response = await httpReq.post('/mini/userThematicStatement/list',params);
    handleErrPop(response);
    return response;
}
export async function reportCommercialAndClientHandle(params){
    var response = await httpReq.post('/mini/userThematicStatement/listUserAndBusiStat',params);
    handleErrPop(response);
    return response;
}

//系统管理-角色管理：获取角色列表-分页
export async function roleManageInfo(query){
    var response = await httpReq.get('/admin/role/page',query);
    handleErrPop(response);
    return response;
}
//系统管理-角色管理：获取单个角色信息
export async function roleManageSingleInfo(id){
    var response = await httpReq.get(`/admin/role/${id}`);
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

//信息管理-楼宇管家管理：获取分页数据
export async function infoLoftInfo(query){
    var response = await httpReq.get('/mini/buildingManagement/getSysFilePage',query);
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
export {getVercode,login,loadOrgzTree,addNewOrgz,editAOrgz,usrLogout};
