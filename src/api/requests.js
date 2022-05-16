import httpReq from '@src/utlis/http.js';
async function getVercode(){
    var response = await httpReq.post('/code/check');
    return response;
}
export {getVercode};