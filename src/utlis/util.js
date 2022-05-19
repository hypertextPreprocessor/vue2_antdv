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
        default:
            breadArr=[];
    }
    return breadArr;
}