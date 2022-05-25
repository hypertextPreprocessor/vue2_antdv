<template>
    <a-layout-content>
        <a-card>
            <template #title>
                <a-button type="primary" ghost>
                    <template #icon><ReloadOutlined/></template>
                </a-button>
            </template>
            <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="data"
            >
                <template #bodyCell="{column}">
                    <template v-if="column.dataIndex==='operation'">
                        <a-space>
                            <a-button type="primary" ghost>
                                <template #icon><EditOutlined/></template>
                            </a-button>
                            <a-popconfirm
                                title="确定要删除吗？"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="()=>{}"
                                @cancel="()=>{}"
                            >
                                <a-button type="primary" ghost danger>
                                    <template #icon><DeleteOutlined/></template>
                                </a-button>
                            </a-popconfirm>
                        </a-space>
                    </template>
                </template>
            </a-table>
            <a-divider/>
            <a-space>
                <a-button type="primary" @click="()=>{drawer = true}">新增</a-button>
                <a-button type="primary" danger>批量删除</a-button>
            </a-space>
        </a-card>
        <a-drawer
            v-model:visible="drawer"
            title="新建"
            placement="right"
        >
            <a-form
                :wrapper-row="{span:6}"
                :wrapper-col="{ span:18 }"
                :model="drawerState"

            >
                <a-form-item name="order" label="序号">
                    <a-input-number v-model:value="drawerState.order" :min="1" style="width:100%"/>
                </a-form-item>
                <a-form-item name="option" label="选项">
                    <a-input v-model:value="drawerState.option" placeholder="A.B.C.D..."/>
                </a-form-item>
                <a-form-item name="attr" label="关联属性">
                    <a-select
                        v-model:value="drawerState.type"
                        show-search
                        placeholder="选择一个类别"
                        style="width:100%"
                        :options="options"
                        :filter-option="filterOption"
                    ></a-select>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-space>
                    <a-button @click="onveClose">取消</a-button>
                    <a-button type="primary" @click="onveClose">提交</a-button>
                </a-space>
            </template>
        </a-drawer>
    </a-layout-content>
</template>
<script setup>
import {ReloadOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';
import {reactive,computed,ref} from 'vue';
const drawer = ref(false);
const drawerState = reactive({});
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
function onveClose(){
    drawer.value = false;
}
const options = [{
    value:"0",label:"企业组网"
},{
    value:"1",label:"专线"
},{
    value:"2",label:"其他类"
},{
    value:"3",label:"宽带"
},{
    value:"4",label:"国际业务"
}];
const state = reactive({
    selectedRowKeys:[],

});
const selectedRowKeys=ref([]);
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(hasSelected);
    state.selectedRowKeys = selectedRowKeys;
};
const columns=[{
    title:"序号",
    dataIndex:"order",
},{
    title:"问题",
    dataIndex:"question",
},{
    title:"操作",
    dataIndex:"operation"
}];
const data = [{
    order:"0",
    question:"您的企业需要哪类网固网产品"
}];
</script>