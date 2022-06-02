<template>
  <a-layout-content>
    <a-card>
      <header>
        <a-cascader
          v-model:value="value"
          :options="options"
          placeholder="请选择省市区"
          @change="changeSite"
          change-on-select
        />
        <a-select
          ref="select"
          style="margin: 0 2px"
          placeholder="请选择产品类别"
          @change="handleChangeProduct"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="company">公司业务</a-select-option>
          <a-select-option value="enterprise">企业业务</a-select-option>
        </a-select>
        <a-space direction="vertical" :size="12">
          <a-range-picker
            v-model:value="value1"
            @change="onRangeChange"
          />
        </a-space>
        <a-space direction="vertical" :size="12">
          <a-button type="primary" @click="onSearch">
            <template #icon><SearchOutlined /></template>
          </a-button>
        </a-space>
      </header>
      <a-space>
        <span>显示列：</span>
        <a-select
          ref="select"
          style="margin: 0 2px"
          placeholder="请选择显示列"
          @change="handleChangeRow"
        >
          <a-select-option value="list1">分类列1</a-select-option>
          <a-select-option value="list2">分类列2</a-select-option>
          <a-select-option value="list3">分类列3</a-select-option>
        </a-select>
      </a-space>
      <a-table :columns="columns" :data-source="data" bordered />
    </a-card>
  </a-layout-content>
</template>
<script setup>
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const options = [
  {
    value: "浙江",
    label: "浙江",
    children: [
      {
        value: "杭州",
        label: "杭州",
        children: [
          {
            value: "西湖",
            label: "西湖",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const value = ref([]);
const product = ref("");
let value1 = ref();
let selectDate = ref([]);
let selectRow = ref([]);

const columns = [
  //   {
  //     title: "序号",
  //     dataIndex: "sort",
  //     key: "sort",
  //   },
  {
    title: "地市",
    dataIndex: "city",
    key: "city",
    width: "20%",
  },
  {
    title: "账号总数",
    dataIndex: "account",
    key: "account",
    width: "12%",
  },
  {
    title: "楼宇管家数",
    dataIndex: "steward",
    key: "steward",
    width: "15%",
  },
  {
    title: "接口人数",
    dataIndex: "peopleNum",
    key: "peopleNum",
    width: "15%",
  },
  {
    title: "商机总数",
    dataIndex: "trade",
    key: "trade",
    width: "10%",
  },
];
const data = [
  {
    key: 1,
    city: "广东省",
    account: 60,
    steward: 99,
    peopleNum: 48,
    trade: 12,
    children: [
      {
        key: 11,
        city: "广东省",
        account: 63,
        floor: 42,
        steward: 99,

        peopleNum: 48,
        trade: 12,
      },
      {
        key: 12,
        city: "广东省",
        account: 63,
        floor: 30,
        steward: 99,
        peopleNum: 48,
        trade: 12,
        children: [
          {
            key: 121,
            city: "广东省",
            account: 63,
            floor: 16,
            steward: 99,
            peopleNum: 48,
            trade: 12,
          },
        ],
      },
      {
        key: 13,
        city: "广东省",
        account: 63,
        floor: 72,
        steward: 99,
        peopleNum: 48,
        trade: 12,
        children: [
          {
            key: 131,
            city: "广东省",
            account: 63,
            floor: 42,
            steward: 99,
            peopleNum: 48,
            trade: 12,
            children: [
              {
                key: 1311,
                city: "广东省",
                account: 63,
                floor: 25,
                steward: 99,
                peopleNum: 48,
                trade: 12,
              },
              {
                key: 1312,
                city: "广东省",
                account: 63,
                floor: 18,
                steward: 99,
                peopleNum: 48,
                trade: 12,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    city: "广东省",
    account: 63,
    floor: 32,
    steward: 99,
    peopleNum: 48,
    trade: 12,
  },
];

function changeSite(_value, selectedOptions) {
  console.log(_value);
  console.log("激活项", selectedOptions);
}
function handleChangeProduct(value) {
  product.value = value;
  console.log(`selected ${value}`);
}
function handleChangeRow(value) {
  selectRow.value = value;
  console.log(`selected ${value}`);
}

function onRangeChange(value, dateString) {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);
  selectDate = dateString;
  console.log(selectDate);
  // value1.value = dateString;
}

function onSearch() {
  console.log(
    "onSearch",
    "地点：",
    value.value,
    "产品：",
    product.value,
    "时刻：",
    selectDate
  );
}
</script>

<style lang="less" scoped>
header {
  margin-bottom: 12px;
}
</style>