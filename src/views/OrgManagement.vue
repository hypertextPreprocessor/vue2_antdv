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
                        <template v-if="treeData===null">
                            <a-skeleton />
                        </template>
                        <template v-else>
                            <!--@select="onSelect"-->
                        <a-tree v-if="treeData.length"
                            v-model:selectedKeys="selectedKeys"
                            v-model:checkedKeys="checkedKeys"
                            :default-expand-all="false"
                            :checkable="false"
                            :height="233"
                            :tree-data="treeData"
                            :field-names="fieldNames"
                        >
                            <template #title="{ name,id,parentId }">
                                <span>{{name}}</span>
                                <span style="margin-left:30px;">
                                    <a-button type="primary" shape="default" size="small" @click="()=>{editItem(name,id,parentId)}">
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
                        <a-empty v-else :image="simpleImage" >
                            <template #description>暂无数据</template>
                        </a-empty>
                        </template>
                    </a-col>
                </a-row>
                <a-divider />
                <a-row>
                    <a-col :span="6">
                        <div class="handleButton">
                            <a-button type="primary" shape="default" size="large" @click="addNewItem">新增</a-button>
                            <!--<a-button type="primary" shape="default" size="large" danger>删除所选</a-button>-->
                        </div>
                    </a-col>
                </a-row>
            </a-card>
        </a-layout-content>
        <a-modal
            v-model:visible="visible"
            title="Title"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
        >
            <p>{{ modalText }}</p>
        </a-modal>
    </a-layout>
</template>
<script setup>
    import {ref,onMounted} from 'vue';
    import {EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';
    import {loadOrgzTree} from "@api";
    import { Empty } from 'ant-design-vue';
    var treeData = ref(null);
    const visible = ref(false);
    const confirmLoading = ref(false);
    const selectedKeys=ref([]);
    const checkedKeys=ref([]);
    const serchValue=ref("");
    const fieldNames = {
        title:'name',
        key:'id'
    }
    var simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    function onSearch(){}
    /*
    function onSelect(key,event){
        console.log(key);
        console.log(event);
    }
    */
    const showModal = () => {
      visible.value = true;
    };
    function addNewItem(){
        console.log(treeData.value);
    }
    const handleOk = ()=>{

    }
    function editItem(name,id,parentId){
        console.log(name);
        console.log(id);
        console.log(parentId);
        showModal();
    }
    onMounted(()=>{
        loadOrgzTree().then(res=>{
            var {code,data} = res.data; 
            console.log(code);
            console.log(data);
            console.log(code === 1);
            if(code==1){
                treeData.value = data;
            }
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