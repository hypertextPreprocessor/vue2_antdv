<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-row>
                    <a-col :span="12">
                        <a-input-search
                            v-model:value="serchValue"
                            placeholder="输入关键字"
                            enter-button
                            @search="onSearch"
                        />
                    </a-col>
                </a-row>
                <a-divider />
                <a-row>
                    <a-col :span="24">
                        <a-tree
                            v-model:selectedKeys="selectedKeys"
                            v-model:checkedKeys="checkedKeys"
                            :default-expand-all="false"
                            checkable
                            :height="233"
                            :tree-data="treeData"
                             @select="onSelect"
                        >
                            <template #title="{ title }">
                                <span>{{title}}</span>
                                <span style="margin-left:30px;">
                                    <a-button type="primary" shape="default" size="small">
                                        <template #icon><EditOutlined /></template>
                                    </a-button>
                                    <span style="margin-left:13px;"></span>
                                    <a-button type="primary" shape="default" size="small" danger ghost>
                                        <template #icon><DeleteOutlined /></template>
                                    </a-button>
                                </span>
               
                                <!--<a-input-search
                                    v-model:value="title"
                                    placeholder="title"
                                    size="small"
                                    @search="()=>{onConfirm(key)}"
                                >
                                    <template #enterButton>
                                        <a-button>确认</a-button>
                                    </template>
                                </a-input-search>-->
                            </template>
                        </a-tree>
                    </a-col>
                </a-row>
                <a-divider />
                <a-row>
                    <a-col :span="6">
                        <div class="handleButton">
                            <a-button type="primary" shape="default" size="large">新增</a-button>
                            <a-button type="primary" shape="default" size="large" danger>删除所选</a-button>
                        </div>
                    </a-col>
                </a-row>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import {ref,onMounted} from 'vue';
    import {EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';
    import {loadOrgzTree} from "@api";
    const treeData = [{
        title:"woqi",
        key:"woqi",
        children:[
            {title:"woqi1",key:"woqi1"}
        ]
    }]
    const selectedKeys=ref([]);
    const checkedKeys=ref([]);
    const serchValue=ref("");
    function onSearch(){}
    function onSelect(key,event){
        console.log(key);
        console.log(event);
    }
    onMounted(()=>{
        loadOrgzTree().then(res=>{
            console.log(res);
        });
    });
    /*
    function onConfirm(key){
        console.log(key)
    }
    */
</script>
<style scoped>
    .handleButton{
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
    }
</style>