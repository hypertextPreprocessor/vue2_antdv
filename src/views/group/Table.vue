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
                name="starName"
            >
                <a-input v-model:value="formState.starName" placeholder="输入关键字"/>
            </a-form-item>
            <a-form-item
                label="公司"
                name="company"
            >
                <a-input v-model:value="formState.company" placeholder="输入关键字"/>
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
const formState = reactive({starName:"",company:""});
const emit = defineEmits(["addMember","editMember"]);
const dataSource = ref([]);
const formRef = ref();
const columns=[
    {
        title:"名称",
        dataIndex:"starName",
        key:"starName"
    },{
        title:"公司",
        dataIndex:"company",
        key:"company"
    },{
        title:"新增时间",
        dataIndex:"legalName",
        key:"legalName"
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