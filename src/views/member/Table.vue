<template>
    <div style="padding:0 13px;">
        <a-form
            ref="formRef"
            layout="inline"
            :model="formState"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            @finish="onFinish"
        >
            <a-form-item
                label="名称"
                name="memberName"
            >
                <a-input v-model:value="formState.memberName" placeholder="输入关键字"/>
            </a-form-item>
            <a-form-item
                label="代表人"
                name="legalName"
            >
                <a-input v-model:value="formState.legalName" placeholder="输入关键字"/>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit">搜索</a-button>
                    <a-button @click="resetForm">清空</a-button>
                </a-space>
            </a-form-item>
        </a-form>
        <div style="height:10px;"></div>
        <a-table
            :bordered="true"
            :dataSource="dataSource" :columns="columns" 
            :pagination="pagination"
            :loading="tableLoading"
            @change="tableChange"
        >
            <template #title>
                <a-button type="primary" @click="emit('addMember')">新增</a-button>
            </template>
            <template #bodyCell="{column,record}">
                <template v-if="column.dataIndex==='actions'">
                    <a-button @click="emit('editMember',record)">修改</a-button>
                </template>
            </template>
        </a-table> 
    </div>
</template>
<script setup>
import {reactive,ref} from "vue";
const formState = reactive({memberName:"",legalName:""});
const emit = defineEmits(["addMember","editMember"]);
const dataSource = ref([]);
const formRef = ref();
const columns=[
    {
        title:"名称",
        dataIndex:"memberName",
        key:"memberName"
    },{
        title:"类型",
        dataIndex:"companyType",
        key:"companyType"
    },{
        title:"代表人",
        dataIndex:"legalName",
        key:"legalName"
    },{
        title:"入会时间",
        dataIndex:"joinDate",
        key:"joinDate"
    },{
        title:"操作",
        dataIndex:"actions",
        key:"actions"
    }
];
const resetForm = () => {
    formRef.value.resetFields();
};
</script>