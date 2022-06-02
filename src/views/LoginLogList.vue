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
                <a-table :dataSource="dataSource" :columns="columns" :loading="dataLoading" :pagination="pagination" @change="tableChange">
                    <template #emptyText>
                        <RenderEmpty/>
                    </template>
                </a-table>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import {reactive,ref,onMounted} from 'vue';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {SearchOutlined} from '@ant-design/icons-vue';
    import {loginLog} from '@api';
    import {RenderEmpty} from '@coms/frequentUsed.js';
    const pagination = reactive({
        total:0,
        defaultPageSize:10,
        showSizeChanger:false,
        showTotal:(total)=>`共${total}条数据`
    });
    function tableChange(pagination){
        var {current,pageSize} = pagination;
        loadTableData({current,pageSize});
    }
    function loadTableData({current=1,pageSize=10,title="",startDate="",endDate=""}={}){
        loginLog({logType:9,current:current,size:pageSize,title,startDate,endDate}).then(res=>{
            var {code,data} = res.data;
            if(code==1){
                var {total} = data;
                dataSource.value = data.records;
                pagination.total = total;
            }else{
                dataSource.value=[];
            }
            dataLoading.value = false;
        });
    }
    onMounted(()=>{
        loadTableData();
    });
    const columns = [
        {
            title: '登录用户',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '登录账号',
            dataIndex: 'params',
            key: 'params',
        },{
            title: '登录时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },{
            title: 'IP地址',
            dataIndex: 'remoteAddr',
            key: 'remoteAddr',
        }
    ]
    const dataLoading = ref(true);
    const dataSource = ref(null);
    const formState = reactive({
        user:"",
        dateRange:null
    });
    const handleFinish=()=>{
        if(formState.dateRange!=null){
            var startDate = formState.dateRange[0].toISOString();
            var endDate = formState.dateRange[1].toISOString();
            loadTableData({title:formState.user,startDate,endDate});
        }else{
            loadTableData({title:formState.user});
        }
    }
    const handleFinishFailed=()=>{

    }
</script>