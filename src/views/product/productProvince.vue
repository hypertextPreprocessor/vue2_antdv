/* eslint-disable no-unused-vars */
<template>
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
            placeholder="请选择产品类别"
            @change="handleChangeClissify"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="company">公司业务</a-select-option>
            <a-select-option value="enterprise">企业业务</a-select-option>
          </a-select>
          <a-select
            ref="select"
            style="margin: 0 2px"
            placeholder="请选择状态"
            @change="handleChangeStauts"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="vaild">有效</a-select-option>
            <a-select-option value="invaild">失效</a-select-option>
          </a-select>
          <a-button type="primary" @click="onSearch">
            <template #icon><SearchOutlined /></template>
          </a-button>
        </header>
        <body>
          <a-table
            :columns="columns"
            :data-source="productInfo.list"
            bordered
            :locale="{ emptyText: '暂无数据' }"
            :pagination="pagination"
            @change="tableChange"
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
        </body>
        <a-modal
          v-model:visible="visible"
          :title="modalTitle"
          :footer="null"
          width="700px"
        >
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
            <a-form-item label="产品类别" name="productStatus">
              <a-select
                ref="select"
                placeholder="请选择产品类别"
                v-model:value="formState.productClissify"
                @change="handleChangeClissify"
              >
                <a-select-option value="ticket">芬兰船票</a-select-option>
                <a-select-option value="company">公司业务</a-select-option>
                <a-select-option value="enterprise">企业业务</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="名称"
              name="productName"
              :rules="rules.productName"
            >
              <a-input
                placeholder="这里输入名称"
                v-model:value="formState.productName"
              />
            </a-form-item>
            <a-form-item label="简述" name="info" :rules="rules.info">
              <a-input
                placeholder="这里输入简述"
                v-model:value="formState.info"
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
                    <div style="margin-top: 8px; font-size: 13px">封面图</div>
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
            <a-form-item label="积分" name="grade" :rules="rules.grade">
              <a-input
                placeholder="这里输入积分"
                v-model:value="formState.grade"
              />
            </a-form-item>
            <a-form-item
              label="排序号"
              name="rank"
              :rules="[{ required: true, message: '这里输入排序号' }]"
            >
              <a-input
                placeholder="这里输入排序号"
                v-model:value="formState.rank"
              />
            </a-form-item>
            <a-form-item label="是否支持快速下单" name="checked">
              <a-checkbox-group
                v-model:value="formState.hasOrder"
                style="width: 100%"
              >
                <a-checkbox value="是否新品">是否新品</a-checkbox>
                <a-checkbox value="是否热门">是否热门</a-checkbox>
                <a-checkbox value="云网/saas">云网/saas</a-checkbox>
                <a-checkbox value="是否支持快速下单"
                  >是否支持快速下单</a-checkbox
                >
                <a-checkbox value="是否一键下单">是否一键下单</a-checkbox>
                <a-checkbox value="是否跳转下单">是否跳转下单</a-checkbox>
                <a-checkbox value="是否首页显示">是否首页显示</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
            <a-form-item
              label="政企助手产品id："
              name="sortNum"
              :rules="[{ required: true, message: '这里输入政企助手产品id' }]"
            >
              <a-input
                placeholder="这里输入政企助手产品id"
                v-model:value="formState.sortNum"
              />
            </a-form-item>
            <a-form-item label="客户经理" name="productStatus">
              <a-select
                ref="select"
                placeholder="请选择客户经理"
                :value="formState.Manager"
                @change="handleChangeManager"
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
                :value="formState.status"
                @change="handleChangeStautsModal"
              >
                <a-select-option value="vaild">有效</a-select-option>
                <a-select-option value="invaild">失效</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="详情" name="content">
              <QuillEditor v-model:value="formState.content" theme="snow" />
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
</template>
<script setup>
import { onMounted, ref, reactive, toRaw } from "vue";
import { message } from "ant-design-vue";
import {
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { productProvinceInfo } from "@src/api/requests.js";

const productName = ref("");
const productClissify = ref("");
let productStatus = ref("");

// 表格
const columns = [
  {
    dataIndex: "name",
    name: "name",
    key: "dataIndex",
  },
  {
    title: "产品类别名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "产品名称",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "积分",
    key: "isToOrder",
    dataIndex: "isToOrder",
  },
  {
    title: "排序号",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "新品",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "热门",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "支持快速下单",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "首页显示",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "一键下单",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "跳转下单",
    dataIndex: "orderNo",
    key: "orderNo",
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
const pagination = reactive({
  total: 0,
  defaultPageSize: 10,
  showTotal: (total) => `共 ${total} 条数据`,
  // showSizeChanger: true,
  showSizeChanger: false,
  // pageSizeOptions: ["5", "10", "15", "20"],
  onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
});

let productInfo = ref("");

const formRef = ref("");
let modalTitle = ref("新增");
const visible = ref(false);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

const formState = reactive({
  productClissify: "ticket",
  productName: "",
  info: "",
  productPic: [],
  grade: "",
  rank: "",
  sortNum: "",
  hasOrder: [],
  Manager: "jack",
  status: "vaild",
  content: "", // 富文本内容
});
const rules = reactive({
  productName: {
    required: true,
    validator: validateName,
    message: "这里输入名称",
  },
  info: {
    required: true,
    validator: validateInfo,
    message: "这里输入简述",
  },
  grade: {
    required: true,
    validator: validateGrade,
    message: "这里输入积分",
  },
});

let validateName = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入名称");
  } else {
    if (formState.productName !== "") {
      formRef.value.validateFields("请检查名称");
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
let validateGrade = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入积分");
  } else {
    if (formState.grade !== "") {
      formRef.value.validateFields("请检查简述");
    }
    return Promise.resolve();
  }
};

onMounted(() => {
  productProvincePage();
});

function productProvincePage({ current = 1, size = 10 } = {}) {
  productProvinceInfo({ current, size }).then((res) => {
    let temp = res.data.data;
    if (temp.list.length > 0) {
      temp.list.map((item) => {
        item.isToOrder = item.isToOrder == 1 ? "是" : "否";
        item.status = item.status == 1 ? "有效" : "失效";
      });
    }
    pagination.total = temp.total;
    productInfo.value = temp;
  });
}

function tableChange(pagination) {
  const { current } = pagination;
  console.log(current);
  productProvincePage({ current });
}

function edit(key) {
  console.log("当前行索引：", key);
  key = key == undefined ? "新增" : "编辑";
  let title = modalTitle.value;
  showModal(title, key);
}

function getProductName() {
  console.log("名称：", productName.value);
}

function handleChangeClissify(value) {
  productClissify.value = value;
  formState.productClissify = value;
  console.log(`selected ${value}`);
}

function onSearch() {
  visible.value = true;
  modalTitle.value = "编辑";
  console.log(
    "onSearch",
    "名称：",
    productName.value,
    "类别：",
    productClissify.value,
    "状态：",
    productStatus.value,
    "弹窗标题：",
    modalTitle.value
  );
}

// modal
function handleValidate(...args) {
  console.log(args);
}

const dialogTitle = ref("");
const dialogIndex = ref("");
function hiddenModal() {
  visible.value = false;
}

// const onFinish = (values) => {
//   console.log("Success:", values);
// };

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

function handleOk() {
  visible.value = false;
  console.log("submit!", toRaw(formState));
  // formState.hasOrder = [];
  // formState.content = "";
  // formRef.value.resetFields();
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

function handleChangeStauts(value) {
  productStatus.value = value;
  console.log(`selected ${value}`);
}
function handleChangeManager(value) {
  formState.Manager = value;
  console.log(`selected ${value}`);
}
function handleChangeStautsModal(value) {
  formState.status = value;
  console.log(`selected ${value}`);
}
</script>

<style lang="less" scoped>
header {
  display: flex;
}
.editable-row-operations a {
  margin-right: 8px;
}
body {
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