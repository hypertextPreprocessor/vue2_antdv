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
                                <a-button @click="()=>{scoreModelVisibility=true}">积分明细</a-button>
                                <a-button @click="()=>{scoreSpendModelVisibility=true}">积分消费</a-button>
                            </a-space>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-layout-content>
        <a-modal 
            v-model:visible="scoreModelVisibility" 
            title="积分明细列表"
            @ok="()=>{scoreModelVisibility=false}"
            okText="确认"
            cancelText="取消"
        >
            <a-form
                layout="inline"
                :model="scoreFormState"
            >
                <a-form-item>
                    <a-range-picker v-model:value="scoreFormState.dateRange" :locale="locale"/>
                </a-form-item>
                <a-form-item>
                    <a-select
                        v-model:value="filterState.status"
                        show-search
                        style="width: 100%"
                        placeholder="请选择类别"
                        :options="typeOptions"
                        :filter-option="filterOption"
                    ></a-select>
                </a-form-item>
            </a-form>
            <a-divider/>
            <a-table :dataSource="scoreDataSource" :columns="scoreColumns"></a-table>
        </a-modal>
        <a-modal 
            v-model:visible="scoreSpendModelVisibility" 
            title="积分消费"
            @ok="()=>{scoreSpendModelVisibility=false}"
            okText="确认"
            cancelText="取消"
        >
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                :model="scoreSpendFormState"
            >
                <a-form-item name="spend" label="消费积分">
                    <a-input-number style="width:100%" id="inputNumber" v-model:value="scoreSpendFormState.value" :min="1" :max="99999" />
                </a-form-item>
                <a-form-item :wrapper-col="{span:24}">
                    <a-textarea style="width:100%" v-model:value="scoreSpendFormState.ps" placeholder="备注" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-layout>
</template>
<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import {reactive,ref} from 'vue';
const filterState = reactive({});
const scoreFormState = reactive({});
const scoreSpendFormState = reactive({});
const scoreModelVisibility = ref(false);
const scoreSpendModelVisibility = ref(false);
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const scoreDataSource=[{
    order:"0",
    scores:"88",
    type:"新增",
    ps:"每日签到",
    time:"2022-05-23"

}];
const scoreColumns=[{
    title: '序号',
    dataIndex: 'order',
    key: 'order',
},{
    title: '积分',
    dataIndex: 'scores',
    key: 'scores',
},{
    title: '类别',
    dataIndex: 'type',
    key: 'type',
},{
    title: '备注',
    dataIndex: 'ps',
    key: 'ps',
},{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
}];
const typeOptions=[{
    label:"全部",
    value:"all"
},{
    label:"新增",
    value:"add"
},{
    label:"消费",
    value:"spend"
}]
const dataSource=[{
    order:"0",
    nickName:"阿尖儿",
    name:"尖儿",
    sex:"男",
    tel:"13888888888",
    company:"广州衡纬科技有限公司",
    address:"广州市越秀区寺右新马路108号",
    score:"5"
}];
const columns=[{
    title: '序号',
    dataIndex: 'order',
    key: 'order',
},{
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
},{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
},{
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
},{
    title: '手机号码',
    dataIndex: 'tel',
    key: 'tel',
},{
    title: '企业信息',
    dataIndex: 'company',
    key: 'company',
},{
    title: '常居地址',
    dataIndex: 'address',
    key: 'address',
},{
    title: '积分',
    dataIndex: 'score',
    key: 'score',
},{
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
}]
</script>