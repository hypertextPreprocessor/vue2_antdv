<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-space><a-button @click="goback">返回</a-button></a-space>
                <p></p>
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="楼宇基础信息">
                        <p>Content of Tab Pane 1</p>
                        <p>Content of Tab Pane 1</p>
                        <p>Content of Tab Pane 1</p>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="物业公司信息">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="宣传媒体信息">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="4" tab="移动网络情况">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="5" tab="固网资源及业务情况">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="6" tab="拓展渠道信息">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="7" tab="市场情况">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                    <a-tab-pane key="8" tab="客户总览">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </a-tab-pane>
                </a-tabs>
                <a-divider />
                <a-space>
                    <a-button type="primary">保存</a-button>
                    <a-button type="primary">新增客户</a-button>
                </a-space>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const activeKey = ref('2')
var router = useRouter();
function goback(){
    router.back();
}
</script>