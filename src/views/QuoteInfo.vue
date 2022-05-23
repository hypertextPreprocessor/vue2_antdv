<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-form-item
                    :wrapper-col="{ span:6 }"
                    layout="inline"
                    :model="filterState"
                >
                    <a-form-item>
                         <a-input-search
                            v-model:value="filterState.value"
                            placeholder="这里输入关键字"
                            enter-button
                        />
                    </a-form-item>
                </a-form-item>
                <a-divider/>
                 <a-table :dataSource="dataSource" :columns="columns">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'actions'">
                            <a-space>
                                <a-button type="primary" ghost @click="()=>{productModel1=true}">
                                    <template #icon>
                                        <EyeOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" ghost @click="()=>{viewCheckVibility=true}">
                                    <template #icon>
                                        <EditOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" danger>
                                    <template #icon>
                                        <DeleteFilled/>
                                    </template>
                                </a-button>
                            </a-space>
                        </template>
                    </template>
                 </a-table>
                 <a-divider/>
                 <a-button type="primary" @click="()=>{viewCheckVibility=true}">新增</a-button>
            </a-card>
        </a-layout-content>
        <a-drawer
            v-model:visible="viewCheckVibility"
            title="查看/编辑"
            placement="right"
        >
            <a-form
                :wrapper-row="{span:6}"
                :wrapper-col="{ span:18 }"
                :model="drawerState"
            >
                <a-form-item name="name" label="业务类型名称">
                    <a-input v-model:value="drawerState.name" placeholder="输入业务类型名称"/>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-space>
                    <a-button @click="onveClose">取消</a-button>
                    <a-button type="primary" @click="onveClose">提交</a-button>
                </a-space>
            </template>
        </a-drawer>
        <!--产品model深度嵌套-->
        <a-modal
            okText="确认"
            cancelText="取消"
            v-model:visible="productModel1"
            title="产品类型列表"
            width="100%"
            wrap-class-name="full-modal"
            @ok="()=>{productModel1=false}"
        >
            <a-row>
                <a-col :span="4">
                    <a-input-search 
                        v-model:value="productKeyWords"
                        placeholder="这里输入关键字"
                        enter-button
                    />
                </a-col>
            </a-row>
            <p></p>
            <a-table :dataSource="dataSource" :columns="columns">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'actions'">
                        <a-space>
                            <a-button type="primary" ghost @click="()=>{productModel2=true}">
                                    <template #icon>
                                        <EyeOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" ghost>
                                    <template #icon>
                                        <EditOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" danger>
                                    <template #icon>
                                        <DeleteFilled/>
                                    </template>
                                </a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-modal>
        <a-modal
            okText="确认"
            cancelText="取消"
            v-model:visible="productModel2"
            title="产品列表"
            width="100%"
            wrap-class-name="full-modal"
            @ok="()=>{productModel2=false}"
        >
            <a-row>
                <a-col :span="4">
                    <a-input-search 
                        v-model:value="productKeyWords"
                        placeholder="这里输入关键字"
                        enter-button
                    />
                </a-col>
            </a-row>
            <p></p>
            <a-table :dataSource="dataSource" :columns="columns">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'actions'">
                        <a-space>
                            <a-button type="primary" ghost @click="()=>{productModel3=true}">
                                    <template #icon>
                                        <EyeOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" ghost>
                                    <template #icon>
                                        <EditOutlined/>
                                    </template>
                                </a-button>
                                <a-button type="primary" danger>
                                    <template #icon>
                                        <DeleteFilled/>
                                    </template>
                                </a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-modal>
        <a-modal
            okText="确认"
            cancelText="取消"
            v-model:visible="productModel3"
            title="套餐列表"
            width="100%"
            wrap-class-name="full-modal"
            @ok="()=>{productModel3=false}"
        >
            <a-row>
                <a-col :span="4">
                    <a-input-search 
                        v-model:value="productKeyWords"
                        placeholder="这里输入关键字"
                        enter-button
                    />
                </a-col>
            </a-row>
            <p></p>
            <a-table :dataSource="dataSource" :columns="columns">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'actions'">
                        <a-space>
                            <a-button type="primary" ghost @click="()=>{productModel4=true}">
                                <template #icon>
                                    <EditOutlined/>
                                </template>
                            </a-button>
                            <a-button type="primary" danger>
                                <template #icon>
                                    <DeleteFilled/>
                                </template>
                            </a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-modal>
        <a-modal
            okText="确认"
            cancelText="取消"
            v-model:visible="productModel4"
            title="编辑"
            width="100%"
            wrap-class-name="full-modal"
            @ok="()=>{productModel4=false}"
        >
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
            >
                <a-form-item name="name" label="套餐名称">
                    <a-input v-model:value="formState.name" placeholder="套餐名称"/>
                </a-form-item>
                <a-form-item name="canAlterRate" label="是否可调整速率">
                    <a-switch v-model:checked="formState.checked" />
                </a-form-item>
                <a-form-item name="price" label="价格">
                    <a-input v-model:value="formState.name" placeholder="价格"/>
                </a-form-item>
                <a-form-item name="unit" label="单位">
                    <a-input v-model:value="formState.name" placeholder="单位"/>
                </a-form-item>
                <a-form-item name="ps" :wrapper-col="{span:24}">
                    <a-textarea style="width:100%" v-model:value="formState.ps" placeholder="备注" :rows="4" />
                </a-form-item>
                <a-form-item name="detail" :wrapper-col="{span:24}">
                    <QuillEditor theme="snow" toolbar="full"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-layout>
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'
import {reactive,ref} from 'vue';
import {EyeOutlined,EditOutlined,DeleteFilled} from '@ant-design/icons-vue';
function onveClose(){
    viewCheckVibility.value = false;
}
const filterState = reactive({});
const drawerState = reactive({});
const formState=reactive({});
const productKeyWords = ref('');
const viewCheckVibility = ref(false);
const productModel1 = ref(false);
const productModel2 = ref(false);
const productModel3 = ref(false);
const productModel4 = ref(false);
const columns = [{
    title: '序号',
    dataIndex: 'order',
    key: 'order',
},{
    title: '业务类型',
    dataIndex: 'type',
    key: 'type',
},{
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
}];
const dataSource = [{
    order:"1",
    type:"国际业务"
},{
    order:"2",
    type:"云网融合"
}];
</script>