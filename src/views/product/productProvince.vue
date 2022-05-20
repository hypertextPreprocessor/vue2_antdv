/* eslint-disable no-unused-vars */
<template>
  <a-layout>
    <a-layout-content style="display: flex; flex-flow: column nowrap">
      <a-card style="flex-grow: 1">
        <header>
          <a-input
            v-model:value="userName"
            style="width: 200px"
            placeholder="这里输入名称"
            @search="onSearch"
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>

          <a-select
            ref="select"
            style="margin: 0 2px"
            placeholder="请选择产品类别"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled
              >Disabled</a-select-option
            >
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-select
            ref="select"
            style="margin: 0 2px"
            placeholder="请选择状态"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled
              >Disabled</a-select-option
            >
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-button type="primary">
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

        <a-modal
          v-model:visible="visible"
          title="新增"
          @ok="handleOk"
          :footer="null"
        >
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              label="名称"
              name="username"
              :rules="[{ required: true, message: '这里输入名称' }]"
            >
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="图片" name="productPic">
              <div class="clearfix">
                <span style="color: red; font-size: 12px"
                  >建议图片比例是750x375，大小不超过300K</span
                >
                <a-upload
                  v-model:file-list="fileList"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  @preview="handlePreview"
                >
                  <div v-if="fileList.length < 1">
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
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-form-item>
            <a-form-item label="图标" name="iconPic">
              <div class="clearfix">
                <span style="color: red; font-size: 12px"
                  >建议图片比例65x65，大小不超过10k的透明底色png格式图片</span
                >
                <a-upload
                  v-model:file-list="iconList"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  @preview="handlePreviewIcon"
                >
                  <div v-if="iconList.length < 1">
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
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-form-item>
            <a-form-item
              label="排序号"
              name="sortNum"
              :rules="[{ required: true, message: '这里输入排序号' }]"
            >
              <a-input v-model:value="formState.sortNum" />
            </a-form-item>
            <a-form-item label="是否支持快速下单" name="checked">
              <a-checkbox v-model:checked="formState.checked"></a-checkbox>
            </a-form-item>
            <a-from-item label="状态" name="productStatus">
              <span style="margin-left: 74px">状态：</span>
              <a-select
                ref="select"
                style="margin: 0 2px"
                placeholder="请选择状态"
                @focus="focusStatus"
                @change="handleChangeStauts"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled
                  >Disabled</a-select-option
                >
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-from-item>
            <a-form-item
              style="margin-top: 20px"
              :wrapper-col="{ span: 14, offset: 8 }"
            >
              <a-button type="primary" @click.prevent="handleOk">保存</a-button>
              <a-button style="margin-left: 10px" @click="hiddenModal"
                >取消</a-button
              >
            </a-form-item>

            <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button>取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item> -->
          </a-form>
        </a-modal>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
// EditOutlined
import {
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
// import { cloneDeep } from "lodash-es";
import { getProductInfo } from "@src/api/requests.js";

const userName = ref("");
// const status = ref("");

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

let productInfo = ref("");
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
// eslint-disable-next-line no-unused-vars
function edit(key) {
  console.log("当前行索引：", key);
  let title = key == undefined ? "新增" : "编辑";
  key = key == undefined ? "新增" : "编辑";
  showModal(title, key);
  //   editableData[key] = cloneDeep(
  //     dataSource.value.filter((item) => key === item.key)[0]
  //   );
}

function onSearch() {
  console.log("onSearch");
}
function focus() {
  console.log("focus");
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

// modal
const visible = ref(false);
const dialogTitle = ref("");
const dialogIndex = ref("");
function hiddenModal() {
  visible.value = false;
}

let formState = reactive({
  username: "",
  sortNum: "",
  productPic: "",
  iconPic: "",
  checked: false,
  status: "",
});

// function handleCheckbox(e) {
//   console.log(e.target.checked);
//   let temp = e.target.checked;
//   temp = !temp;
//   console.log(temp);
//   formState.checked = temp;
//   console.log(formState.checked);
// }
const onFinish = (values) => {
  console.log("Success:", values);
};

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
}

// product-img
// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);

//     reader.onerror = (error) => reject(error);
//   });
// }

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
// const fileList = ref([
//   {
//     uid: "-1",
//     name: "image.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-2",
//     name: "image.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-3",
//     name: "image.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-4",
//     name: "image.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-xxx",
//     percent: 50,
//     name: "image.png",
//     status: "uploading",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-5",
//     name: "image.png",
//     status: "error",
//   },
// ]);

const fileList = ref([]);
const iconList = ref([]);

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
const iconPic = ref("");
const handlePreviewIcon = async (file) => {
  if (!file.url && !file.preview) {
    // file.preview = await getBase64(file.originFileObj);
    file.preview = file.originFileObj;
  }
  iconPic.value = file.url || file.preview;
  console.log(iconPic.value.name);
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