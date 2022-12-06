<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    :theme="theme"
    :open-keys="openKeys"
    @select="menuSelect"
    @openChange="onOpenChange"
    mode="inline"
  > 
    <template v-for="item in state.MenuList">
      <template v-if="item.children">
        <a-sub-menu :key="item.name">
          <template #icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </template>
          <template #title>{{item.name}}</template>
          <a-menu-item v-for="itm in item.children" :key="itm.name">{{itm.name}}</a-menu-item>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="item.name">
          <template #icon v-if="item.meta.icon">
            <Icon :component="item.meta.icon" />
          </template>
          <span>{{item.name}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script setup>
import { ref, reactive, toRefs,onMounted } from "vue";
import Icon from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
import myRoute from '@src/router/myRoute.js';
import {useConfig} from '@store';
const router = useRouter();
var store = useConfig();
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
  myRoute(store,false).then(res=>{
    state.MenuList = res.page.filter(item=>item.name!='notExist');
  })
});
</script>
