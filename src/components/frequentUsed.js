//这里放置使用非常频繁的组件;
import { h,toRefs,ref } from "vue";
import {Empty} from 'ant-design-vue';
import {useConfig} from '@store';
import {/*LoadingOutlined,*/PlusOutlined, UploadOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue';
import QiniuUpload from "@src/utils/qiniu.js";
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
                        icon:()=>slots.iconbtn?slots.iconbtn():"",
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
export const UploadFileByCdn = {
    props: {
      accept: { type: String, default: "" }, //接受的上传类型（非强制性的）
      name: { type: String, default: "file" }, //上传的名称
      fileList: { type: Array, default: [] }, //文件列表
      listType: { type: String, default: "picture-card" }, //预览列表类型
      showUploadList: { type: Boolean, default: true }, //是否显示上传列表
      multiple: { type: Boolean, default: false }, //是否能多张选取上传
      disabled: { type: Boolean, default: false }, //禁用该控件开关
      maxCount: { type: Number, default: 1 }, //最大上传数量
      sendImmerdiatly: { type: Boolean, default: false }, //是否在选择之后立即上传到七牛云
    },
    emits: [
      "change",
      "beforeUpload",
      "update:fileList",
      "remove",
      "afterUploadedSuccess",
    ],
    setup(props, { attrs, emit }) {
      const files = ref([]);
      const previewVisible = ref(false);
      const previewUrl = ref("");
      const previewFileType = ref("");
      var {
        accept,
        fileList,
        name,
        listType,
        multiple,
        maxCount,
        disabled,
        showUploadList,
        sendImmerdiatly,
      } = toRefs(props);
      function customRequest(obj) {
        var idx = files.value.findIndex((element) => {
          if (element.uid === obj.file.uid) {
            return true;
          } else {
            return false;
          }
        });
        if (sendImmerdiatly.value) {
          new QiniuUpload({
            file: obj.file,
            name: obj.file.name,
            observer: {
              next(res) {
                console.log(res);
                files.value[idx].status = "uploading";
              },
              error(err) {
                console.log(err);
                files.value[idx].status = "error";
                message.error(err.data.error);
              },
              complete(res) {
                files.value[idx].url = res.key;
                files.value[idx].status = "done";
                emit("afterUploadedSuccess", files.value[idx]);
              },
            },
          });
        } else {
          files.value[idx].status = "done";
        }
      }
      onMounted(() => {
        files.value = fileList.value;
      });
      watch(
        () => props.fileList,
        (fl, prFL) => {
          files.value = fileList.value;
          if (fl != prFL && fl.length == 0) {
            //重置了
            files.value = [];
          }
        }
      );
      return () =>
        h(
          <>
            <a-upload
              accept={accept.value}
              v-model={[fileList.value, "fileList"]}
              name={name.value}
              list-type={listType.value}
              multiple={multiple.value}
              max-count={maxCount.value}
              disabled={disabled.value}
              show-upload-list={showUploadList.value}
              file-list={files.value}
              custom-request={customRequest}
              onPreview={(file) => {
                if (file.url) {
                  previewFileType.value = file.type;
                  previewUrl.value = file.url;
                  previewVisible.value = true;
                } else {
                  previewFileType.value = file.type;
                  var blob = new Blob([file.originFileObj]);
                  var url = URL.createObjectURL(blob);
                  previewUrl.value = url;
                  previewVisible.value = true;
                }
              }}
              onRemove={(file) => {
                files.value = files.value.filter((f) => f.uid != file.uid);
                emit("remove", file);
                emit("update:fileList", files.value);
              }}
              onChange={(info) => {
                files.value = info.fileList;
                emit("change", info.file);
                emit("update:fileList", info.fileList);
              }}
              before-upload={(file, flist) => {
                emit("beforeUpload", file, flist);
              }}
              {...attrs}
            >
              {{
                default: () => (
                  <div>
                    <div style="display:block">
                      <PlusOutlined></PlusOutlined>
                    </div>
                    <div style="display:block" class="ant-upload-text">
                      上传
                    </div>
                  </div>
                ),
                itemRender: ({ originNode, file, actions }) => {
                  if (/image\/*/.test(file.type)) {
                    return <originNode />;
                  } else if (/video\/*/.test(file.type)) {
                    var url;
                    if (file.url) {
                      url = file.url;
                    } else {
                      var blob = new Blob([file.originFileObj]);
                      url = URL.createObjectURL(blob);
                    }
                    return (
                      <div style="width:100%;height:100%;overflow:hidden;position:relative;">
                        <a-button
                          style="position:absolute;top:40%;left:12%;background:#727272;z-index:333;"
                          shape="circle"
                          ghost
                          size="small"
                          onClick={actions.preview}
                        >
                          {{ icon: () => <EyeOutlined /> }}
                        </a-button>
                        <a-button
                          style="position:absolute;top:40%;right:12%;background:#727272;z-index:333;"
                          shape="circle"
                          ghost
                          size="small"
                          onClick={actions.remove}
                        >
                          {{ icon: () => <DeleteOutlined /> }}
                        </a-button>
                        <video style="width:100%;height:100%;" src={url}></video>
                      </div>
                    );
                  } else {
                    return <originNode />;
                  }
                },
              }}
            </a-upload>
            {/image\/*/.test(previewFileType.value) ? (
              <a-image
                style={{ display: "none" }}
                src={previewUrl.value}
                preview={{
                  visible: previewVisible.value,
                  onVisibleChange: (value) => (previewVisible.value = value),
                }}
              ></a-image>
            ) : /video\/*/.test(previewFileType.value) ? (
              <div
                style={{
                  display: previewVisible.value ? "flex" : "none",
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  zIndex: "99999",
                  top: 0,
                  left: 0,
                  alignItems: "cener",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                <video src={previewUrl.value} controls="controls"></video>
                <a-button
                  type="primary"
                  style="position:absolute;top:0;right:0;z-index:1;"
                  onClick={() => {
                    previewFileType.value = "";
                    previewUrl.value = "";
                    previewVisible.value = false;
                  }}
                >
                  {{ icon: () => <CloseOutlined /> }}
                </a-button>
              </div>
            ) : (
              <div
                style={{ display: previewVisible.value ? "block" : "none" }}
              ></div>
            )}
          </>
        );
    },
  };
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
export const ImportFromLocal = {
  //上传2，导入功能，不渲染所上传对象的列表;
  props: {
    btn: { type: Boolean, default: true },
    btnTxt: { type: String, default: "上传" },
    name: { type: String, default: "file" },
    fileList: { type: Array, default: [] },
    action: { type: String, default: "" },
  },
  emits: ["change", "update:fileList"],
  setup(props, { emit, slots }) {
    var store = useConfig();
    const header = { Authorization: "bearer " + store.userToken };
    var action = `${store.apiHost}${props.action}`;
    const loading = ref(false);
    const {fileList} = toRefs(props);
    const files = ref([]);
    onMounted(() => {
      files.value = fileList.value;
    });
    watch(
      () => props.fileList,
      (fl, prFL) => {
        files.value = fileList.value;
        if (fl != prFL && fl.length == 0) {
          //重置了
          files.value = [];
        }
      }
    );
    return () =>
      h(
        <a-upload
          v-model={[fileList.value, "fileList"]}
          file-list={files.value}
          name={props.name}
          action={action}
          headers={header}
          max-count={1}
          show-upload-list={false}
          onChange={(value) => {
            files.value = value.fileList;
            console.log(value);
            if(value.file.status==="done"){
              console.log(value.file);
            }
            if (value.file.response) {
              loading.value = false;
              var { response } = value.file;
              if (response.code == 1) {
                emit("change", value);
                emit("update:fileList", value.fileList);
                message.success(response.msg);
              } else {
                message.error(response.msg);
              }
            }
          }}
        >
          {props.btn ? (
            <a-button loading={loading.value}>
              {{
                icon: () =>
                  slots.icon ? (
                    slots.icon()
                  ) : (
                    <>
                      <UploadOutlined></UploadOutlined>
                    </>
                  ),
                default: () =><>
                  {props.btnTxt?(<span>{props.btnTxt}</span>):(<UploadOutlined></UploadOutlined>)}
                </>,
              }}
            </a-button>
          ) : (
            <>
              {slots.default ? (
                slots.default()
              ) : (
                <UploadOutlined></UploadOutlined>
              )}
              {props.btnTxt}
            </>
          )}
        </a-upload>
      );
  },
};
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
export const AddATag = {
    props: {
      allowClear: { type: Boolean, default: true },
      placeholder: { type: String, default: "可不填写" },
      modelValue: { type: String, default: "" },
    },
    emits: ["modelValue", "update:modelValue"],
    setup(props, { attrs, emit }) {
      const tagList = ref("");
      onMounted(() => {
        tagList.value = props.modelValue;
      });
      watch(
        () => props.modelValue,
        (cur, old) => {
          if (cur != old && old == "") {
            tagList.value = props.modelValue;
          }
          if (cur != old && cur == "") {
            tagList.value = props.modelValue;
          }
        }
      );
      var { allowClear, placeholder } = toRefs(props);
      function addATag(value) {
        if (value == "") {
          message.error("标签不能为空");
          return false;
        }
        if (
          value.match(/\s/g) != null &&
          value.match(/\s/g).length === value.length
        ) {
          message.error("标签不能为空");
          return false;
        }
        var updatedValue = "";
        if (tagList.value != "") {
          var q = tagList.value.split(",");
          q.push(value);
          updatedValue = q.toString();
        } else {
          updatedValue = value;
        }
        text.value = "";
        tagList.value = updatedValue;
        emit("update:modelValue", updatedValue);
      }
      function tagClose(e) {
        var cv = tagList.value.split(",");
        var index = cv.findIndex((element) => {
          if (element === e) {
            return true;
          } else {
            return false;
          }
        });
        cv.splice(index, 1);
        var p = cv.toString();
        tagList.value = p;
        emit("update:modelValue", p);
      }
      const text = ref("");
      return () =>
        h(
          <>
            {tagList.value.split(",").map((v) =>
              v != "" ? (
                <a-tag
                  color="orange"
                  visible={true}
                  closable
                  onClose={() => {
                    tagClose(v);
                  }}
                >
                  {v}
                </a-tag>
              ) : null
            )}
            <a-input-search
              size="small"
              type="text"
              {...attrs}
              allowClear={allowClear.value}
              placeholder={placeholder.value}
              v-model={[text.value, "value"]}
              onSearch={addATag}
            >
              {{ enterButton: () => <a-button>添加</a-button> }}
            </a-input-search>
          </>
        );
    },
  };
export {RenderEmpty,WorKTypeCom,ActionConfirm};
