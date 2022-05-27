<template>
  <a-layout-content>
    <a-card title="地市促销管理">
      <template #extra
        ><a-button type="primary" ghost @click="handlBtn"
          >新增</a-button
        ></template
      >
      <div class="cardGrid">
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          @click="handlBtn('edit')"
          src="https://192.168.0.202/img/sample.png"
        />
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          src="https://192.168.0.202/img/sample.png"
        />
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          src="https://192.168.0.202/img/sample.png"
        />
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          src="https://192.168.0.202/img/sample.png"
        />
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          src="https://192.168.0.202/img/sample.png"
        />
        <ImgCard
          :desc="true"
          titleInfo="我是产品"
          descInfo="我是市名"
          src="https://192.168.0.202/img/sample.png"
        />
      </div>
    </a-card>
    <a-drawer
      v-model:visible="addNewVisible"
      :title="modalTitle"
      placement="right"
      okText="确定"
      cancelText="取消"
    >
      <a-form
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        :model="addState"
      >
        <a-form-item name="city" label="市名">
          <a-input
            v-model:value="city"
            disabled="”true“"
            placeholder="请输入市名"
          />
        </a-form-item>
        <a-form-item name="sort" label="序号">
          <a-input
            v-model:value="sort"
            type="number"
            placeholder="请输入序号"
          />
        </a-form-item>
        <a-form-item name="clissify" label="产品">
          <a-select
            ref="select"
            placeholder="请选择产品"
            v-model:value="productClissify"
            @focus="focus"
            @change="handleChangeClissify"
          >
            <a-select-option value="iron">钢铁侠</a-select-option>
            <a-select-option value="enterprise">企业业务</a-select-option>
            <a-select-option value="private">个人业务</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item name="poster" label="促销图">
          <a-upload
            v-model:file-list="fileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :before-upload="beforeUpload"
            @preview="handlePreview"
            @change="handleChangePoster"
          >
            <div v-if="fileList.length < 1">
              <plus-outlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :title="previewTitle"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
      </a-form>
    </a-drawer>
  </a-layout-content>
</template>
<script setup>
import ImgCard from "@coms/ImgCard";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const addNewVisible = ref(false);
const city = ref("");
// const previewVisible = ref(false);
// const previewImage = ref("");
// const previewTitle = ref("");
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const productClissify = ref("iron");
const fileList = ref([]);

function focus() {
  console.log("focus");
}
function handleChangeClissify(value) {
  productClissify.value = value;
  console.log(`selected ${value}`);
}

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    // file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

const modalTitle = ref("新增");
function handlBtn(key) {
  modalTitle.value = key == "edit" ? "编辑" : "新增";
  addNewVisible.value = true;
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传jpg、png文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("不能超过2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function handleChangePoster(info) {
  console.log(info.fileList[0].name);
  if (info.file.status !== "uploading") {
    // console.log(info.file, info.fileList);
  }

  if (info.file.status === "done") {
    // message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
}
</script>
<style scoped>
.cardGrid {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}
.cardGrid > div {
  margin-bottom: 25px;
  margin-right: 25px;
}
header {
  margin-bottom: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>