<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    :theme="theme"
    :open-keys="openKeys"
    @select="menuSelect"
    @openChange="onOpenChange"
    mode="inline"
  > 
    <a-sub-menu key="sys">
      <template #icon><DesktopOutlined /></template>
      <template #title>系统管理</template>
      <a-menu-item key="sys1">角色管理</a-menu-item>
      <a-menu-item key="sys2">组织管理</a-menu-item>
      <a-menu-item key="sys3">登录日志列表</a-menu-item>
      <a-menu-item key="sys4">操作日志列表</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="info">
      <template #icon><ContainerOutlined /></template>
      <template #title>信息管理</template>
      <a-menu-item key="info1">楼宇管家管理</a-menu-item>
      <a-menu-item key="info2">企业管理</a-menu-item>
      <a-menu-item key="info3">楼宇管理</a-menu-item>
      <a-menu-item key="info4">商机管理</a-menu-item>
      <a-menu-item key="info5">产品报价信息</a-menu-item>
      <a-menu-item key="info6">故障解决方案信息</a-menu-item>
      <a-menu-item key="info7">用户管理</a-menu-item>
      <a-menu-item key="info8">企业信息管理</a-menu-item>
      <a-menu-item key="info9">智能助手</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="product">
      <template #icon><GiftOutlined /></template>
      <template #title>产品管理</template>
      <a-menu-item key="product1">省级产品类别</a-menu-item>
      <a-menu-item key="product2">省级产品</a-menu-item>
      <a-menu-item key="product3">产品视频</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="page">
      <template #icon><FileOutlined /></template>
      <template #title>页面管理</template>
      <a-menu-item key="page1">轮播图管理</a-menu-item>
      <a-menu-item key="page2">宣传图管理</a-menu-item>
      <a-menu-item key="page3">公告管理</a-menu-item>
      <a-menu-item key="page4">促销管理</a-menu-item>
      <!-- <a-menu-item key="page5">地市促销管理</a-menu-item> -->
    </a-sub-menu>
    <a-sub-menu key="promotion">
      <template #icon><RocketOutlined /></template>
      <template #title>推荐管理</template>
      <a-menu-item key="promotion1">产品FAQ</a-menu-item>
      <a-menu-item key="promotion2">产品属性</a-menu-item>
      <a-menu-item key="promotion3">产品配置</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="excel">
      <template #icon><LineChartOutlined /></template>
      <template #title>专题报表</template>
      <a-menu-item key="excel1">商机与楼宇统计信息</a-menu-item>
      <a-menu-item key="excel2">楼宇信息统计表</a-menu-item>
      <a-menu-item key="excel3">商机与客户经理统计信息</a-menu-item>
      <a-menu-item key="excel4">产品商机统计信息</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="contact">
      <template #icon><PhoneOutlined /></template>
      <template #title>在线对话记录</template>
      <a-menu-item key="contact1">对话记录</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script setup>
import { ref, reactive, toRefs,onMounted } from "vue";
import {
  DesktopOutlined,
  GiftOutlined,
  ContainerOutlined,
  FileOutlined,
  RocketOutlined,
  LineChartOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  rootSubmenuKeys: [
    "sys",
    "info",
    "product",
    "page",
    "promotion",
    "excel",
    "contact",
  ],
  openKeys: [],
  selectedKeys: [],
  MenuList:[]
});
const onOpenChange = (openKeys) => {
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1
  );
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
var { openKeys, selectedKeys} = toRefs(state);

var theme = ref("light");
function menuSelect({ item, key, selectedKeys }) {
  console.log(item);
  console.log(key);
  console.log(selectedKeys);
  router.push({ name: key });
}
onMounted(()=>{
  //console.log(router.getRoutes());
});
</script>
