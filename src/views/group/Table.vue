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
                <a-button type="primary" @click="emit('addGroup')">新增</a-button>
            </template>
            <template #bodyCell="{column,record}">
                <template v-if="column.dataIndex==='actions'">
                    <a-space>
                        <a-button size="small" @click="emit('editGroup',record)">修改</a-button>
                        <ActionConfirm @clickyes="()=>{
                                deleteGroup(record,index);
                            }" btn-size="small">删除</ActionConfirm>
                    </a-space>
                </template>
            </template>
        </a-table> 
    </div>
</template>
<script setup>
import {reactive,ref,onMounted} from "vue";
import { delGroup,loadGroupPageList } from "@api";
import {ActionConfirm} from "@coms/frequentUsed.js";
import { message } from "ant-design-vue";
const formState = reactive({starName:"",company:""});
const emit = defineEmits(["addGroup","editGroup"]);
const dataSource = ref([]);
const formRef = ref();
const pagination = reactive({
    defaultPageSize:10,
    showSizeChanger: false,
    total:0,
    showTotal: (total) => `共${total}条数据`,
});
const tableLoading = ref(true);
const current = ref(1);
function tableChange(pagination){
    var { current, pageSize } = pagination;
    var starName = formState.starName;
    var company = formState.company;
    loadData({current:current,size:pageSize,starName,company});
}
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
onMounted(()=>{
    loadData({current:current.value});
})
function loadData({current=1,size=10,starName="",company=""}={}){
    loadGroupPageList({current,size,starName,company}).then(({data:D})=>{
        var {code,data} = D;
        tableLoading.value = false;
        if(code === 1){
            dataSource.value = data.records;
            pagination.total = data.total;
            pagination.current = current;
            pagination.defaultPageSize = data.size;
        }
    })
}
function onFinish(values){
    pagination.defaultPageSize = 10;
    pagination.total = 0;
    pagination.current = 1;
    tableLoading.value = true;
    loadData({current:1,size:10,starName:values.starName,company:values.company});
}
const resetForm = () => {
    formRef.value.resetFields();
};
function deleteGroup(r,i){
    delGroup(r.id).then(({data:D})=>{
        var {code,msg} = D;
        if(code === 1){
            message.success(msg);
            dataSource.value.splice(i,1);
        }
    });
}
defineExpose({loadData});
</script>