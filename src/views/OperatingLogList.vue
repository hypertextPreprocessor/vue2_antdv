<template>
  <a-layout>
    <a-layout-content style="display: flex; flex-flow: column nowrap">
      <a-card style="flex-grow: 1">
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
            <a-range-picker
              v-model:value="formState.dateRange"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit"> 查询 </a-button>
          </a-form-item>
        </a-form>
        <a-divider />
        <a-table 
          :dataSource="dataSource" 
          :columns="columns" 
          :loading="dataLoading"
          :pagination="pagination"
          @change="tableChange"
        >
          <template #emptyText>
              <RenderEmpty/>
          </template>
        </a-table>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import {RenderEmpty} from '@coms/frequentUsed.js';
import { reactive, ref,onMounted } from "vue";
import {loginLog} from '@api';
const dataLoading = ref(true);
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
function loadTableData({current=1,pageSize=10,title=""}={}){
    loginLog({logType:0,current:current,size:pageSize,title}).then(res=>{
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
function handleChange(x){
  console.log(x);
}
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const options = ref([
  {
    value: "jack",
    label: "全部",
  },
  {
    value: "ptype",
    label: "产品类别信息",
  },
  {
    value: "product",
    label: "产品信息",
  },
  {
    value: "business",
    label: "商机信息",
  },
  {
    value: "address",
    label: "地址信息",
  },
  {
    value: "role",
    label: "角色信息",
  },
  {
    value: "user",
    label: "用户信息",
  },
  {
    value: "orgz",
    label: "组织信息",
  },
]);
const columns = [
  {
    title: "操作用户",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "操作时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "操作名称",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "IP地址",
    dataIndex: "remoteAddr",
    key: "remoteAddr",
  },
];
const dataSource = ref(null);
const formState = reactive({
  user: "",
  dateRange:null
});
const handleFinish = () => {
 if(formState.dateRange!=null){
      var startDate = formState.dateRange[0].toISOString();
      var endDate = formState.dateRange[1].toISOString();
      loadTableData({title:formState.user,startDate,endDate});
  }else{
      loadTableData({title:formState.user});
  }
};
const handleFinishFailed = () => {};
</script>