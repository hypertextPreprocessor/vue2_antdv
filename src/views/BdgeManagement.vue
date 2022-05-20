<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-form
                    layout="inline"
                    :model="filterState"
                    @finish="(values)=>{console.log(values)}"
                    @finishFailed="(error)=>{console.log(error)}"
                >
                    <a-form-item name="keyWords">
                        <a-input v-model:value="filterState.keyWords" placeholder="输入名称或编号">
                            <template #prefix>
                                <SearchOutlined/>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="city">
                        <a-cascader
                            v-model:value="filterState.city"
                            :options="cities"
                            style="width:360px;"
                            change-on-select
                            expand-trigger="hover"
                            placeholder="楼宇所在区域"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">查询</a-button>
                    </a-form-item>
                    <a-space>
                        <a-dropdown>
                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                    <a-menu-item key="1"><DownloadOutlined/>下载楼宇</a-menu-item>
                                    <a-menu-item key="2"><DownloadOutlined/>下载白皮书</a-menu-item>
                                    <a-menu-item key="3"><DownloadOutlined/>下载客户资源</a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                下载
                                <DownloadOutlined />
                            </a-button>
                        </a-dropdown>
                        <a-dropdown>
                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                    <a-menu-item key="12"><FileExcelFilled/>导入楼宇</a-menu-item>
                                    <a-menu-item key="12"><FileExcelFilled/>导入白皮书</a-menu-item>
                                    <a-menu-item key="12"><FileExcelFilled/>导入客户资源</a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                导入
                                <FileExcelFilled />
                            </a-button>
                        </a-dropdown>
                    </a-space>
                </a-form>
                <a-divider />
                <a-table :dataSource="dataSource" :columns="columns" >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'action'">
                           <a-space>
                               <a-button type="primary" size="small" @click="()=>{editThisItem(column, record)}">
                                   <template #icon>
                                        <EditOutlined />
                                    </template>
                                    编辑
                               </a-button>
                               <a-button size="small" @click="()=>{navigateToWitePaper(column, record)}">
                                   <template #icon>
                                        <BookOutlined />
                                    </template>
                                    白皮书
                               </a-button>
                               <a-button type="primary" danger size="small" @click="()=>{editThisItem(column, record)}">
                                   <template #icon>
                                        <DeleteOutlined />
                                    </template>
                                    删除
                               </a-button>
                           </a-space>
                        </template>
                    </template>
                </a-table>
                <a-divider/>
                <a-space>
                    <a-button type="primary" shape="default" size="large" @click="addNewItem">新增</a-button>
                    <a-button type="primary" shape="danger" size="large" @click="addNewItem" ghost>批量删除</a-button>
                </a-space>
            </a-card>
        </a-layout-content>
        <a-drawer
            v-model:visible="bldgAddVisiblity"
            class="custom-class"
            title="新增楼宇"
            placement="right"
        >
            <a-form
                :model="bldgAddState"
                name="bldgAdd"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
                @finish="(values)=>{console.log(values)}"
            >
                <a-form-item label="市名" name="city">
                    <a-input v-model:value="bldgAddState.city" placeholder="市名"/>
                </a-form-item>
                <a-form-item label="区/县名" name="courty">
                    <a-input v-model:value="bldgAddState.courty" placeholder="区/县名"/>
                </a-form-item>
                <a-form-item label="街道名" name="street">
                    <a-input v-model:value="bldgAddState.street" placeholder="街道名"/>
                </a-form-item>
                <a-form-item label="路名" name="road">
                    <a-input v-model:value="bldgAddState.road" placeholder="路名"/>
                </a-form-item>
                <a-form-item label="路号" name="roadNumber">
                    <a-input v-model:value="bldgAddState.roadNumber" placeholder="路号"/>
                </a-form-item>
                <a-form-item label="小区名" name="blockName">
                    <a-input v-model:value="bldgAddState.blockName" placeholder="小区名"/>
                </a-form-item>
                <a-form-item label="栋号" name="buildingTag">
                    <a-input v-model:value="bldgAddState.buildingTag" placeholder="栋号"/>
                </a-form-item>
                <a-form-item label="楼宇编号" name="buildingNumber">
                    <a-input v-model:value="bldgAddState.buildingNumber" placeholder="楼宇编号"/>
                </a-form-item>
                <a-form-item label="楼宇名称" name="buildingName">
                    <a-input v-model:value="bldgAddState.buildingName" placeholder="楼宇名称"/>
                </a-form-item>
                <a-form-item label="详细地址" name="address">
                    <a-input v-model:value="bldgAddState.address" placeholder="详细地址"/>
                </a-form-item>
                <a-form-item label="楼宇等级" name="grade">
                    <a-select
                        v-model:value="bldgAddState.grade"
                        show-search
                        style="width: 200px"
                        placeholder="选择楼宇等级"
                        :options="gradeOptions"
                        :filter-option="filterOption"
                    ></a-select>
                </a-form-item>
                <a-form-item label="楼宇管家" name="manager">
                    <a-select
                        v-model:value="bldgAddState.manager"
                        show-search
                        style="width: 200px"
                        placeholder="选择楼宇管家"
                        :options="managerOptions"
                        :filter-option="filterOption"
                        
                    ></a-select>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button style="margin-right: 8px" @click="onCloseAddDrawer">关闭</a-button>
                <a-button type="primary" @click="onConfrimAdd" :loading="AddBtnLoading">确认</a-button>
            </template>
        </a-drawer>
    </a-layout>
</template>
<script setup>
import {SearchOutlined,DownloadOutlined,FileExcelFilled,EditOutlined,DeleteOutlined,BookOutlined} from '@ant-design/icons-vue';
import {reactive,ref} from 'vue';
import {useRouter} from 'vue-router';
const filterState = reactive({});
const bldgAddState = reactive({});
const bldgAddVisiblity = ref(false);
var router = useRouter();
function navigateToWitePaper(c,r){
    console.log(c);
    console.log(r);
    router.push({name:"whitePaper"});
}
function editThisItem(c,r){
    console.log(c,r);
}
const onConfrimAdd =()=>{
        bldgAddVisiblity.value=false;
    }
    function onCloseAddDrawer(){
        bldgAddVisiblity.value=false;
    }
function handleMenuClick(e){
    console.log(e);
}
function addNewItem(){
    bldgAddVisiblity.value =  true;
}
const managerOptions=ref([
    {value: 'x',label: '章三'}
]);
const gradeOptions=ref([
    {value: 'a',label: 'A'},{value: 'b',label: 'B'},{value: 'c',label: 'C'}
]);

const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
  const columns = [
        {
            title: '登录用户',
            dataIndex: 'user',
            key: 'user',
        },{
            title: '登录账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },{
            title: '登录时间',
            dataIndex: 'loginTime',
            key: 'loginTime',
        },{
            title: 'IP地址',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
        },{
            title:"操作",
            dataIndex: 'action',
            key: 'action',
        }
    ]
    const dataSource = ref([{
        user: 'tanglin',
        userAccount: 'super',
        loginTime:"2022-05-20",
        ipAddress: '192.168.11.127',
    }]);
const cities = [{
    value: 'gd',
    label: '广东',
    children:[
        {value:"gz",label:"广州",children:[{label:"越秀区",value:"yuexiu"}]},
        {value:"qy",label:"清远"},
        {value:"st",label:"汕头"},
    ]
}];
</script>