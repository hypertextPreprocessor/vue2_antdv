import {loadComponentForRoute} from '@src/utils/util.js';
import staticRoute from '@src/router/static';
async function routeHandle(routes){
    for(var i=0;i<routes.length;i++){
        routes[i].component = await loadComponentForRoute(routes[i].component);
        if(routes[i].meta){
            if(routes[i].meta.icon){
                var iconName = routes[i].meta.icon;
                var C = await import("@ant-design/icons-vue");
                routes[i].meta.icon = C[iconName];
            }
        }
        if(routes[i].children){
            await routeHandle(routes[i].children);
        }
    }
    return routes;
    
}
function myRoute(store,loadCom,callback){//参数2：是否有加载组件需求，参数3：回调(可选参数)
    return new Promise((resolve,reject)=>{
        if(store.userToken!=null){
            if(store.dynamicRoute){
                import('@api').then(({getRouteList})=>{
                    getRouteList().then(res=>{
                        var {code,data,message} = res.data;
                        if(code==200){
                            if(loadCom){
                                routeHandle(data.page).then(r1=>{
                                    callback && callback({branch:'mainCommon',routes:r1});
                                    routeHandle(data.system).then(r2=>{
                                        callback && callback({branch:'mainSetting',routes:r2});
                                        store.menuList = {page:r1,system:r2}
                                        resolve({page:r1,system:r2});
                                    });
                                });
                            }else{
                                resolve(data);
                            }
                        }else{
                            reject(message);
                        }
                    });
                });
            }else{
                if(loadCom){
                    import('@src/router/router').then(({pageRoute})=>{
                        import('@src/router/router').then(({systemRoute})=>{
                            routeHandle(pageRoute).then(r1=>{
                                callback && callback({branch:'mainCommon',routes:r1});
                                routeHandle(systemRoute).then(r2=>{
                                    callback && callback({branch:'mainSetting',routes:r2});
                                    store.menuList = {page:r1,system:r2}
                                    resolve({page:r1,system:r2});
                                });
                            });
                        });
                    })
                }else{
                    import('@src/router/router').then(({pageRoute})=>{
                        import('@src/router/router').then(({systemRoute})=>{
                            resolve({
                                page:pageRoute,
                                system:systemRoute
                            });
                        });
                    })
                }
            }
        }else{
            reject('用户未登录');
        }
    });
    
}
export function myStaticRoute(store){    //纯静态路由
    var page=[],system=[];
    for(var i=0;i<staticRoute.length;i++){
        if(staticRoute[i].name==="home"){
            var pageRoute = staticRoute[i].children;
            for(var j=0;j<pageRoute.length;j++){
                if(pageRoute[j].name === "mainCommon"){
                    page = pageRoute[j].children;
                }
                if(pageRoute[j].name === "mainSetting"){
                    system = pageRoute[j].children;
                }
            }
        }
    }
    store.menuList = {page:page,system:system};
    return {page:page,system:system};
}
export default myRoute;