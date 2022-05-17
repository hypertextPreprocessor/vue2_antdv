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
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
          <template
            v-if="['name', 'age', 'address'].includes(column.dataIndex)"
          >
            <div>
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span>
                <edit-outlined @click="edit(record.key)" />
                <!-- <a @click="edit(record.key)">Edit</a> -->
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </section>
    <section class="dialog">
      <a-button type="primary" @click="showModal">Open Modal</a-button>
      <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
        <p>{{ dialogIndex }}</p>
      </a-modal>
    </section>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { SearchOutlined, EditOutlined } from "@ant-design/icons-vue";
// import { cloneDeep } from "lodash-es";

const userName = ref("");
// 表格
const columns = [
  {
    title: "序号",
    dataIndex: "name",
    width: "7%",
  },
  {
    title: "名称",
    dataIndex: "address",
    width: "25%",
  },
  {
    title: "排序号",
    dataIndex: "address",
    width: "15%",
  },
  {
    title: "支持快速下单",
    dataIndex: "address",
    width: "35%",
  },
  {
    title: "状态",
    dataIndex: "address",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: i + 1,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});

function edit(key) {
  console.log("当前行索引：", key);
  this.showModal(key);
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

const dialogIndex = ref("");
function showModal(index) {
  visible.value = true;
  dialogIndex.value = ref(index);
  console.log(index);
  //   return dialogIndex.value;
}

function handleOk(e) {
  console.log(e);
  visible.value = false;
}
</script>
<style lang="less" scoped>
#productSort {
  background-color: yellowgreen;
  padding: 12px 12px 12px 54px;
}
header {
  display: flex;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>