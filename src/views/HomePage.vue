<script setup>
    import {ref} from 'vue';
    import  { MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined} from '@ant-design/icons-vue';
    var collapsed = ref(false);
    var selectedKeys = ref(["1"]);
    var activeTab = ref(["1"]);
    var theme = ref("light");
</script>
<template>
    <a-layout>
        <a-layout-header style="background:#fff;">
            <a-row justify="space-between">
                <a-col :span="4">企业通信管家</a-col>
                <a-col :span="16">
                    <a-menu
                        v-model:selectedKeys="activeTab"
                        :theme="theme"
                        mode="horizontal"
                        :style="{ lineHeight: '32px' }"
                    >
                        <a-menu-item key="1">常规</a-menu-item>
                        <a-menu-item key="2">设置</a-menu-item>
                    </a-menu>
                </a-col>
                <a-col :span="4">
                    <div class="usrmenu">
                        <a-avatar size="large">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>游客用户</a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="0">退出登录</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout>
            <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :theme="theme">
                <div class="logo">
                    <MenuUnfoldOutlined
                        v-if="collapsed"
                        class="trigger"
                        @click="() => (collapsed = !collapsed)"
                    />
                    <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                </div>
                <a-menu 
                    v-model:selectedKeys="selectedKeys"
                    :theme="theme" 
                    mode="inline"
                >
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
            </a-layout-sider>
            <a-layout-content>
                <a-row style="padding:10px;">
                    <a-col :offset="1" :span="23">
                        <a-breadcrumb>
                            <a-breadcrumb-item>常规</a-breadcrumb-item>
                            <a-breadcrumb-item><a href="">菜单一</a></a-breadcrumb-item>
                            <a-breadcrumb-item><a href="">菜单一</a></a-breadcrumb-item>
                            <a-breadcrumb-item>菜单一</a-breadcrumb-item>
                        </a-breadcrumb>
                    </a-col>
                </a-row>
                
            </a-layout-content>
        </a-layout>
        <a-layout-footer>
            <div style="text-align:center;">广州衡纬科技有限公司</div>
        </a-layout-footer>
    </a-layout>
</template>
<style scoped>
    .ant-layout{
        height:100%;
    }
    .logo{
        background: #ffffff;
        text-align: right;
    }
    .trigger{
        padding: 12px;
        background: #1890ff;
    }
    .usrmenu{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
    }
</style>