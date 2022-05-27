<template>
  <a-layout-content>
    <a-card>
      <template #title>
        <a-button type="primary" ghost>
          <template #icon><ReloadOutlined /></template>
        </a-button>
      </template>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="data"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a-button type="primary" ghost @click="handlBtn('edit')">
                <template #icon><EditOutlined /></template>
              </a-button>
              <a-popconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="() => {}"
                @cancel="() => {}"
              >
                <a-button type="primary" ghost danger>
                  <template #icon><DeleteOutlined /></template>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
      <a-divider />
      <a-space>
        <a-button type="primary" @click="handlBtn">新增</a-button>
        <a-button type="primary" danger>批量删除</a-button>
      </a-space>
    </a-card>
    <a-drawer v-model:visible="drawer" :title="modalTitle" placement="right">
      <a-form
        :wrapper-row="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        :model="drawerState"
        ref="formRef"
      >
        <a-form-item name="option" label="选项">
          <a-input
            v-model:value="drawerState.option"
            placeholder="这里输入选项"
          />
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
import {
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, computed, toRaw } from "vue";
const drawer = ref(false);
const modalTitle = ref("新增");
const state = reactive({
  selectedRowKeys: [],
});
const formRef = ref("");
const drawerState = reactive({});
const selectedRowKeys = ref([]);
const columns = [
  {
    title: "序号",
    dataIndex: "order",
  },
  {
    title: "属性",
    dataIndex: "attr",
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 150,
  },
];
const data = [
  {
    order: "0",
    attr: "固网业务",
  },
];

const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  console.log(hasSelected);
  state.selectedRowKeys = selectedRowKeys;
};

function handleAffirm() {
  handleClose();
  console.log("submit!", toRaw(drawerState));
  //   formRef.value.resetFields();
}
function handleClose() {
  drawer.value = false;
}

function handlBtn(key) {
  modalTitle.value = key == "edit" ? "编辑" : "新增";
  drawer.value = true;
}
</script>