<template>
    <a-layout-content>
        <a-card title="公告">
            <a-table :columns="columns" :data-source="dataSource" bordered>
                <template #bodyCell="{ column,text,index,record }">
                    <template v-if="['context'].includes(column.dataIndex)">
                        <div v-if="record.editable===true">
                            <a-input v-model:value="dataSource[index].context" :placeholder="dataSource[index].context"/>
                        </div>
                        <div v-else>{{text}}</div>
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">

                        <a-button v-if="record.editable===false" type="primary" @click="editThisLine(record)">
                            <template #icon><EditOutlined/></template>
                        </a-button>
                        <template v-else>
                            <a-space>
                                <a-button type="link" @click="saveThisLine(record)">保存</a-button>
                                <a-button type="link" style="color:red;" @click="cancelThisLine(record)">取消</a-button>
                            </a-space>
                        </template>
                    </template>
                </template>
            </a-table>
        </a-card>
    </a-layout-content>
</template>
<script setup>
import {EditOutlined} from '@ant-design/icons-vue';
import {reactive} from 'vue';
function editThisLine(data){
    data.editable = true;
    console.log(data);
}
function saveThisLine(data){
    data.editable = false;
}
function cancelThisLine(data){
    data.editable = false;
}
const columns=[{
    title: '序号',
    dataIndex: 'order',
    key:"order"
},{
    title: '公告内容',
    dataIndex: 'context',
    key:"context"
},{
    title:'操作',
    dataIndex: 'operation',
    key:"operation",
    width:"200",
    fixed: 'right',
}];
const dataSource=reactive([{
    order:"0",
    context:"如果您有任何疑问，可点击【我的管家】-搜索企业所在的楼宇名称-快速找到您的通信管家。",
    editable:false
}]);
</script>