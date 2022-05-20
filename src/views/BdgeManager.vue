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
                    <a-form-item name="coper">
                        <a-select
                            v-model:value="formState.accountType"
                            show-search
                            placeholder="选择一个账号"
                            style="width: 200px"
                            :options="options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                        ></a-select>
                    </a-form-item>
                    <a-form-item name="city">
                        <a-cascader
                            v-model:value="formState.city"
                            :options="cities"
                            style="width:160px;"
                            change-on-select
                            expand-trigger="hover"
                            placeholder="组织所在区域"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">查询</a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button>
                            <template #icon><DownloadOutlined /></template>
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button>
                            <template #icon><FileExcelFilled /></template>
                        </a-button>
                    </a-form-item>
                </a-form>
                <a-divider />
                <a-table :dataSource="dataSource" :columns="columns" />
                <a-divider/>
                <a-button type="primary" shape="default" size="large" @click="addNewItem">新增</a-button>
            </a-card>
            <a-drawer
                v-model:visible="addVisible"
                class="custom-class"
                title="新增一个组织"
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
                    <a-form-item label="职位" name="occupaction">
                        <a-select
                            v-model:value="formAddState.occupaction"
                            show-search
                            style="width: 200px"
                            placeholder="选择一个职位"
                            :options="options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                        ></a-select>
                    </a-form-item>
                    <a-form-item label="姓名" name="userName">
                        <a-input v-model:value="formAddState.userName" placeholder="建议用手机号作为用户名"/>
                    </a-form-item>
                    <a-form-item label="账号/用户名" name="userNick">
                        <a-input v-model:value="formAddState.userNick" placeholder="建议用手机号作为用户名"/>
                    </a-form-item>
                    <a-form-item label="手机号" name="phoneNumber">
                        <a-input v-model:value="formAddState.phoneNumber" placeholder="可以与账号/用户名不同"/>
                    </a-form-item>
                    <a-form-item label="邮箱" name="email">
                        <a-input v-model:value="formAddState.email" placeholder="能收到电子邮件的邮箱"/>
                    </a-form-item>
                    <a-form-item label="旧密码" name="oldPassword">
                        <a-input-password v-model:value="formAddState.oldPassword" placeholder="当前使用的密码" />
                    </a-form-item>
                    <a-form-item label="新密码" name="newPassword1">
                        <a-input-password v-model:value="formAddState.newPassword1" placeholder="设置新的密码" />
                    </a-form-item>
                    <a-form-item label="新密码确认" name="newPassword2">
                        <a-input-password v-model:value="formAddState.newPassword2" placeholder="设置新的密码" />
                    </a-form-item>
                    <a-form-item label="发展人编码" name="dppcode">
                        <a-input v-model:value="formAddState.dppcode" placeholder="发展人编码"/>
                    </a-form-item>
                    <a-form-item label="渠道名称" name="kkname">
                        <a-input v-model:value="formAddState.kkname" placeholder="渠道名称"/>
                    </a-form-item>
                    <a-form-item label="渠道编码" name="kkcode">
                        <a-input v-model:value="formAddState.kkcode" placeholder="渠道编码"/>
                    </a-form-item>
                    <a-form-item label="入职时间" name="EmployeedDate">
                        <a-date-picker v-model:value="formAddState.EmployeedDate"  placeholder="入职时间"/>
                    </a-form-item>
                    <a-form-item label="用工形式" name="workType">
                        <a-select
                            v-model:value="formAddState.workType"
                            show-search
                            placeholder="选择一种用工形式"
                            style="width: 200px"
                            :options="options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                        ></a-select>
                    </a-form-item>
                    <a-form-item label="业务范围" name="bussinessArea">
                        <a-input v-model:value="formAddState.kkcode" placeholder="业务范围"/>
                    </a-form-item>
                   
                    <a-textarea v-model:value="formAddState.postScript" placeholder="备注" :rows="4" />
                    
                </a-form>
                <template #footer>
                    <a-button style="margin-right: 8px" @click="onCloseAddDrawer">关闭</a-button>
                    <a-button type="primary" @click="onConfrimAdd" :loading="AddBtnLoading">确认</a-button>
                </template>
            </a-drawer>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import {reactive,ref} from 'vue';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {SearchOutlined,DownloadOutlined,FileExcelFilled} from '@ant-design/icons-vue';
    const formAddState = reactive({
      oppucation: '',
      oldPassword: '',
      newPassword1:'',
      newPassword2:'',
      userName: '',
      userNick:'',
    });
    const cities = [{
        value: 'gd',
        label: '广东',
        children:[
            {value:"gz",label:"广州",children:[{label:"越秀区",value:"yuexiu"}]},
            {value:"qy",label:"清远"},
            {value:"st",label:"汕头"},
        ]
    }];
     const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const addVisible = ref(false);
    const AddBtnLoading = ref(false);
    function onAddFinish(errorInfo){
        console.log(errorInfo);
    }
    function onAddFinishFailed(values){
        console.log(values);
    }
    const onConfrimAdd =()=>{
        addVisible.value=false;
    }
    function onCloseAddDrawer(){
        addVisible.value=false;
    }
    const addNewItem = ()=>{
        addVisible.value=true;
    }
    const options = ref([{
        value: 'all',
        label: '全部'
    },{
        value: 'test1',
        label: '区县管理员-测试账号'
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