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
                label="姓名"
                name="starName"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '公司名称称必填' }]"
            >
                <a-input v-model:value="formState.starName" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="公司名称"
                name="company"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '成员类型必填' }]"
            >
                <a-input v-model:value="formState.company" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="职位"
                name="job"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '行业分类必填' }]"
            >
                <a-input v-model:value="formState.job" placeholder="最多20个字符"/>
            </a-form-item>
            <a-form-item
                label="备注"
                name="remark"
                :labelCol="{span:3,offset:0}"
                :wrapperCol="{span:6}"
                :rules="[{ required: true, message: '注册地址必填' }]"
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
                <MemberStatus v-model:value="formState.status"/>
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
import {loadGroupById,addGroup,editGroup} from "@api";
import { message } from "ant-design-vue";
import RichTextEditor from "@coms/RichTextEditor.vue";
import {MemberStatus} from "@coms/dict.js"
const listRef = inject("listRef")
const props = defineProps(['groupId']);
const formRef = ref();
const submiting = ref(false);
const formStatus = ref("add");
const formState = reactive({
    id:undefined,
    starName:undefined,
    company:undefined,
    job:undefined,
    remark:undefined,
    status:undefined,
    info:[]
});
function groupInfo(id){
    loadGroupById(id).then(({data:D})=>{
        var {code,data} = D;
        if(code === 1){
            formState.id=data.id;
            formState.starName=data.starName;
            formState.company=data.company;
            formState.job=data.job;
            formState.remark=data.remark;
            formState.status=data.status;
            //这里是一个bug,照常理不应该这样做。应该解决app上的副文本编辑器与H5的副文本不兼容的问题;
            //data.info = data.info.replace(/"source"/g,"\"image\"");
            //===================但是先这样子吧====================================
            formState.info = JSON.parse(data.info).ops;// {ops:JSON.parse(data.info)};
        }
    });
}
onMounted(()=>{
    if(props.groupId!=undefined){
        formStatus.value = "edit";
        groupInfo(props.groupId);
    }
});
function handleFinish(values){
    var reqdata = Object.assign(values,{
        info:JSON.stringify(formState.info)
    });
    submiting.value = true;
    if(props.groupId==undefined){
        addGroupSubmit(reqdata);
    }else{
        reqdata.id = props.groupId;
        editGroupSubmit(reqdata);
    }
}
function addGroupSubmit(data){
    addGroup(data).then(res=>{
        submiting.value = false;
        if(res.data.code === 1){
            message.success(res.data.msg);
            listRef.value.loadData();
        }
    })
}
function editGroupSubmit(data){
    editGroup(data).then(res=>{
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
</script>