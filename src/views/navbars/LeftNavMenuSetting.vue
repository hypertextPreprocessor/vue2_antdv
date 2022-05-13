<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys"
        :theme="theme" 
        :open-keys="openKeys"
        mode="inline"
    >
        <a-menu-item key="1">
            <span>更改密码</span>
        </a-menu-item>
        <a-menu-item key="2">
            <span>退出登录</span>
        </a-menu-item>
    </a-menu>
</template>
<script setup>
    import {ref} from 'vue';
    var selectedKeys = ref(["1"]);
</script>
