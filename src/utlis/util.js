//同时传入name跟path优先选取name作为索引 '/main-common/sys2'
export function findRoute({name="",path=""}={}){
    var count = 0;
    var breadArr = [];
    function findByname(n,r){
        for(var i=0;i<r.length;i++){
            if(r[i].name===n){
                breadArr.push(r[i]);
                return false;
            }else{
                if(r[i].children){
                    count++;
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
                    count++;
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