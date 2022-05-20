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
                    <a-form-item name="coper">
                        <a-select
                            v-model:value="formState.coper"
                            show-search
                            placeholder="选择一个操作"
                            style="width: 200px"
                            :options="options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                        ></a-select>
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
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const options = ref([{
      value: 'jack',
      label: '全部',
    }, {
      value: 'ptype',
      label: '产品类别信息',
    }, {
      value: 'product',
      label: '产品信息',
    },{
      value: 'business',
      label: '商机信息',
    },{
      value: 'address',
      label: '地址信息',
    }
    ,{
      value: 'role',
      label: '角色信息',
    }
    ,{
      value: 'user',
      label: '用户信息',
    }
    ,{
      value: 'orgz',
      label: '组织信息',
    }]);
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