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
            <p><a-input v-model:value="addAorgzValue" placeholder="输入组织名称" /></p>
        </a-modal>
        <a-drawer
            v-model:visible="visible1"
            class="custom-class"
            title="新增一个组织"
            placement="right"
        >
            <template #footer>
                <a-button style="margin-right: 8px" @click="onCloseDrawer">关闭</a-button>
                <a-button type="primary" @click="onConfrimDrawer" :loading="drawerSending">确认</a-button>
            </template>
            <p>新增到当前组织:</p>
            <a-tree-select
                v-model:value="drawerAddvalue"
                v-model:searchValue="drawerSearchValue"
                :default-expand-all="false"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="在当前组织下新增(不填写新增顶级组织)"
                allow-clear
                :fieldNames="fieldNames"
                :tree-data="treeDataSample"
            >
                <template #notFoundContent>
                    <a-empty :image="simpleImage" >
                        <template #description>暂无数据</template>
                    </a-empty>
                </template>
                <template #title="{name}">
                    {{name}}
                </template>
            </a-tree-select>
            <p></p>
            <a-input v-model:value="insertAorgValue" placeholder="输入组织名称" />
        </a-drawer>
    </a-layout>
</template>
<script setup>
    import {ref,onMounted} from 'vue';
    import {EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';
    import {loadOrgzTree,addNewOrgz} from "@api";
    import { Empty } from 'ant-design-vue';
    const drawerSending = ref(false);
    const insertAorgValue = ref('');
    const drawerAddvalue = ref();
    const drawerSearchValue = ref('');
    var treeData = ref(null);
    var treeDataSample = ref(null);
    const addAorgzValue = ref("");
    const visible = ref(false);
    const visible1 = ref(false);
    const confirmLoading = ref(false);
    const selectedKeys=ref([]);
    const checkedKeys=ref([]);
    const serchValue=ref("");
    const fieldNames = {
        title:'name',
        value:'id',
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
   const onCloseDrawer=()=>{
       visible1.value=false;
   };
   const onConfrimDrawer=()=>{
       if(insertAorgValue.value==""){
           visible1.value=false;
           return false;
       }else{
           drawerSending.value = true;
           if(drawerAddvalue.value=='' || drawerAddvalue.value == undefined){
               addNewOrgz({name:insertAorgValue.value,sortOrder:0,parentId:0}).then(res=>{
                   var {code} = res.data;
                   if(code === 1){
                       loadTree();
                       visible1.value=false;
                   }
                   drawerSending.value = false;
               });
           }else{
               addNewOrgz({name:insertAorgValue.value,parentId:drawerAddvalue.value,sortOrder:0}).then(res=>{
                   var {code} = res.data;
                   if(code === 1){
                       loadTree();
                       visible1.value=false;
                   }
                   drawerSending.value = false;
               });
           }

       }
       
   };
    const showModal = (name,id,parentId) => {
      visible.value = true;
      confirmLoading.value = true;
      console.log(name,id,parentId);
    };
    function addNewItem(){
        console.log(treeData.value);
        visible1.value=true;
    }
    const handleOk = ()=>{

    }
    function editItem(name,id,parentId){
        showModal(name,id,parentId);
    }
    function loadTree(){
        loadOrgzTree().then(res=>{
            var {code,data} = res.data; 
            console.log(code);
            console.log(data);
            console.log(code === 1);
            if(code==1){
                treeData.value = data;
                treeDataSample.value=Object.assign([],data);
                treeDataSample.value.unshift({
                    name:"新增一个顶级组织",
                    parentId:0,
                    id:null
                });
            }else{
                treeData.value = [];
                treeDataSample.value = [];
            }
        });
    }
    onMounted(()=>{
        loadTree();
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
        justify-content:flex-start;/* space-evenly;*/
    }
</style>