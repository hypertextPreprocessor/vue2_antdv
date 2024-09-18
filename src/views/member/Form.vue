<template>
    <div>
        <a-form
            ref="formRef"
            :model="formState"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            @finish="handleFinish"
        >
            <a-form-item
                label="公司名称"
                name="memberName"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '公司名称称必填' }]"
            >
                <a-input v-model:value="formState.memberName" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="成员类型"
                name="companyType"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '成员类型必填' }]"
            >
                <MemberType v-model:value="formState.companyType"/>
            </a-form-item>
            <a-form-item
                label="行业分类"
                name="tradeType"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '行业分类必填' }]"
            >
                <Carrera v-model:value="formState.tradeType" @change="tradeTypeChange"/>
            </a-form-item>
            <a-form-item
                label="注册地址"
                name="regAddress"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '注册地址必填' }]"
            >
                <a-input v-model:value="formState.regAddress" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="入会时间"
                name="joinDate"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '入会时间必填' }]"
            ><!--[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]-->
                <a-date-picker style="width: 100%;" v-model:value="formState.joinDate" format="YYYY-MM-DD HH:mm:ss" show-time placeholder="请选择时间" @change="onChange" @ok="onOk" />
                
            </a-form-item>
            <a-form-item
                label="代表人"
                name="legalName"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '代表人必填' }]"
            >
                <a-input v-model:value="formState.legalName" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="代表人职务"
                name="legalJob"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '代表人职务必填' }]"
            >
                <a-input v-model:value="formState.legalJob" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="代表人联系方式"
                name="legalPhone"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '代表人联系方式必填' }]"
            >
                <a-input v-model:value="formState.legalPhone" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="常用联系人"
                name="comName"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
            >
                <a-input v-model:value="formState.comName" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="联系方式"
                name="comPhone"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
            >
                <a-input v-model:value="formState.comPhone" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="备注"
                name="remark"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
            >
                <a-input v-model:value="formState.remark" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="状态"
                name="status"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '注册地址必填' }]"
            >
                <MemberStatus v-model:value="formState.status"></MemberStatus>
            </a-form-item>
            <a-form-item
                label="详细介绍"
                name="info"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:20}"
                :rules="[{ required: true, message: '注册地址必填' }]"
            >
                <RichTextEditor v-model="formState.info"/>
            </a-form-item>
            <a-form-item :wrapperCol="{span:3,offset:1}">
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="submiting">提交</a-button>
                    <a-button @click="resetForm">重置</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import {ref,reactive,onMounted,inject} from "vue";
import {loadMemberById,addMember,editMember} from "@api";
import {Carrera,MemberType,MemberStatus} from "@coms/dict.js"
import { message } from "ant-design-vue";
import RichTextEditor from "@coms/RichTextEditor.vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {carreralist} from "@apis/dictReq.js";
dayjs.locale('zh-cn');
const formRef = ref();
const listRef = inject("listRef")
const props = defineProps(['memberId']);
const submiting = ref(false);
const formStatus = ref("add");
const formState = reactive({
    id:undefined,
    memberName:undefined,
    companyType:undefined,
    tradeType:[],
    tradeTypeStr:undefined,
    regAddress:undefined,
    joinDate:undefined,
    legalName:undefined,
    legalJob:undefined,
    legalPhone:undefined,
    comName:undefined,
    comPhone:undefined,
    remark:undefined,
    status:undefined,
    info:[]
});
function memberInfo(id){
    loadMemberById(id).then(({data:D})=>{
        var {code,data} = D;
        if(code === 1){
            formState.id=data.id;
            formState.memberName=data.memberName;
            formState.companyType=data.companyType;
            formState.tradeType= typeIdArrConvertor(data.tradeType);
            formState.tradeTypeStr = data.tradeType;
            formState.regAddress=data.regAddress;
            formState.joinDate=dayjs(data.joinDate,'YYYY-MM-DD HH:mm:ss');
            formState.legalName=data.legalName;
            formState.legalJob=data.legalJob;
            formState.legalPhone=data.legalPhone;
            formState.comName=data.comName;
            formState.comPhone=data.comPhone;
            formState.remark=data.remark;
            formState.status=data.status;
            //这里是一个bug,照常理不应该这样做。应该解决app上的副文本编辑器与H5的副文本不兼容的问题;
            //data.info = data.info.replace(/"source"/g,"\"image\"");
            //===================但是先这样子吧====================================
            try{
                formState.info = JSON.parse(data.info).ops; //{ops:JSON.parse(data.info)};
            }catch(e){
                console.log(e)
            }
        }
    });
}
onMounted(()=>{
    if(props.memberId!=undefined){
        formStatus.value = "edit";
        memberInfo(props.memberId);
    }
});
function handleFinish(values){
    submiting.value = true;
    var reqdata = Object.assign(values,{
        tradeType:formState.tradeTypeStr,
        info:JSON.stringify(formState.info)
    });
    if(props.memberId==undefined){
        addMemberSubmit(reqdata);
    }else{
        reqdata.id = props.memberId;
        editMemberSubmit(reqdata);
    }
}
function addMemberSubmit(data){
    addMember(data).then(res=>{
        submiting.value = false;
        if(res.data.code === 1){
            message.success(res.data.msg);
            listRef.value.loadData();
        }
    })
}
function editMemberSubmit(data){
    editMember(data).then(res=>{
        submiting.value = false;
        if(res.data.code === 1){
            message.success(res.data.msg);
            listRef.value.loadData();
        }
    })
}
function resetForm(){
    formRef.value.resetFields();
}
function onChange(d){
    formState.joinDate = d.format("YYYY-MM-DD HH:mm:ss");
}
function onOk(d){
    formState.joinDate = d.format("YYYY-MM-DD HH:mm:ss");
}
function typeIdArrConvertor(commaSplittedStr){
    var strArr = commaSplittedStr.split(",");
    carreralist().then(({data:D})=>{
        var {code,data}= D;
        var ids = [];
        if(code === 1){
            for(var i=0;i<strArr.length;i++){
                for(var j=0;j<data.length;j++){
                    if(strArr[i] === data[j].tradeName){
                        ids.push(data[j].id);
                    }
                }
            }
            formState.tradeType = ids;
        }
    });
    return [];
}
function tradeTypeChange(c){
    var arr = [];
    carreralist().then(res=>{
        if(res.data.code==1){
            for(var j=0;j<c.length;j++){
                for(var i=0;i<res.data.data.length;i++){
                    if(c[j] == res.data.data[i].id){
                        arr.push(res.data.data[i].tradeName);
                    }
                }
            }
        }
        formState.tradeTypeStr = arr.toString();
    })
}
</script>