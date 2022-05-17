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
      <a-table :columns="columns" :data-source="data" bordered>
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> 序号 </span>
          </template>
        </template>

        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'name'">
            <a>
              {{ index + 1 }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
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
      <p>{{ dialogIndex }}</p>
    </a-modal>
  </div>
</template>
<script setup>
import { ref } from "vue";
// EditOutlined
import { SearchOutlined, EditOutlined } from "@ant-design/icons-vue";
// import { cloneDeep } from "lodash-es";

const userName = ref("");
// 表格
const columns = [
  {
    name: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "名称",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "排序号",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "支持快速下单",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "操作",
    key: "action",
  },
];
const data = [
  {
    key: "1",
    name: "乐迪",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

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
section {
  position: relative;
  .add {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 12px;
  }
}
</style>