<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                 <a-form
                    layout="inline"
                    :model="fliterState"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                >
                    <a-form-item name="searchKeyWords">
                        <a-input v-model:value="fliterState.searchKeyWords" placeholder="输入关键字">
                            <template #prefix>
                                <SearchOutlined/>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="EnterpriseType">
                        <a-select
                            v-model:value="fliterState.EnterpriseType"
                            show-search
                            placeholder="选择一种企业类型"
                            style="width: 200px"
                            :options="EnterpriseType"
                            :filter-option="filterOption"
                            @change="(value)=>{console.log(value)}"
                        ></a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">查询</a-button>
                    </a-form-item>
                </a-form>
                <a-divider/>
                <a-table :dataSource="dataSource" :columns="columns" />
                <a-divider/>
                <a-button type="primary" shape="default" size="large" @click="addNewItem">新增</a-button>
            </a-card>
        </a-layout-content>
        <a-drawer
            v-model:visible="addEnterpriseVisibility"
            class="custom-class"
            title="新增企业"
            placement="right"
        >
            <a-form
                :model="formAddState"
                name="add"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
                @finish="onAddFinish"
                @finishFailed="onAddFinishFailed"
            >
                <a-form-item label="企业类型" name="EnterpriseType">
                    <a-select
                        v-model:value="formAddState.EnterpriseType"
                        show-search
                        style="width: 200px"
                        placeholder="选择企业类型"
                        :options="EnterpriseType"
                        :filter-option="filterOption"
                        @change="(value)=>{console.log(value)}"
                    ></a-select>
                </a-form-item>
                <a-form-item label="企业搜索" name="searchEnterprise">
                        <a-input-search
                            v-model:value="formAddState.searchEnterprise"
                            placeholder="关键字搜索"
                            enter-button
                            @search="(searchValue)=>{console.log(searchValue)}"
                        />
                    </a-form-item>
                    <a-form-item label="单位" name="dpt">
                        <a-select
                            v-model:value="formAddState.dpt"
                            show-search
                            placeholder="选择单位"
                            style="width: 200px"
                            :options="EnterpriseType"
                            :filter-option="filterOption"
                            @focus="()=>{}"
                            @blur="()=>{}"
                            @change="(value)=>{console.log}"
                        ></a-select>
                    </a-form-item>
                    <a-form-item label="统一信用编码" name="liscenseId">
                        <a-input v-model:value="formAddState.liscenseId" placeholder="统一信用编码"/>
                    </a-form-item>
                    <a-form-item label="联系人" name="contactor">
                        <a-input v-model:value="formAddState.contactor" placeholder="联系人"/>
                    </a-form-item>
                    <a-form-item label="联系方式" name="contact">
                        <a-input v-model:value="formAddState.contact" placeholder="电话/微信/qq/whatapp等..."/>
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
    import {SearchOutlined} from '@ant-design/icons-vue';
    import {reactive,ref} from 'vue';
    const addEnterpriseVisibility = ref(false);
    const AddBtnLoading = ref(false);
    const formAddState = reactive({});
    function addNewItem(){
        addEnterpriseVisibility.value = true;
    }
    function onCloseAddDrawer(){
        addEnterpriseVisibility.value = false;
    }
    function onConfrimAdd(){
        addEnterpriseVisibility.value = false;
    }
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
        }
    ]
    const dataSource = ref([{
        user: 'tanglin',
        userAccount: 'super',
        loginTime:"2022-05-20",
        ipAddress: '192.168.11.127',
    }]);
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const fliterState = reactive({

    });
    const EnterpriseType = [{
        value: '1',
        label: '一般企业',
    },{
        value: '2',
        label: '物业',
    },{
        value: '3',
        label: '媒体',
    }]
</script>