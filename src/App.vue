<template>
    <a-config-provider :locale="language">
        <router-view/>
    </a-config-provider>
</template>
<script setup>
    import {ref,onMounted,watch} from 'vue';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import enUS from 'ant-design-vue/es/locale/en_US';
    import esEs from 'ant-design-vue/es/locale/es_ES';
    import {useConfig} from '@store';
    var store = useConfig();
    const language = ref(zhCN);
    watch(
        ()=>store.local,
        (n,o)=>{
            console.log(n,o);
            alterLocale(n);
        }
    )
    function alterLocale(str){
        switch(str){
            case 'Chinese':
                language.value=zhCN;
                break;
            case 'English':
                language.value=enUS;
                break;
            case 'Spanish':
                language.value=esEs;
                break;
            default:
                language.value=zhCN;
        }
    }
    onMounted(()=>{
        alterLocale(store.local);
        /*
        console.log(language.value);    //zh-cn
        console.log(enUS.locale);       //en
        console.log(esEs.locale);       //es
        */

    });
</script>
<style>
html{
    background:#f0f2f5;
}
</style>