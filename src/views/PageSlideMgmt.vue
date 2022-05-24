<template>
    <a-layout-content>
        <a-card title="图册管理">
            <template #extra><a-button type="primary" ghost @click="()=>{addNewVisible=true}">新增</a-button></template>
            <div class="cardGrid">
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
                <ImgCard src="https://192.168.0.202/img/sample.png"/>
            </div>
        </a-card>
        <a-drawer
            v-model:visible="addNewVisible"
            title="新增"
            placement="right"
            okText="确定"
            cancelText="取消"
        >
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                :model="addState"
            >
                <a-form-item name="type" label="类别">
                    <a-select
                        v-model:value="addState.type"
                        show-search
                        placeholder="选择一个类别"
                        style="width:100%"
                        :options="options"
                        :filter-option="filterOption"
                    ></a-select>
                </a-form-item>
                <template v-if="selectedType==='product'">
                    <a-form-item name="product" label="产品">
                        <a-select
                            v-model:value="addState.product"
                            show-search
                            placeholder="选择一个产品"
                            style="width:100%"
                            :options="productOptions"
                            :filter-option="filterOption"
                        ></a-select>
                    </a-form-item>
                </template>
                <template v-else-if="selectedType==='link'">
                    <a-form-item name="link" label="链接">
                        <a-input v-model:value="addState.link"/>
                    </a-form-item>
                </template>
                <template v-else></template>
                <a-form-item name="fileList" label="大轮播图">
                    <a-upload
                        v-model:file-list="addState.fileList"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action=""
                        :before-upload="beforeUpload"
                        @change="handleChange"
                        @preview="handlePreview"
                    >
                        <div style="display:flex;flex-flow:column nowrap;align-items:center;justify-content:center;">
                            <div><PlusOutlined /></div>
                            <div>上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-drawer>
    </a-layout-content>
</template>
<script setup>
import ImgCard from '@coms/ImgCard';
import {ref,reactive,computed} from 'vue';
import { message } from 'ant-design-vue';
import {PlusOutlined} from '@ant-design/icons-vue';
const loading = ref(false);
const imageUrl = ref('');
const handlePreview =async (file)=>{
    console.log(file);
}
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const options=[{value:"none",label:"无"},{value:"product",label:"产品"},{value:"link",label:"连接"}];
const productOptions=[{
    value:"123156135",label:"沃有云-公有云"
},{
    value:"123156134",label:"云联网"
}];
const addNewVisible = ref(false);
const addState = reactive({type:"none"});
const selectedType = computed(()=>{
    return addState.type;
});
const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('只能上传jpg、png文件!');
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error('不能超过2MB!');
      }

      return isJpgOrPng && isLt2M;
    };
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
 const handleChange = info => {
        console.log(info);
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, base64Url => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
      }

      if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    };
</script>
<style scoped>
.cardGrid {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    align-content: center;
    justify-content:flex-start;
}
.cardGrid>div{
    margin-bottom:25px;
    margin-right: 25px;
}
</style>