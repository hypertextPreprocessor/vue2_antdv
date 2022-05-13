<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys"
        :theme="theme" 
        :open-keys="openKeys"
        mode="inline"
    >
        <a-sub-menu key="sub1">
            <template #title>Navigation One</template>
            <a-menu-item key="sub1_1">Option 1</a-menu-item>
        </a-sub-menu>
        <a-menu-item-group key="g1" title="Item 2">
            <a-menu-item key="g11">Option 1</a-menu-item>
            <a-menu-item key="g12">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item key="1">
            <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
            <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
            <span>nav 3</span>
        </a-menu-item>
    </a-menu>
</template>
<script setup>
    import {ref} from 'vue';
    var selectedKeys = ref(["1"]);
</script>
