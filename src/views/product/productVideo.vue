/* eslint-disable no-unused-vars */
<template>
  <a-layout>
    <a-layout-content style="display: flex; flex-flow: column nowrap">
      <a-card style="flex-grow: 1">
        <header>
          <a-input
            v-model:value="videoName"
            style="width: 200px"
            placeholder="这里输入视频名称"
            @search="onSearch"
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
          <a-button style="margin: 0 2px" type="primary">
            <template #icon><SearchOutlined /></template>
          </a-button>
        </header>
        <section>
          <a-table
            :columns="columns"
            :data-source="productInfo.list"
            bordered
            :locale="{ emptyText: '暂无数据' }"
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'dataIndex'">
                <span> 序号 </span>
              </template>
            </template>

            <template #bodyCell="{ column, index }">
              <template v-if="column.key === 'dataIndex'">
                {{ index + 1 }}
              </template>
              <template v-else-if="column.key === 'isToOrder'">
                <!-- <span> {{ record }} </span> -->
                <!-- <span>嘻嘻</span> -->
              </template>
              <template v-else-if="column.key === 'action'">
                <span>
                  <edit-outlined @click="edit(column.key, column.key)" />
                </span>
              </template>
            </template>
          </a-table>
          <a-button class="add" type="primary" @click="edit()">新增</a-button>
        </section>
        <a-modal v-model:visible="visible" :title="modalTitle" :footer="null">
          <a-form
            :model="formState"
            ref="formRef"
            name="basic"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            autocomplete="off"
            @validate="handleValidate"
            @finishFailed="onFinishFailed"
          >
            <a-form-item label="名称" name="videoName" :rules="rules.videoName">
              <a-input
                placeholder="这里输入视频名称"
                v-model:value="formState.videoName"
              />
            </a-form-item>
            <a-form-item label="简述" name="info" :rules="rules.info">
              <a-input
                placeholder="这里输入简述"
                v-model:value="formState.info"
              />
            </a-form-item>
            <a-form-item label="视频" name="productPic">
              <div class="clearfix">
                <span style="color: red; font-size: 12px"
                  >建议视频是大小不超过50M</span
                >
                <a-upload
                  v-model:file-list="formState.productPic"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  @change="handleChangePic"
                  @preview="handlePreview"
                >
                  <div v-if="formState.productPic.length < 1">
                    <plus-outlined />
                    <div style="margin-top: 8px; font-size: 13px">视频</div>
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
              </div>
            </a-form-item>
            <a-form-item label="排序号" name="sortNum" :rules="rules.sort">
              <a-input
                placeholder="这里输入序号"
                v-model:value="formState.sortNum"
              />
            </a-form-item>
            <a-form-item label="产品" name="productStatus">
              <a-select
                ref="select"
                placeholder="请选择产品"
                v-model:value="formState.product"
                @focus="focusStatus"
                @change="handleChangeStauts"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="状态" name="productStatus">
              <a-select
                ref="select"
                placeholder="请选择状态"
                v-model:value="formState.status"
                @focus="focusStatus"
                @change="handleChangeStauts"
              >
                <a-select-option value="open">启用</a-select-option>
                <a-select-option value="ban">禁用</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              style="margin-top: 20px"
              :wrapper-col="{ span: 14, offset: 8 }"
            >
              <a-button type="primary" @click.prevent="handleOk">保存</a-button>
              <a-button style="margin-left: 10px" @click="hiddenModal"
                >取消</a-button
              >
            </a-form-item>
          </a-form>
        </a-modal>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { onMounted, ref, reactive, toRaw } from "vue";
import { message } from "ant-design-vue";
import {
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

import { getProductInfo } from "@src/api/requests.js";

const videoName = ref("");

const visible = ref(false);
const dialogTitle = ref("");
const dialogIndex = ref("");
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

// const fileList = ref([]);

let productInfo = ref("");
let modalTitle = ref("新增");
const formRef = ref("");

let formState = reactive({
  videoName: "",
  info: "",
  productPic: [],
  sortNum: "",
  product: "jack",
  status: "open",
});

const rules = reactive({
  videoName: {
    required: true,
    validator: validateName,
    message: "这里输入视频名称",
  },
  info: {
    required: true,
    validator: validateInfo,
    message: "这里输入简述",
  },
  sort: {
    required: true,
    validator: validateSort,
    message: "这里输入序号",
  },
});

let validateName = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入视频名称");
  } else {
    if (formState.videoName !== "") {
      formRef.value.validateFields("请检查视频名称");
    }
    return Promise.resolve();
  }
};
let validateInfo = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入简述");
  } else {
    if (formState.info !== "") {
      formRef.value.validateFields("请检查简述");
    }
    return Promise.resolve();
  }
};
let validateSort = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入序号");
  } else {
    if (formState.info !== "") {
      formRef.value.validateFields("请输入序号");
    }
    return Promise.resolve();
  }
};
// 表格
const columns = [
  {
    dataIndex: "name",
    name: "name",
    key: "dataIndex",
  },
  {
    title: "视频名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "产品名称",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "简要信息",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "排序号",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "观看次数",
    key: "isToOrder",
    dataIndex: "isToOrder",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "操作",
    key: "action",
  },
];

onMounted(() => {
  let current = 1;
  let pages = 1;
  let size = 10;
  getProductInfo({ current, pages, size }).then((res) => {
    let temp = res.data.data;
    if (temp.list.length > 0) {
      temp.list.map((item) => {
        item.isToOrder = item.isToOrder == 1 ? "是" : "否";
        item.status = item.status == 1 ? "有效" : "失效";
      });
    }
    productInfo.value = temp;
  });
  //   dialog
});

function edit(key) {
  console.log("当前行索引：", key);
  key = key == undefined ? "新增" : "编辑";
  let title = modalTitle.value;
  showModal(title, key);
}

function onSearch() {
  visible.value = true;
  modalTitle.value = "编辑";
  console.log(
    "onSearch",
    "视频名称：",
    videoName.value,
    "弹窗标题：",
    modalTitle.value
  );
}

// modal
function handleValidate(...args) {
  console.log(args);
}

function hiddenModal() {
  visible.value = false;
}

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function showModal(title, index) {
  visible.value = true;
  dialogTitle.value = ref(title);
  dialogIndex.value = ref(index);
  console.log(index);
  console.log(title);
  //   return dialogIndex.value;
}

function handleOk(e) {
  console.log(e);
  visible.value = false;
  console.log("submit!", toRaw(formState));
}

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

function handleChangePic(info) {
  console.log(info.fileList[0].name);
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }

  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
}

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    // file.preview = await getBase64(file.originFileObj);
    file.preview = file.originFileObj;
  }
  previewImage.value = file.url || file.preview;
  console.log(previewImage.value.name);
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

// status
function focusStatus() {
  console.log("focusStatus");
}
function handleChangeStauts(value) {
  console.log(`selected-Stauts ${value}`);
}
</script>

<style lang="less" scoped>
header {
  display: flex;
}
.editable-row-operations a {
  margin-right: 8px;
}
section {
  position: relative;
  margin-top: 12px;
  .add {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 12px;
  }
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