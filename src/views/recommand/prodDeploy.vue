<template>
  <a-layout-content>
    <a-card>
      <template #title>
        <a-button type="primary" ghost>
          <template #icon><ReloadOutlined /></template>
        </a-button>
      </template>
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a-button type="primary" ghost @click="handlBtn">
                <template #icon><EditOutlined /></template>
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
      <a-divider />
    </a-card>
    <a-drawer v-model:visible="drawer" title="编辑" placement="right">
      <a-form
        :wrapper-row="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        :model="formData"
        ref="formRef"
      >
        <a-form-item name="name" label="产品">
          {{ name }}
        </a-form-item>
        <a-form-item name="attr" label="关联属性">
          <a-select
            v-model:value="formData.selectAttr"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择关联属性"
            :options="attrData"
            @change="handleChange"
          ></a-select>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-space>
          <a-button @click="handleClose">取消</a-button>
          <a-button type="primary" @click="handleAffirm">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </a-layout-content>
</template>
<script setup>
import { ReloadOutlined, EditOutlined } from "@ant-design/icons-vue";
import { reactive, ref, toRaw } from "vue";
const drawer = ref(false);
const formRef = ref("");
const formData = reactive({
  selectAttr: ["宽带", "中小企业"],
});
const attrData = reactive([
  { value: "中小企业" },
  { value: "宽带" },
  { value: "专线业务" },
  { value: "钢铁侠" },
  { value: "乐迪" },
]);
// const selectAttr = ref(["宽带", "中小企业"]);

const columns = [
  {
    title: "序号",
    dataIndex: "order",
  },
  {
    title: "产品类别名称",
    dataIndex: "sort",
  },
  {
    title: "产品名称",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 150,
  },
];
const name = ref("我是产品名称");
const data = [
  {
    order: "1",
    sort: "固网业务",
    name: "校园宽带",
    status: "有效",
  },
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function handleAffirm() {
  handleClose();
  console.log("submit!", toRaw(formData));
  //   formRef.value.resetFields();
}
function handleClose() {
  drawer.value = false;
}

function handlBtn() {
  drawer.value = true;
}
</script>