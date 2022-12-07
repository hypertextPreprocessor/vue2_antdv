<template>
    <div style="height:100%;overflow:hidden;">
        <div v-if="state.breadcrumb.length" style="padding:20px;background:#ffffff;">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="item in state.breadcrumb" :key="item">{{t(`navMenu.${item.name}`)}}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup>
    import {reactive,onMounted,watch} from 'vue';
    import {useRoute} from 'vue-router';
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n({ useScope: 'global' });
    var route = useRoute();
    var state = reactive({
        breadcrumb:[]
    });
    watch(()=>route.path,()=>{
        state.breadcrumb = route.matched.filter(item=>item.name!="home"&& item.name !="mainCommon" && item.name !="mainSetting");
    });
    onMounted(()=>{
        state.breadcrumb = route.matched.filter(item=>item.name!="home"&& item.name !="mainCommon" && item.name !="mainSetting");
    })
</script>