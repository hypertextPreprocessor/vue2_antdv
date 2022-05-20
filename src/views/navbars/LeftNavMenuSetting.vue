<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys"
        :theme="theme" 
        :open-keys="openKeys"
        @openChange="onOpenChange"
        mode="inline"
    >
        <a-menu-item key="profile">
            <span>个人资料</span>
        </a-menu-item>
        <a-menu-item key="alterpass">
            <span>更改密码</span>
        </a-menu-item>
        <a-menu-item key="logout">
            <span>退出登录</span>
        </a-menu-item>
    </a-menu>
</template>
<script setup>
    import {ref,reactive,toRefs} from 'vue';
    var theme = ref("light");
    const state = reactive({
      rootSubmenuKeys: ['profile','alterpass', 'logout'],
      openKeys: [],
      selectedKeys: [],
    });
    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    var {openKeys,selectedKeys} = toRefs(state);
</script>
