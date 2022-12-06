<template>
    <a-layout-content>
        <a-card :title='t("setting.sysSetting.title")'>
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
                @finish="onFinish"
            >
                <a-form-item :label='t("setting.sysSetting.flanguage")'>
                    <a-select
                        v-model:value="formState.locale"
                        show-search
                        :placeholder='t("setting.sysSetting.flpl")'
                        style="width: 200px"
                        :options="options"
                        :filter-option="filterOption"
                        @change="handleChange"
                    >
                    </a-select>
                </a-form-item>
            </a-form>
        </a-card>
    </a-layout-content>    
</template>
<script setup>
import {reactive,onMounted} from 'vue';
import {useConfig} from '@store';
import { useI18n} from "vue-i18n";
var store = useConfig();
const { t , locale} = useI18n({ useScope: 'global' });
const formState = reactive({
    locale:"Chinese"
});
function onFinish(values){
    console.log(values);
}
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
function handleChange(x){
  store.local = x;
  locale.value = x;
}
const options = [
    {value:"Chinese",label:"中文"},
    {value:"English",label:"English"},
    {value:"Spanish",label:"Español"}
]
onMounted(()=>{
    switch(store.local){
        case "Chinese":
            formState.locale = "Chinese";
            break;
        case "English":
            formState.locale = "English";
            break;
        case "Spanish":
            formState.locale = "Spanish";
            break;
        default:
            formState.locale = "Chinese";
    }
});
</script>
