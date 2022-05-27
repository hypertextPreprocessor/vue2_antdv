<template>
  <a-layout-content>
    <a-card>
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
// import { ref } from "vue";

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
    width: 150,
    fixed: "left",
  },
  {
    title: "楼宇总数",
    dataIndex: "floor",
    key: "floor",
    width: "12%",
    children: [
      {
        title: "A",
        dataIndex: "A",
        key: "A",
        width: 100,
      },
      {
        title: "B",
        dataIndex: "B",
        key: "B",
        width: 100,
      },
      {
        title: "C",
        dataIndex: "C",
        key: "C",
        width: 100,
      },
      {
        title: "D",
        dataIndex: "D",
        key: "D",
        width: 100,
      },
    ],
  },
  {
    title: "资源情况",
    dataIndex: "resource",
    key: "resource",
    width: "15%",
    children: [
      {
        title: "二日通",
        dataIndex: "A",
        key: "A",
        width: 100,
      },
      {
        title: "七日通",
        dataIndex: "B",
        key: "B",
        width: 100,
      },
      {
        title: "待建设",
        dataIndex: "C",
        key: "C",
        width: 100,
      },
    ],
  },
  {
    title: "5G",
    dataIndex: "fifth",
    key: "fifth",
    width: "15%",
    children: [
      {
        title: "有",
        dataIndex: "exist",
        key: "exist",
        width: 100,
      },
      {
        title: "无",
        dataIndex: "without",
        key: "without",
        width: 100,
      },
    ],
  },
  {
    title: "4G",
    dataIndex: "fourth",
    key: "fourth",
    width: "15%",
    children: [
      {
        title: "有",
        dataIndex: "exist",
        key: "exist",
        width: 100,
      },
      {
        title: "无",
        dataIndex: "without",
        key: "without",
        width: 100,
      },
    ],
  },

  {
    title: "专线",
    dataIndex: "extraLine",
    key: "extraLine",
    width: "15%",
    children: [
      {
        title: "有",
        dataIndex: "exist",
        key: "exist",
        width: 100,
      },
      {
        title: "无",
        dataIndex: "without",
        key: "without",
        width: 100,
      },
    ],
  },
  {
    title: "带宽",
    dataIndex: "bandwidth",
    key: "bandwidth",
    width: "15%",
    children: [
      {
        title: "有",
        dataIndex: "exist",
        key: "exist",
        width: 100,
      },
      {
        title: "无",
        dataIndex: "without",
        key: "without",
        width: 100,
      },
    ],
  },
  {
    title: "固话",
    dataIndex: "telephone",
    key: "telephone",
    width: "15%",
    children: [
      {
        title: "有",
        dataIndex: "exist",
        key: "exist",
        width: 100,
      },
      {
        title: "无",
        dataIndex: "without",
        key: "without",
        width: 100,
      },
    ],
  },
  {
    title: "客户",
    dataIndex: "customer",
    key: "customer",
    width: "15%",
    children: [
      {
        title: "总数",
        dataIndex: "amount",
        key: "amount",
        width: 100,
      },
      {
        title: "渗透率",
        dataIndex: "rate",
        key: "rate",
        width: 100,
      },
    ],
  },
  {
    title: "出账",
    dataIndex: "bill",
    key: "bill",
    width: "15%",
    children: [
      {
        title: "总额",
        dataIndex: "amount",
        key: "amount",
        width: 100,
      },
      {
        title: "用户量",
        dataIndex: "rate",
        key: "rate",
        width: 100,
      },
    ],
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
</script>

<style lang="less" scoped>
header {
  margin-bottom: 12px;
}
</style>