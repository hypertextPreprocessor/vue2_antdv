<script setup>
    import {onMounted, ref,watch} from 'vue';
    import {useRouter,useRoute} from 'vue-router';
    import {useConfig} from '@store';
    import  { MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined} from '@ant-design/icons-vue';
    //import routes from '@src/router/router.js';
    import {breadFactory} from '@src/utils/util.js';
    import {usrLogout} from '@api';
    import { useI18n} from "vue-i18n";
    const {t}  = useI18n({ useScope: 'global' });
    var collapsed = ref(false);
    var activeTab = ref(["1"]);
    var theme = ref("light");
    var router = useRouter();
    var route = useRoute();
    var store = useConfig();
    var breads = ref([]);
    function commonNav(){
         router.push({path:'/main-common'});
    }
    function settingNav(){
        router.push({path:'/main-setting'});
    }
    function logout(){
        usrLogout().then(res=>{
            var {code} = res.data;
            if(code==1){
                sessionStorage.removeItem('userToken');
                store.userToken=null;
                router.push({name:'login'});
            }else{
                sessionStorage.removeItem('userToken');
                store.userToken=null;
                router.push({name:'login'});
            }
        });
        
    }
    watch(()=>route.path,(now,pre)=>{
        console.log("现在:");
        console.log(now);
        console.log("之前:");
        console.log(pre);
        console.log(route.matched);
        var arr = breadFactory(router.currentRoute.value.fullPath);
        //var arr = findRoute(routes,{name:route.name});
        //breads.value = Array.prototype.filter.call(arr,(x)=>(x.name!="home"&&x.name!="blank"));
        breads.value = arr;
    })
    onMounted(()=>{
       if(route.name === "home"){
        router.replace({name:"mainCommon"});
       }
        document.querySelector('.ant-layout').style.height = window.document.documentElement.clientHeight+"px";
    });
</script>
<template>
    <a-layout>
        <a-layout-header style="background:#fff;">
            <a-row justify="space-between">
                <a-col :span="4">{{t("headBar.title")}}</a-col>
                <a-col :span="16">
                    <a-menu
                        v-model:selectedKeys="activeTab"
                        :theme="theme"
                        mode="horizontal"
                        :style="{ lineHeight: '64px' }"
                    >
                        <a-menu-item key="1" @click="commonNav">{{t("headBar.common")}}</a-menu-item>
                        <a-menu-item key="2" @click="settingNav">{{t("headBar.setting")}}</a-menu-item>
                    </a-menu>
                </a-col>
                <a-col :span="4">
                    <div class="usrmenu">
                        <a-avatar size="large">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        <div style="width:12px;"></div>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>{{t('headBar.defaultUsr')}}</a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="logout" key="logout">{{t("headBar.logout")}}</a-menu-item>
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
                <a-breadcrumb v-if="breads.length" style="padding:10px;background:#ffffff;">
                    <template v-for="item in breads" :key="item.routeName">
                        <a-breadcrumb-item>{{item.breadName}}</a-breadcrumb-item>
                    </template>
                </a-breadcrumb>
                <router-view name="RightSidebar"></router-view>
            </a-layout-content>
        </a-layout>
        <a-layout-footer>
            <div style="text-align:center;">{{t('footerBar.content')}}</div>
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