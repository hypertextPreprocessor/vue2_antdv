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
            <template #bodyCell="{column,text,record}">
                <template v-if="column.dataIndex === 'companyType'">
                    <Mtp :type="text"></Mtp>
                </template>
                <template v-if="column.dataIndex === 'joinDate'">
                    {{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
                <template v-if="column.dataIndex==='actions'">
                    <a-space>
                        <a-button size="small" @click="emit('editMember',record)">修改</a-button>
                        <ActionConfirm 
                            @clickyes="()=>{
                                deleteMember(record,index);
                            }" 
                            btn-size="small">
                            删除
                        </ActionConfirm>
                    </a-space>
                </template>
            </template>
        </a-table> 
    </div>
</template>
<script setup>
import {reactive,ref,onMounted} from "vue";
import {loadMemberPageList,delMember} from "@api";
import {ActionConfirm} from "@coms/frequentUsed.js";
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
const formState = reactive({memberName:"",legalName:""});
const emit = defineEmits(["addMember","editMember"]);
const dataSource = ref([]);
const pagination = reactive({
    defaultPageSize:10,
    showSizeChanger: false,
    total:0,
    showTotal: (total) => `共${total}条数据`,
});
const tableLoading = ref(true);
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
const current = ref(1);
function tableChange(pagination){
    var { current, pageSize } = pagination;
    var memberName = formState.memberName;
    var legalName = formState.legalName;
    loadData({current:current,size:pageSize,memberName,legalName});
}
onMounted(()=>{
    loadData({current:current.value});
})
function loadData({current=1,size=10,memberName="",legalName=""}={}){
    loadMemberPageList({current,size,memberName,legalName}).then(({data:D})=>{
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
    loadData({current:1,size:10,memberName:values.memberName,legalName:values.legalName});
}
const resetForm = () => {
    formRef.value.resetFields();
};
function deleteMember(r,i){
    delMember(r.id).then(({data:D})=>{
        var {code,msg} = D;
        if(code === 1){
            message.success(msg);
            dataSource.value.splice(i,1);
        }
    });
}
const Mtp = {
    props:{
        type:{type:String,default:undefined}
    },
    setup(props){
        return ()=><>
            {props.type==1?
                <a-tag color="pink">会长单位</a-tag>:
            (props.type==2?
                <a-tag color="orange">副会长单位</a-tag>:
            (props.type==3?
                <a-tag color="green">理事单位</a-tag>:
            (props.type==4?
                <a-tag color="cyan">成员单位</a-tag>:
                <span>暂定</span>
            )))}
        </>
    }
}
defineExpose({loadData});
</script>