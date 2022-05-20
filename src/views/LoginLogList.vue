<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-form
                    layout="inline"
                    :model="formState"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                >
                    <a-form-item name="user">
                        <a-input v-model:value="formState.user" placeholder="输入关键字">
                            <template #prefix>
                                <SearchOutlined/>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="dateRange">
                        <a-range-picker v-model:value="formState.dateRange" :locale="locale"/>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                        >
                            查询
                        </a-button>
                    </a-form-item>
                </a-form>
                <a-divider />
                <a-table :dataSource="dataSource" :columns="columns" />
            </a-card>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import {reactive,ref} from 'vue';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {SearchOutlined} from '@ant-design/icons-vue';
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
    const formState = reactive({
        user:""
    });
    const handleFinish=()=>{
        console.log(formState.dateRange);
    }
    const handleFinishFailed=()=>{

    }
</script>