<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys"
        :theme="theme" 
        :open-keys="openKeys"
        @openChange="onOpenChange"
        @select="menuSelect"
        mode="inline"
    >
        <a-menu-item key="profile">
            <span>个人资料</span>
        </a-menu-item>
        <a-menu-item key="sysSetting">
            <span>系统设置</span>
        </a-menu-item>
        <a-menu-item key="logout">
            <span>退出登录</span>
        </a-menu-item>
    </a-menu>
</template>
<script setup>
    import {ref,reactive,toRefs} from 'vue';
    import { useRouter } from "vue-router";
    import {usrLogout} from '@api';
    import {useConfig} from '@store';
    import {Modal} from 'ant-design-vue';
    const router = useRouter();
    var store = useConfig();
    var theme = ref("light");
    const state = reactive({
      rootSubmenuKeys: ['profile','sysSetting', 'logout'],
      openKeys: [],
      selectedKeys: [],
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
</script>
