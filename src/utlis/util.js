//同时传入name跟path优先选取name作为索引 '/main-common/sys2'
export function findRoute(routes,{name="",path=""}={}){

    var breadArr = [];
    function findByname(n,r){
        for(var i=0;i<r.length;i++){
            if(r[i].name===n){
                breadArr.push(r[i]);
                return false;
            }else{
                if(r[i].children){

                    breadArr.push(r[i]);
                    findByname(n,r[i].children)
                }
            }
        }
        return breadArr;
    }
    function findByPath(p,r){
        for(var j=0;j<r.length;j++){
            if(r[j].path === p){
                breadArr.push(r[j]);
                return breadArr;
            }else{
                if(r[j].children){
                    breadArr.push(r[j]);
                    findByPath(p,r[j].children);
                }
            }
        }
        return breadArr;
    }
    if(arguments.length==0) return [];
    if(name!=""){
        return findByname(name,routes);
    }else{
        if(path!=""){
            var s = path.split('/');
            var pathx = s[s.length-1];
            return findByPath(pathx,routes);
        }else{
            return [];
        }
    }
}
export function breadFactory(fullPath){
    var breadArr = [];
    switch(fullPath){
        case '/main-common/sys1':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"sys1",breadName:"角色管理"}]
            break;
        case '/main-common/sys2':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"sys2",breadName:"组织管理"}]
            break;
        case '/main-common/sys3':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"sys3",breadName:"登录日志列表"}]
            break;
        case '/main-common/sys4':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"sys4",breadName:"操作日志列表"}]
            break;
        case '/main-common/info1':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info1",breadName:"楼宇管家管理"}]
            break;
        case '/main-common/info2':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info2",breadName:"企业管理"}]
            break;
        case '/main-common/info3':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info3",breadName:"楼宇管理"}]
            break;
        case '/main-common/info3/white-paper':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info3",breadName:"楼宇管理"},{routeName:"whitePaper",breadName:"白皮书"}]
            break;
        case '/main-common/info4':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info4",breadName:"商机管理"}]
            break;
            case '/main-common/info5':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info5",breadName:"产品报价信息"}]
            break;
            case '/main-common/info6':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info6",breadName:"故障解决方案信息"}]
            break;
            case '/main-common/info7':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info7",breadName:"用户管理"}]
            break;
            case '/main-common/info8':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info8",breadName:"企业信息管理"}]
            break;
        case '/main-common/info9':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"info9",breadName:"智能助手"}]
            break;
        case '/main-common/product1':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"product1",breadName:"省级产品类别"}]
            break;
        case '/main-common/product2':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"product2",breadName:"省级产品"}]
            break;
        case '/main-common/product3':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"product3",breadName:"产品视频"}]
            break;
        case '/main-common/page1':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"page1",breadName:"轮播图管理"}]
            break;
        case '/main-common/page2':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"page2",breadName:"宣传图管理"}]
            break;
        case '/main-common/page3':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"page3",breadName:"公告管理"}]
            break;
        case '/main-common/page4':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"page4",breadName:"促销管理"}]
            break;
        case '/main-common/page5':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"page5",breadName:"地市促销管理"}]
            break;
        case '/main-common/promotion1':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"promotion1",breadName:"产品FAQ"}]
            break;
        case '/main-common/promotion2':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"promotion2",breadName:"产品属性"}]
            break;
        case '/main-common/promotion3':
            breadArr=[{routeName:"mainCommon",breadName:"常规"},{routeName:"promotion3",breadName:"产品配置"}]
            break;
        default:
            breadArr=[];
    }
    return breadArr;
}


export function resetSize(vm) {
    var img_width, img_height, bar_width, bar_height;	//图片的宽度、高度，移动条的宽度、高度

    var parentWidth = vm.$el.parentNode.offsetWidth || window.offsetWidth
    var parentHeight = vm.$el.parentNode.offsetHeight || window.offsetHeight
    if (vm.imgSize.width.indexOf('%') != -1) {
        img_width = parseInt(vm.imgSize.width) / 100 * parentWidth + 'px'
    } else {
        img_width = vm.imgSize.width;
    }

    if (vm.imgSize.height.indexOf('%') != -1) {
        img_height = parseInt(vm.imgSize.height) / 100 * parentHeight + 'px'
    } else {
        img_height = vm.imgSize.height
    }

    if (vm.barSize.width.indexOf('%') != -1) {
        bar_width = parseInt(vm.barSize.width) / 100 * parentWidth + 'px'
    } else {
        bar_width = vm.barSize.width
    }

    if (vm.barSize.height.indexOf('%') != -1) {
        bar_height = parseInt(vm.barSize.height) / 100 * parentHeight + 'px'
    } else {
        bar_height = vm.barSize.height
    }

    return {imgWidth: img_width, imgHeight: img_height, barWidth: bar_width, barHeight: bar_height}
}
export function clearFormState(state){
    Object.keys(state).map(key=>{
        state[key] = undefined;
    });
}
export const _code_chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const _code_color1 = ['#fffff0', '#f0ffff', '#f0fff0', '#fff0f0']
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC']