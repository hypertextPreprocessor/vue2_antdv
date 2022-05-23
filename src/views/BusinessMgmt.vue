<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-form
                    class="ant-advanced-search-form"
                    layout="inline"
                    :model="filterState"
                >
                    <a-form-item>
                         <a-input v-model:value="filterState.user" placeholder="这里输入姓名">
                            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                         </a-input>
                    </a-form-item>
                    <a-form-item>
                         <a-range-picker v-model:value="filterState.dateRange" placeholder="选择日期范围"/>
                    </a-form-item>
                    <a-form-item name="city">
                        <a-cascader
                            v-model:value="filterState.city"
                            :options="cities"
                            style="width:100%;"
                            change-on-select
                            expand-trigger="hover"
                            placeholder="楼宇所在区域"
                        />
                    </a-form-item>
                    <a-form-item>
                         <a-input v-model:value="filterState.user" placeholder="这里输入楼宇或编码">
                            <template #prefix><SearchOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                         </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-model:value="filterState.status"
                            show-search
                            style="width: 100%"
                            placeholder="状态选择"
                            :options="statusOptions"
                            :filter-option="filterOption"
                        ></a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-select
                            v-model:value="filterState.productType"
                            show-search
                            style="width:100%"
                            placeholder="产品类别"
                            :options="productType"
                            :filter-option="filterOption"
                        ></a-select>
                    </a-form-item>
                    <a-space>
                        <a-button type="primary" size="middle">
                            <template #icon>
                                <SearchOutlined />
                            </template>
                            搜索
                        </a-button>
                        <a-button type="primary" size="middle">
                            <template #icon>
                                <DownloadOutlined />
                            </template>
                            下载
                        </a-button>
                    </a-space>
                </a-form>
                <a-divider/>
                <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'action'">
                            <a-space>
                                <a-select
                                    show-search
                                    placeholder="徐安泽"
                                    :options="statusOptions"
                                    :filter-option="filterOption"
                                >
                                </a-select>
                                <a-button type="primary" ghost @click="()=>{infoVisible=true}">详情</a-button>
                                <a-button @click="()=>{forwardVisible=true}">转派</a-button>
                            </a-space>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-layout-content>
        <a-modal v-model:visible="infoVisible" title="详情">
            <template #footer>
                <a-button key="submit" type="primary" @click="closeModel">关闭</a-button>
            </template>
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
            >
                <a-form-item label="产品名称">
                    <a-input value="测试请勿选择" disabled/>
                </a-form-item>
                <a-form-item label="联系人">
                    <a-input value="阿尖哥" disabled/>
                </a-form-item>
                <a-form-item label="联系方式">
                    <a-input value="15655666689" disabled/>
                </a-form-item>
                <a-form-item label="客户经理名称">
                    <a-input value="钱骏瑞" disabled/>
                </a-form-item>
                <a-form-item label="客户经理联系方式">
                    <a-input value="13632268721" disabled/>
                </a-form-item>
                <a-form-item label="楼宇名称">
                    <a-input value="衡纬测试（钱）" disabled/>
                </a-form-item>
                <a-form-item label="楼宇地址详情">
                    <a-input value="广东省广州市丰伟大厦108号" disabled/>
                </a-form-item>
                <a-form-item label="企业名称">
                    <a-input value="衡纬公司" disabled/>
                </a-form-item>
                <a-form-item label="房号">
                    <a-input value="07A" disabled/>
                </a-form-item>
                <a-form-item label="备注">
                    <a-input value="无" disabled/>
                </a-form-item>
                <a-form-item label="当前状态">
                    <a-input value="超时未处理" disabled/>
                </a-form-item>
                <a-form-item label="下单时间">
                    <a-input value="2022-05-23" disabled/>
                </a-form-item>
                <a-form-item label="处理时间">
                    <a-input value="2022-05-23" disabled/>
                </a-form-item>
                <a-form-item label="结束时间">
                    <a-input value="2022-05-23" disabled/>
                </a-form-item>
                <a-form-item label="处理超时时长(h)">
                    <a-input value="88" disabled/>
                </a-form-item>
                <a-form-item label="结束超时时长(h)">
                    <a-input value="0.0" disabled/>
                </a-form-item>
                <a-form-item label="取消原因">
                    <a-input value="无" disabled/>
                </a-form-item>
                <a-form-item label="成交受理单">
                    <a-input value="无" disabled/>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="forwardVisible" title="转派">
            <template #footer>
                <a-button key="submit" type="primary" @click="closeModel">确定</a-button>
            </template>
            <a-select
                show-search
                style="width: 100%"
                placeholder="状态选择"
                :options="statusOptions"
                :filter-option="filterOption"
>
            </a-select>
        </a-modal>
    </a-layout>
</template>
<script setup>
import {reactive,ref} from 'vue';
import {UserOutlined,SearchOutlined,DownloadOutlined} from '@ant-design/icons-vue';
function closeModel(){
    infoVisible.value=false;
}
const filterState = reactive({});
const infoVisible = ref(false);
const forwardVisible = ref(false);
const statusOptions = [
    {value:"all",label:"全部"},
    {value:"1",label:"无资源"},
    {value:"2",label:"未处理"},
    {value:"3",label:"超时未处理"},
    {value:"4",label:"正在跟进处理"},
    {value:"5",label:"超时未结束"},
    {value:"6",label:"订单完成"},
    {value:"7",label:"订单取消"}];
const productType=[
    {value:"0",label:"云联网"},
    {value:"1",label:"宽带网"},
    {value:"2",label:"互联网"},
    {value:"3",label:"通信子网"}
];
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const cities = [{
    value: 'gd',
    label: '广东',
    children:[
        {value:"gz",label:"广州",children:[{label:"越秀区",value:"yuexiu"}]},
        {value:"qy",label:"清远"},
        {value:"st",label:"汕头"},
    ]
}];
const columns=[{
    title:"序号",
    dataIndex:"id",
    key:"id"
},{
    title:"客户经理名称",
    dataIndex:"name",
    key:"name" 
},{
    title:"组织",
    dataIndex:"org",
    key:"org" 
},{
    title:"联系人",
    dataIndex:"contact",
    key:"contact" 
},{
    title:"	联系方式",
    dataIndex:"tel",
    key:"tel" 
},{
    title:"楼宇名称",
    dataIndex:"bldgName",
    key:"bldgName" 
},{
    title:"房号",
    dataIndex:"roomno",
    key:"roomno" 
},{
    title:"产品名称",
    dataIndex:"productName",
    key:"productName" 
},{
    title:"时间",
    dataIndex:"date",
    key:"date" 
},{
    title:"成交受理单",
    dataIndex:"bill",
    key:"bill" 
},{
    title:"操作",
    dataIndex:"action",
    key:"action" ,
    fixed:"right",
    width:300
}];
const data = [{
    id:"1",
    name:"喵喵哒",
    org:"广东省",
    contact:"喵喵哒",
    tel:"13435505550",
    bldgName:"丰伟大厦",roomno:"7#",productName:"政企精品网",date:"2022-05-23",bill:"无"

}]
</script>
<style scoped>
    /*
    .ant-advanced-search-form{
        grid-template-columns: auto auto auto;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
    }
    .ant-advanced-search-form .ant-form-item{
        margin-bottom:24px !important;
    }
    */
</style>