<template>
  <a-layout-content>
    <a-card>
      <header>
        <a-space :size="2">
          <a-cascader
            v-model:value="value"
            :options="options"
            placeholder="请选择省市区"
            @change="changeSite"
            change-on-select
          />
          <a-range-picker
            v-model:value="value1"
            :locale="locale"
            @change="onRangeChange"
          />
          <a-button type="primary" @click="onSearch">
            <template #icon><SearchOutlined /></template>
          </a-button>
        </a-space>
      </header>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        size="middle"
        :scroll="{ x: 'calc(700px + 50%)' }"
      >
      </a-table>
    </a-card>
  </a-layout-content>
</template>
<script setup>
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const options = [
  {
    value: "浙江",
    label: "浙江",
    children: [
      {
        value: "杭州",
        label: "杭州",
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
      },
    ],
  },
];
const value = ref([]);
const product = ref("");
let value1 = ref();
let selectDate = ref([]);

const columns = [
  {
    title: "地市",
    dataIndex: "city",
    key: "city",
    width: 150,
    fixed: "left",
  },
  {
    title: "商机总数",
    dataIndex: "floor",
    key: "floor",
    width: 100,
  },
  {
    title: "省商机数",
    dataIndex: "resource",
    key: "resource",
    width: 100,
  },
  {
    title: "政企个人终端分期",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "极光宽带移网融合套餐",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "111test",
    dataIndex: "resource",
    key: "resource",
    width: 100,
  },
  {
    title: "音视频会议服务",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "政企精品网",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "云联网",
    dataIndex: "resource",
    key: "resource",
    width: 100,
  },
  {
    title: "沃云·公有云",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "小程序应用",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "5G",
    dataIndex: "fifth",
    key: "fifth",
    width: 100,
  },
  {
    title: "远程教育服务",
    dataIndex: "fourth",
    key: "fourth",
    width: 150,
  },
  {
    title: "阿里宝卡",
    dataIndex: "fourth",
    key: "fourth",
    width: 100,
  },
  {
    title: "云网融合",
    dataIndex: "fourth",
    key: "fourth",
    width: 100,
  },
  {
    title: "管家服务特权二",
    dataIndex: "fourth",
    key: "fourth",
    width: 150,
  },
  {
    title: "跨境数据业务",
    dataIndex: "fourth",
    key: "fourth",
    width: 150,
  },

  {
    title: "智能专线",
    dataIndex: "extraLine",
    key: "extraLine",
    width: 100,
  },
  {
    title: "远程医疗服务",
    dataIndex: "bandwidth",
    key: "bandwidth",
    width: 150,
  },
  {
    title: "行业应用",
    dataIndex: "telephone",
    key: "telephone",
    width: 100,
  },
  {
    title: "腾讯王卡",
    dataIndex: "customer",
    key: "customer",
    width: 100,
  },
  {
    title: "管家服务特权三",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "互联网专线",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "热成像人体测温服务",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "5G冰激凌",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "苹果专区",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "企业宽带",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "大数据舆情监控服务",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "钉钉应用部署",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "沃企云通",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "组网专线",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "钉钉宝卡",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "AI防疫外呼服务",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "沃企云呼",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "共抗疫情",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "测试",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
  {
    title: "测试请勿选择",
    dataIndex: "bill",
    key: "bill",
    width: 150,
  },
  {
    title: "市商机数",
    dataIndex: "bill",
    key: "bill",
    width: 100,
  },
];
const data = [
  {
    key: 1,
    city: "广东省",
    floor: 60,
    resource: 99,
    noResource: 23,
    assets: 48,
    development: "8%",
    trade: 12,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        city: "广东省",
        floor: 42,
        resource: 99,
        noResource: 23,
        assets: 48,
        development: "8%",
        trade: 12,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        city: "广东省",
        floor: 30,
        resource: 99,
        noResource: 23,
        assets: 48,
        development: "8%",
        trade: 12,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            city: "广东省",
            floor: 16,
            resource: 99,
            noResource: 23,
            assets: 48,
            development: "8%",
            trade: 12,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        city: "广东省",
        floor: 72,
        resource: 99,
        noResource: 23,
        assets: 48,
        development: "8%",
        trade: 12,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            city: "广东省",
            floor: 42,
            resource: 99,
            noResource: 23,
            assets: 48,
            development: "8%",
            trade: 12,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                city: "广东省",
                floor: 25,
                resource: 99,
                noResource: 23,
                assets: 48,
                development: "8%",
                trade: 12,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                city: "广东省",
                floor: 18,
                resource: 99,
                noResource: 23,
                assets: 48,
                development: "8%",
                trade: 12,
                address: "London No. 4 Lake Park",
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
    floor: 32,
    resource: 99,
    noResource: 23,
    assets: 48,
    development: "8%",
    trade: 12,
    address: "Sidney No. 1 Lake Park",
  },
];

function changeSite(_value, selectedOptions) {
  console.log(_value);
  console.log("激活项", selectedOptions);
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