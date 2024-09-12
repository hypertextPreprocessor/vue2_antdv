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
                <a-input v-model:value="formState.status" placeholder="最多20个字符"/>
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
import {ref,reactive} from "vue";
import RichTextEditor from "@coms/RichTextEditor.vue";
const formRef = ref();
const submiting = ref(false);
const formState = reactive({
    id:undefined,
    starName:undefined,
    company:undefined,
    job:undefined,
    remark:undefined,
    status:undefined,
    info:[]
});
function handleFinish(values){
    console.log(values);
    submiting.value = true;
}
function resetForm(){
    formRef.value.resetFields();
}
</script>