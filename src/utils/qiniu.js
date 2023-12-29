import * as qiniu from 'qiniu-js'
import {getUploadToken} from "@api";
class QiniuUpload{
    constructor({file,name,compress=false,putExtra={},config={
        useCdnDomain:true
    },observer}={}){
        this.file = file;
        this.name = name;
        this.compress = compress;   //是否压缩
        this.putExtra = putExtra;
        this.config = config;
        this.observer = observer;
        this.observable;
        this.subscription;
        this.token=null;
        if(file!=undefined){
            //获取token
            getUploadToken().then(res=>{
                var {code,data} = res.data;
                if(code===1){
                    this.token = data;
                    if(compress){
                        this.miniSize(file).then(upData=>{
                            this.observable = qiniu.upload(upData, name, data, putExtra, config);
                            this.subscription = this.observable.subscribe(this.observer) // 上传开始
                        });
                    }else{
                        this.observable = qiniu.upload(file, name, data, putExtra, config);
                        this.subscription = this.observable.subscribe(this.observer) // 上传开始
                    }
                    
                }
            });
        }else{
            this.getUpToken();
        }
    }
    getUpToken(){
        getUploadToken().then(res=>{
            if(res.data.code===1){
                this.token = res.data.data;
            }
        });
    }
    miniSize(file){ //压缩方法
        return new Promise((resolve,reject)=>{
            const options = {
                quality: 0.92,
                noCompressIfLarger: true
                // maxWidth: 1000,
                // maxHeight: 618
            }
            qiniu.compressImage(file, options).then(data => {
                resolve(data.dist);
            },(err)=>{reject(err)});
        });
        
    }
    cancelUpload(){
        this.subscription.unsubscribe() // 上传取消
    }
}
export default QiniuUpload;