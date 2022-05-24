<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-form
                    layout="inline"
                    :model="filterState"
                >
                    <a-form-item>
                        <a-input v-model:value="filterState.searchKeyWords" placeholder="输入关键字">
                            <template #suffix><SearchOutlined/></template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-model:value="filterState.coper"
                            show-search
                            placeholder="选择一个操作"
                            style="width: 200px"
                            :options="options"
                            :filter-option="filterOption"
                        ></a-select>
                    </a-form-item>
                    <a-form-item><a-button type="primary"> <template #icon><SearchOutlined /></template></a-button></a-form-item>
                </a-form>
                <a-divider/>
                <a-table
                    :dataSource="dataSource" :columns="columns"
                >
                    <template #bodyCell="{ column, text, index,record }">
                        <template v-if="['companyName','status'].includes(column.dataIndex)">
                            <div v-if="record.eidtable">
                                <template v-if="column.dataIndex==='companyName'">
                                    <a-input v-model:value="dataSource[index][column.dataIndex]" :placeholder="text"/>
                                </template>
                                <template v-else-if="column.dataIndex==='status'">
                                    <a-select
                                        v-model:value="dataSource[index][column.dataIndex]"
                                        show-search
                                        :placeholder="text"
                                        style="width:100px"
                                        :options="options"
                                        :filter-option="filterOption"
                                    >
                                    </a-select>
                                </template>
                            </div>
                            <div v-else>{{text}}</div>
                        </template>
                        <template v-else-if="column.dataIndex === 'options'">
                            <a-button v-if="record.eidtable===false" type="primary" @click="editfunc(record)">
                                <template #icon><EditOutlined /></template>
                            </a-button>
                            <template v-else>
                                <a-space>
                                    <a-button type="link" @click="()=>{
                                        dataSource[index].eidtable = false;
                                    }">保存</a-button>
                                    <a-button type="link" style="color:red;">取消</a-button>
                                </a-space>
                            </template>
                        </template>
                    </template>
                </a-table>
                <a-divider/>
                <a-space>
                    <a-button type="primary" @click="()=>{
                        modelVisible = true;
                    }">新增</a-button>
                </a-space>
            </a-card>
        </a-layout-content>
        <a-modal 
            v-model:visible="modelVisible" 
            title="新增" 
            cancelText="取消"
            okText="确认"
            @ok="()=>{modelVisible=false}"
        >
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                :model="addState"
            >
                <a-form-item name="companyName" label="企业名称">
                    <a-input v-model:value="addState.companyName" placeholder="输入企业名称"/>
                </a-form-item>
                <a-form-item name="status" label="状态">
                    <a-select
                        v-model:value="addState.status"
                        show-search
                        placeholder="选择一个操作"
                        style="width:100%"
                        :options="options"
                        :filter-option="filterOption"
                    ></a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-layout>
</template>
<script setup>
import {reactive,ref} from 'vue';
import {SearchOutlined,EditOutlined} from '@ant-design/icons-vue'
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const modelVisible = ref(false);
const options = [{label:"全部",value:"1"},{label:"有效",value:"2"},{label:"失效",value:"3"}]
const filterState = reactive({});
const addState = reactive({});
function editfunc(record){
    dataSource.map((ele)=>{
        if(ele.order===record.order){
            ele.eidtable = true;
        }
    });
}
const columns = [{
    title: '序号',
    dataIndex: 'order',
    key: 'order'
},{
    title: '企业名称',
    dataIndex: 'companyName',
    key: 'companyName'
},{
    title: '状态',
    dataIndex: 'status',
    key: 'status'
},{
    title: '操作',
    dataIndex: 'options',
    key: 'options'
}];
const dataSource=reactive([{
    order:"0",
    companyName:"测试企业（测试用）",
    status:"有效",
    eidtable:false
}]);
</script>