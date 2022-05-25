/* eslint-disable no-unused-vars */
<template>
  <div id="productSort">
    <a-layout>
      <a-layout-content style="display: flex; flex-flow: column nowrap">
        <a-card style="flex-grow: 1">
          <header>
            <a-input
              v-model:value="productName"
              style="width: 200px"
              placeholder="这里输入名称"
              @change="getProductName"
            >
              <template #prefix>
                <search-outlined />
              </template>
            </a-input>

            <a-select
              ref="select"
              style="margin: 0 2px"
              placeholder="请选择状态"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="all">全部</a-select-option>
              <a-select-option value="vaild">有效</a-select-option>
              <a-select-option value="invaild">失效</a-select-option>
            </a-select>
            <a-button type="primary" @click="onSearch">
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
            <a-button class="add" type="primary" @click="edit">新增</a-button>
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
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                label="名称"
                name="username"
                :rules="rules.productName"
              >
                <a-input
                  placeholder="这里输入名称"
                  v-model:value="formState.productName"
                />
              </a-form-item>
              <a-form-item label="图片" name="productPic">
                <div class="clearfix">
                  <span style="color: red; font-size: 12px"
                    >建议图片比例是750x375，大小不超过300K</span
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
                      <div style="margin-top: 8px; font-size: 13px">
                        产品类别图
                      </div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :title="previewTitle"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </a-form-item>
              <a-form-item label="图标" name="iconPic">
                <div class="clearfix">
                  <span style="color: red; font-size: 12px"
                    >建议图片比例65x65，大小不超过10k的透明底色png格式图片</span
                  >
                  <a-upload
                    v-model:file-list="formState.iconPic"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    @preview="handlePreviewIcon"
                  >
                    <div v-if="formState.iconPic.length < 1">
                      <plus-outlined />
                      <div style="margin-top: 8px; font-size: 13px">图标</div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :title="previewTitle"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </a-form-item>
              <a-form-item
                label="排序号"
                name="sortNum"
                :rules="[{ required: true, message: '这里输入排序号' }]"
              >
                <a-input
                  placeholder="这里输入序号"
                  v-model:value="formState.sortNum"
                />
              </a-form-item>
              <a-form-item label="是否支持快速下单" name="hasSupport">
                <a-checkbox v-model:checked="formState.hasSupport"></a-checkbox>
              </a-form-item>
              <a-form-item label="状态" name="status">
                <a-select
                  ref="select"
                  style="margin: 0 2px"
                  placeholder="请选择状态"
                  :value="formState.status"
                  @focus="focusStatus"
                  @change="handleChangeStauts"
                >
                  <a-select-option value="vaild">有效</a-select-option>
                  <a-select-option value="invaild">失效</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                style="margin-top: 20px"
                :wrapper-col="{ span: 14, offset: 8 }"
              >
                <a-button type="primary" @click="handleOk">保存</a-button>
                <a-button style="margin-left: 10px" @click="hiddenModal"
                  >取消</a-button
                >
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive, toRaw } from "vue";
import {
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

import { getProductInfo } from "@src/api/requests.js";

const productName = ref("");
let productInfo = ref("");
let productStatus = ref("");
let modalTitle = ref("新增");
const visible = ref(false);

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const formRef = ref("");

const formState = reactive({
  productName: "",
  productPic: [],
  iconPic: [],
  sortNum: "",
  hasSupport: false,
  status: "vaild",
});

const rules = reactive({
  productName: {
    required: true,
    validator: validateName,
    message: "这里输入名称",
  },
});
let validateName = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Please input the password");
  } else {
    if (formState.productName !== "") {
      formRef.value.validateFields("checkPass");
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
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "排序号",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "支持快速下单",
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
    "名称：",
    productName.value,
    "状态：",
    productStatus.value,
    "新增：",
    modalTitle.value
  );
}
function getProductName() {
  console.log("名称：", productName.value);
}
function focus() {
  // console.log("focus");
}
function handleChange(value) {
  productStatus.value = value;
  console.log(`selected ${value}`);
}

// modal
function handleValidate(...args) {
  console.log(args);
}

function hiddenModal() {
  visible.value = false;
}
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function showModal(title, index) {
  visible.value = true;
  console.log(index);
  console.log(title);
}

function handleOk() {
  visible.value = false;
  console.log("submit!", toRaw(formState));
  // formRef.value.resetFields();
}

// productPic
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

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

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
const handlePreviewIcon = async (file) => {
  if (!file.url && !file.preview) {
    // file.preview = await getBase64(file.originFileObj);
    file.preview = file.originFileObj;
  }
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

// status
function focusStatus() {
  console.log("focusStatus");
}
function handleChangeStauts(value) {
  formState.status = value;
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