<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys"
        :theme="theme" 
        :open-keys="openKeys"
        @openChange="onOpenChange"
        @select="menuSelect"
        mode="inline"
    >   
    <template v-for="item in state.MenuList">
      <template v-if="item.children">
        <a-sub-menu :key="item.name">
          <template #icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </template>
          <template #title>{{t(`navMenu.${item.name}`)}}</template>
          <a-menu-item v-for="itm in item.children" :key="itm.name">{{t(`navMenu.${itm.name}`)}}</a-menu-item>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="item.name">
          <template #icon v-if="item.meta.icon">
            <Icon :component="item.meta.icon" />
          </template>
          <span>{{t(`navMenu.${item.name}`)}}</span>
        </a-menu-item>
      </template>
    </template>
    </a-menu>
</template>
<script setup>
    import {ref,reactive,toRefs,onMounted} from 'vue';
    import { useRouter } from "vue-router";
    import {usrLogout} from '@api';
    import {useConfig} from '@store';
    import {Modal} from 'ant-design-vue';
    import {myStaticRoute} from '@src/router/myRoute.js';
    import Icon from "@ant-design/icons-vue";
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    var store = useConfig();
    var theme = ref("light");
    const state = reactive({
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: ["profile"],
      MenuList:[]
    });
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
    function menuSelect({key}){
      if(key!="logout"){
        router.push({ name: key });
      }else{
        const modal = Modal.confirm();
        modal.update({
          title: '操作提示',
          content: '确认退出？',
          okText:"确定",
          cancelText:"取消",
          closable:true,
          destroyOnClose:true,
          onOk:()=>{
            logout();
            modal.destroy();
          },
          onCancel:()=>{
            modal.destroy();
          }
        });
      }
      
    }
    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    var {openKeys,selectedKeys} = toRefs(state);
    onMounted(()=>{
      if(store.dynamicRoute){
        state.MenuList = store.menuList.system.filter(item=>item.name!='notExist');
        store.menuList.system.map(it=>{
          state.rootSubmenuKeys.push(it.name);
        });
      }else{
        myStaticRoute(store);
        state.MenuList = store.menuList.system.filter(item=>item.name!='notExist');
        store.menuList.system.map(it=>{
          state.rootSubmenuKeys.push(it.name);
        });
      }
      /*
      myRoute(store,false).then(res=>{
        state.MenuList = res.system.filter(item=>item.name!='notExist');
        res.system.map(it=>{
          state.rootSubmenuKeys.push(it.name);
        });
      })
     */
    })
</script>
