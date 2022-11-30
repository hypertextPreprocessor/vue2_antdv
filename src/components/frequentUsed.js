//这里放置使用非常频繁的组件;
import { h,toRefs,ref } from "vue";
import {Empty} from 'ant-design-vue';
import {useConfig} from '@store';
import {/*LoadingOutlined,*/PlusOutlined, UploadOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue';
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const RenderEmpty={
    setup(){
        var simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

        return ()=>h(
        <a-empty image={simpleImage}  v-slots={{description:()=>"暂无数据"}}></a-empty>
        );
    }
}
const WorKTypeCom={ //用工形式字典
    emits:['change','update:value'],
    setup(props,{attrs,emit}){
        const {placeholder,value} = toRefs(props);
        const options = [{label:"合同制",value:"1"},{label:"第三方",value:"2"}];
        return ()=>h(
            <a-select
                v-model={[value,"value"]}
                show-search
                placeholder={placeholder}
                {...attrs}
                options={options}
                filter-option={filterOption}
                onChange={(v)=>{
                    emit('change',v)
                }}
                onSelect={(v)=>{
                    emit('update:value',v)
                }}
            >
            </a-select>
        )
    }
}
const ActionConfirm={
    props:{
        title:{type:String,default:"确认删除吗？"},
        okTxt:{type:String,default:"确定"},
        noTxt:{type:String,default:"点错了"},
        btnSize:{type:String,default:"small"}
    },
    setup(props,{emit,slots}){
        //const {title,okTxt,noTxt} = toRefs(props);
        return ()=>h(
            <a-popconfirm
                title={props.title}
                ok-text={props.okTxt}
                cancel-text={props.noTxt}
                onConfirm={()=>{
                    emit('clickyes');
                }}
            >
                <a-button type="primary" shape="default" size={props.btnSize} danger ghost >
                    {{
                        icon:()=>slots.iconbtn?slots.iconbtn():"删除",
                        default:()=>slots.default?slots.default():""
                    }}
                </a-button>
            </a-popconfirm>
        )
    }
}
export const EntripriseTypeCom={
    props:{
        placeholder:{type:String,default:"选择一种企业类型"},
        allowClear:{type:Boolean,default:true}
    },
    emits:['change','update:value'],
    setup(props,{attrs,emit}){
        const options = [{label:"一般企业",value:"0"},{label:"物业",value:"1"},{label:"媒体",value:"2"}];
        return ()=>h(
            <a-select
                allowClear={props.allowClear}
                v-model={[props.value,"value"]}
                show-search
                placeholder={props.placeholder}
                {...attrs}
                options={options}
                filter-option={filterOption}
                onChange={(val)=>{
                    emit('change',val);
                    emit('update:value',val)
                }}
            ></a-select>
        );
    }
}
export const Bstas={    //商机状态列表
    props:{
        placeholder:{type:String,default:"状态选择"}
    },
    emits:['change','update:value'],
    setup(props,{attrs,emit}){
        const options = [
            // {label:"全部",value:""},
            {label:"无资源",value:"1"},
            {label:"未处理",value:"2"},
            {label:"超时未处理",value:"6"},
            {label:"正在跟进处理",value:"3"},
            {label:"超时未结束",value:"7"},
            {label:"订单完成",value:"4"},
            {label:"订单取消",value:"5"},
        ];
        return ()=>h(
            <a-select
                v-model={[props.value,"value"]}
                show-search
                placeholder={props.placeholder}
                {...attrs}
                filter-option={filterOption}
                options={options}
                onChange={(v)=>{
                    emit('change',v)
                }}
                onSelect={(v)=>{
                    emit('update:value',v)
                }}
            ></a-select>
        );
    }
}
export const UploadFileCom={    //上传1，渲染上传list
    props:{
        name:{type:String,default:"file"},
        listType:{type:String,default:"picture-card"},
        showUploadList:{type:Boolean,default:true},
        multiple:{type:Boolean,default:false},
        disabled:{type:Boolean,default:false},
        maxCount:{type:Number,default:1},
        data:{type:Object,default:{bucket:"slide"}}
    },
    emits:['change','beforeUpload','update:fileList'],
    setup(props,{attrs,emit}){
        var store = useConfig();
        var action = `${store.apiHost}/mini/fileUpload/upload`;
        const imageUrl = ref('');
        const loading = ref(false);
        const fileList = ref([]);
        const previewVisible = ref(false);
        const previewTitle = ref("");
        const previewImage = ref("");
        const header = {'Authorization':'bearer '+store.userToken};
        function getBase64(file) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
          
              reader.onload = () => resolve(reader.result);
          
              reader.onerror = error => reject(error);
            });
          }
        return ()=>h(
            <>
            <a-upload
                v-model={[props.fileList,"fileList"]}
                name={props.name}
                file-list={fileList.value}
                headers={header}
                list-type={props.listType}
                {...attrs}
                show-upload-list={props.showUploadList}
                action={action}
                data={props.data}
                multiple={props.multiple}
                max-count={props.maxCount}
                disabled={props.disabled}
                before-upload={(file,flist)=>{
                    emit('beforeUpload',file,flist);
                }}
                onChange={(info)=>{
                    fileList.value = info.fileList;
                    emit('update:fileList',info.fileList);
                    if(info.file.status==="uploading"){
                        loading.value = true;
                    }
                    if(info.file.status === 'done'){    
                        var {code,data,msg} = info.file.response;
                        if(code==1){
                            loading.value = false;
                            imageUrl.value = `${store.apiHost}${data.url}`;
                        }else{
                            loading.value = false;
                            message.error(msg);
                        }
                    }
                    if (info.file.status === 'error') {
                        loading.value = false;
                        message.error('upload error');
                      }
                    emit('change',info);
                }}
                onPreview={ async (file)=>{
                    previewVisible.value = true;
                    console.log(file);
                    if (!file.url && !file.preview) {
                        file.preview = await getBase64(file.originFileObj);
                    }
                    previewImage.value = file.url || file.preview;
                    previewVisible.value = true;
                    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
                }}
            >
                <div>
                    <div style="display:block"><PlusOutlined></PlusOutlined></div>
                    <div style="display:block" class="ant-upload-text">上传</div>
                </div>   
            </a-upload>
            <a-modal visible={previewVisible.value} title={previewTitle.value} footer={null} onCancel={()=>{
                previewVisible.value = false;
                previewTitle.value = '';
            }}>
                <img alt="example" style="width: 100%" src={previewImage.value} />
            </a-modal>
            </>
        );
    }
}
export const ImportFromLocal={    //上传2，导入功能，不渲染所上传对象的列表;
    props:{
        btn:{type:Boolean,default:true},
        btnTxt:{type:String,default:"上传"},
        name:{type:String,default:"file"},
        fileList:{type:Array,default:[]},
        action:{type:String,default:''},
    },
    emits:['change','update:fileList'],
    setup(props,{emit,slots}){
        var store = useConfig();
        const header = {'Authorization':'bearer '+store.userToken};
        var action = `${store.apiHost}${props.action}`;
        const loading = ref(false);
        return ()=>h(
            <a-upload
                v-model={[props.fileList,'fileList']}
                name={props.name}
                action={action}
                headers={header}
                max-count={1}
                show-upload-list={false}
                onChange={(value)=>{
                    if(value.file.response){
                        loading.value = false;
                        var {response} = value.file;
                        if(response.code == 1){
                            emit('change',value);
                            emit('update:fileList',value.fileList);
                            message.success(response.msg);
                        }else{
                            message.error(response.msg);
                        }
                    }
                }}
            >
                {props.btn?(
                    <a-button loading={loading.value}>
                        {{
                            icon:()=>slots.default?slots.default():(
                                <>
                                    <UploadOutlined></UploadOutlined>
                                </>
                            ),default: ()=>{props.btnTxt}
                        }}
                        
                    </a-button>
                ):(
                    <>
                        {slots.default?slots.default():(
                                <UploadOutlined></UploadOutlined>
                        )}
                        {props.btnTxt}
                    </>
                )}
                
            </a-upload>
        );
    }
}
export const BdgLevelCom={  //楼宇等级
    props:{
        placeholder:{type:String,default:"选择一个楼宇等级"},
        value:{type:String,default:""}
    },
    emits:['change','update:value'],
    setup(props,{emit,attrs}){
        const options = [{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"}];
        console.log(props.value);
        return ()=>h(
            <a-select
                v-model={[props.value,'value']}
                show-search
                placeholder={props.placeholder}
                {...attrs}
                options={options}
                filter-option={filterOption}
                onChange={(v)=>{
                    emit('change',v)
                }}
                onSelect={(v)=>{
                    emit('update:value',v)
                }}
            ></a-select>
        );
    }
}
export {RenderEmpty,WorKTypeCom,ActionConfirm};
