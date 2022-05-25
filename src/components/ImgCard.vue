<template>
  <a-card hoverable style="width: 300px">
    <template #cover>
      <div style="overflow: hidden; width: 300px; height: 200px">
        <a-image :width="300" :src="src" :fallback="errorImg" />
      </div>
    </template>
    <template #actions>
      <a-button type="link" v-if="edit">
        <template #icon><EditOutlined /></template>编辑
      </a-button>
      <a-button type="link" style="color: red" v-if="del">
        <template #icon>
          <DeleteOutlined />
        </template>
        删除
      </a-button>
    </template>
    <a-card-meta>
      <template #title>产品</template>
      <template #description>产品描述</template>
    </a-card-meta>
  </a-card>
</template>
<script setup>
import { defineProps } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import errorImg from "@img/default.jpg";
defineProps({
  src: {
    type: String,
    required: true,
  },
  edit: {
    type: Boolean,
    required: false,
    default: true,
  },
  del: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>