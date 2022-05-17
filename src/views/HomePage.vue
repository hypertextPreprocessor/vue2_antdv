<script setup>
    import {onMounted, ref} from 'vue';
    import {useRouter} from 'vue-router';
    import {useConfig} from '@store';
    import  { MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined} from '@ant-design/icons-vue';
    var collapsed = ref(false);
    var activeTab = ref(["1"]);
    var theme = ref("light");
    var router = useRouter();
    var store = useConfig();
    function commonNav(){
         router.push({path:'/main-common'});
    }
    function settingNav(){
        router.push({path:'/main-setting'});
    }
    function logout(){
        sessionStorage.removeItem('userToken');
        store.userToken=null;
        router.push({name:'login'});
    }
    onMounted(()=>{
        document.querySelector('.ant-layout').style.height = window.document.documentElement.clientHeight+"px";
    });
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
                        :style="{ lineHeight: '64px' }"
                    >
                        <a-menu-item key="1" @click="commonNav">常规</a-menu-item>
                        <a-menu-item key="2" @click="settingNav">设置</a-menu-item>
                    </a-menu>
                </a-col>
                <a-col :span="4">
                    <div class="usrmenu">
                        <a-avatar size="large">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        <div style="width:12px;"></div>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>游客用户</a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="logout" key="logout">退出登录</a-menu-item>
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
                <!--侧边栏菜单-->
                <router-view name="LeftSidebar"></router-view>
            </a-layout-sider>
            <a-layout-content>
                <router-view name="RightSidebar"></router-view>
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