/* eslint-disable no-unused-vars */
<template>
  <div id="productSort">
    <header>
      <a-input
        v-model:value="userName"
        style="width: 200px"
        placeholder="Basic usage"
        @search="onSearch"
      >
        <template #prefix>
          <search-outlined />
        </template>
      </a-input>

      <a-select
        ref="select"
        style="margin: 0 2px"
        placeholder="Tags Mode"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>
      </a-button>
    </header>
    <section>
      <a-table
        :columns="columns"
        :data-source="productInfo.list"
        bordered
        :locale="{ emptyText: '暂无数据' }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'dataIndex'">
            <span> 序号 </span>
          </template>
        </template>

        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'dataIndex'">
            {{ index + 1 }}
          </template>
          <template v-else-if="column.key === 'isToOrder'">
            <!-- <span> {{ record }} </span> -->
            <!-- <span>嘻嘻</span> -->
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <edit-outlined @click="edit(column.key, column.key)" />
            </span>
          </template>
        </template>
      </a-table>
      <a-button class="add" type="primary" @click="edit()">新增</a-button>
    </section>

    <a-modal v-model:visible="visible" title="新增" @ok="handleOk">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="名称"
          name="username"
          :rules="[{ required: true, message: '这里输入名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item>图片上传</a-form-item>
        <a-form-item>图片</a-form-item>
        <a-form-item>图标上传</a-form-item>
        <a-form-item>图标</a-form-item>
        <a-form-item
          label="排序号"
          name="sortNum"
          :rules="[{ required: true, message: '这里输入排序号' }]"
        >
          <a-input v-model:value="formState.sortNum" />
        </a-form-item>
        <a-form-item label="是否支持快速下单" name="checked">
          <a-checkbox v-model:checked="formState.checked"></a-checkbox>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
      <p>{{ dialogIndex }}</p>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
// EditOutlined
import { SearchOutlined, EditOutlined } from "@ant-design/icons-vue";
// import { cloneDeep } from "lodash-es";
import { getProductInfo } from "@src/api/requests.js";

const userName = ref("");
// 表格
const columns = [
  {
    dataIndex: "name",
    name: "name",
    key: "dataIndex",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "排序号",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "支持快速下单",
    key: "isToOrder",
    dataIndex: "isToOrder",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "操作",
    key: "action",
  },
];

let productInfo = ref("");
onMounted(() => {
  let current = 1;
  let pages = 1;
  let size = 10;
  getProductInfo({ current, pages, size }).then((res) => {
    let temp = res.data.data;
    if (temp.list.length > 0) {
      temp.list.map((item) => {
        item.isToOrder = item.isToOrder == 1 ? "是" : "否";
        item.status = item.status == 1 ? "有效" : "失效";
      });
    }
    productInfo.value = temp;
  });

  //   dialog
});
// eslint-disable-next-line no-unused-vars
function edit(key) {
  console.log("当前行索引：", key);
  let title = key == undefined ? "新增" : "编辑";
  key = key == undefined ? "新增" : "编辑";
  showModal(title, key);
  //   editableData[key] = cloneDeep(
  //     dataSource.value.filter((item) => key === item.key)[0]
  //   );
}

function onSearch() {
  console.log("onSearch");
}
function focus() {
  console.log("focus");
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

// dialog
const visible = ref(false);
const dialogTitle = ref("");
const dialogIndex = ref("");

let formState = reactive({
  username: "",
  sortNum: "",
  checked: false,
});

// function handleCheckbox(e) {
//   console.log(e.target.checked);
//   let temp = e.target.checked;
//   temp = !temp;
//   console.log(temp);
//   formState.checked = temp;
//   console.log(formState.checked);
// }
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function showModal(title, index) {
  visible.value = true;
  dialogTitle.value = ref(title);
  dialogIndex.value = ref(index);
  console.log(index);
  console.log(title);
  //   return dialogIndex.value;
}

function handleOk(e) {
  console.log(e);
  visible.value = false;
}
</script>
<style lang="less" scoped>
header {
  display: flex;
}
.editable-row-operations a {
  margin-right: 8px;
}
section {
  position: relative;
  margin-top: 12px;
  .add {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 12px;
  }
}
</style>