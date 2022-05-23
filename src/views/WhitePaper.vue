<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-space><a-button @click="goback">返回</a-button></a-space>
                <p></p>
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="楼宇基础信息">
                        <div class="formTable">
                            <a-form
                            :model="formState1"
                            name="basic"
                            :label-col="{ span: 3 }"
                            :wrapper-col="{ span: 10 }"
                            autocomplete="off"
                        >
                            <a-form-item
                                label="楼宇编码"
                                name="bldgCode"
                                >
                                <a-input v-model:value="formState1.bldgCode" />
                            </a-form-item>
                            <a-form-item
                                label="楼宇名称"
                                name="bldgName"
                                >
                                <a-input v-model:value="formState1.bldgName" />
                            </a-form-item>
                            <a-form-item
                                label="楼宇等级"
                                name="bldgLevel"
                                >
                                <a-input v-model:value="formState1.bldgLevel" />
                            </a-form-item>
                            <a-form-item
                                label="楼宇地址"
                                name="bldgAddress"
                            >
                                <a-input v-model:value="formState1.bldgAddress" />
                            </a-form-item>
                            <a-form-item
                                label="楼层"
                                name="floor"
                                >
                                <a-input v-model:value="formState1.floor" />
                            </a-form-item>
                            <a-form-item
                                label="建筑年代"
                                name="foundDate"
                                >
                                <a-input v-model:value="formState1.foundDate" />
                            </a-form-item>
                            <a-form-item
                                label="竞争环境"
                                name="env"
                                >
                                <a-select
                                    v-model:value="formState1.env"
                                    show-search
                                    placeholder="选择竞争环境"
                                    style="width: 300px"
                                    :options="options1"
                                    :filter-option="filterOption"
                                ></a-select>
                            </a-form-item>
                            <a-form-item
                                label="拓展渠道"
                                name="turnnel"
                                >
                                <a-select
                                    v-model:value="formState1.turnnel"
                                    show-search
                                    placeholder="选择拓展渠道"
                                    style="width: 300px"
                                    :options="options2"
                                    :filter-option="filterOption"
                                ></a-select>
                            </a-form-item>
                        </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="物业公司信息">
                        <div class="formTable">
                            <a-form
                                :model="formState2"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item
                                label="物业公司"
                                name="company"
                                >
                                    <a-input v-model:value="formState2.company" />
                                </a-form-item>
                                <a-form-item
                                label="接口人"
                                name="ppl"
                                >
                                    <a-input v-model:value="formState2.ppl" />
                                </a-form-item>
                                <a-form-item
                                label="职位"
                                name="position"
                                >
                                    <a-input v-model:value="formState2.position" />
                                </a-form-item>
                                <a-form-item
                                label="电话"
                                name="tel"
                                >
                                    <a-input v-model:value="formState2.tel" />
                                </a-form-item>
                                <a-form-item
                                label="比例/金额"
                                name="amount"
                                >
                                    <a-input v-model:value="formState2.amount" />
                                </a-form-item>
                                <a-form-item
                                label="签约期限"
                                name="dueDate"
                                >
                                    <a-input v-model:value="formState2.dueDate" />
                                </a-form-item>
                                <a-form-item
                                    label="物业关系"
                                    name="relation"
                                >
                                    <a-select
                                        v-model:value="formState2.relation"
                                        show-search
                                        placeholder="选择物业关系"
                                        style="width: 300px"
                                        :options="options3"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                label="分成模式"
                                name="pattern"
                                >
                                    <a-select
                                        v-model:value="formState2.pattern"
                                        show-search
                                        placeholder="选择分成模式"
                                        style="width: 300px"
                                        :options="options4"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                label="交付时间"
                                name="giveDate"
                                >
                                    <a-date-picker v-model:value="formState2.giveDate" style="width:300px;"/>
                                </a-form-item>
                                <a-form-item
                                label="到期时间"
                                name="expireDate"
                                >
                                    <a-date-picker v-model:value="formState2.expireDate" style="width:300px;"/>
                                </a-form-item>
                                
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="宣传媒体信息">
                        <div class="formTable">
                            <a-form
                                :model="formState3"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item
                                    label="媒体公司"
                                    name="mediaCom"
                                >
                                    <a-auto-complete
                                        v-model:value="formState3.mediaCom"
                                        :options="options5"
                                        style="width: 300px"
                                        placeholder="输入或者选择媒体公司"
                                    />
                                </a-form-item>
                                <a-form-item
                                    label="宣传载体"
                                    name="carrier"
                                >
                                    <a-auto-complete
                                        v-model:value="formState3.carrier"
                                        :options="options6"
                                        style="width: 300px"
                                        placeholder="输入或者选择宣传载体"
                                    />
                                </a-form-item>
                                 <a-form-item>
                                     <a-button>增加</a-button>
                                 </a-form-item>
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="4" tab="移动网络情况">
                        <div class="formTable">
                            <a-form
                                :model="formState4"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item
                                    label="4G信号"
                                    name="fourg"
                                >
                                    <a-select
                                        v-model:value="formState4.fourg"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options7"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                    label="5G信号"
                                    name="fiveg"
                                >
                                    <a-select
                                        v-model:value="formState4.fiveg"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options7"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="5" tab="固网资源及业务情况">
                        <div class="formTable">
                            <a-form
                                :model="formState5"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item
                                    label="资源情况"
                                    name="condition"
                                >
                                    <a-select
                                        v-model:value="formState5.condition"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options8"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                    label="专线业务"
                                    name="own"
                                >
                                    <a-select
                                        v-model:value="formState5.own"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options7"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                    label="宽带业务"
                                    name="bandWidth"
                                >
                                    <a-select
                                        v-model:value="formState5.bandWidth"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options7"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                                <a-form-item
                                    label="固化业务"
                                    name="telx"
                                >
                                    <a-select
                                        v-model:value="formState5.telx"
                                        show-search
                                        :defaultActiveFirstOption="true"
                                        style="width: 300px"
                                        :options="options7"
                                        :filter-option="filterOption"
                                    ></a-select>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="6" tab="拓展渠道信息">
                        <div class="formTable">
                            <a-form
                                :model="formState6"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item name="manager" label="客户经理">
                                    <a-input v-model:value="formState6.manager"/>
                                </a-form-item>
                                <a-form-item name="contactTel" label="联系电话">
                                    <a-input v-model:value="formState6.contactTel"/>
                                </a-form-item>
                                <a-form-item name="devplcode" label="发展人编码">
                                    <a-input v-model:value="formState6.devplcode"/>
                                </a-form-item>
                                <a-form-item name="turnnelName" label="渠道名称">
                                    <a-input v-model:value="formState6.turnnelName"/>
                                </a-form-item>
                                <a-form-item name="turnnelNumber" label="渠道编码">
                                    <a-input v-model:value="formState6.turnnelNumber"/>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="7" tab="市场情况">
                        <div class="formTable">
                            <a-form
                                :model="formState7"
                                name="basic"
                                :label-col="{ span: 3 }"
                                :wrapper-col="{ span: 10 }"
                                autocomplete="off"
                            >
                                <a-form-item name="formState71" label="客户总数">
                                    <a-input v-model:value="formState7.formState71"/>
                                </a-form-item>
                                <a-form-item name="formState72" label="客户渗透率">
                                    <a-input v-model:value="formState7.formState72"/>
                                </a-form-item>
                                <a-form-item name="formState73" label="出账用户数">
                                    <a-input v-model:value="formState7.formState73"/>
                                </a-form-item>
                                <a-form-item name="formState74" label="出账总收入">
                                    <a-input v-model:value="formState7.formState74"/>
                                </a-form-item>
                                <a-form-item name="formState75" label="联通">
                                    <a-input v-model:value="formState7.formState75"/>
                                </a-form-item>
                                <a-form-item name="formState76" label="电信">
                                    <a-input v-model:value="formState7.formState76"/>
                                </a-form-item>
                                <a-form-item name="formState77" label="移动">
                                    <a-input v-model:value="formState7.formState77"/>
                                </a-form-item>
                                <a-form-item name="formState78" label="其他">
                                    <a-input v-model:value="formState7.formState78"/>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="8" tab="客户总览">
                        <div class="formTable">
                            <a-table :dataSource="dataSource" :columns="columns" />
                            <a-divider/>
                            <a-button type="primary" @click="newClient">新增客户</a-button>
                        </div>
                    </a-tab-pane>
                </a-tabs>
                <a-divider />
                <a-space>
                    <a-button type="primary">保存</a-button>
                </a-space>
            </a-card>
        </a-layout-content>
        <a-drawer
            v-model:visible="newClientDrawerVisibility"
            class="custom-class"
            title="新增客户"
            placement="right"
        >
            <a-form
                :model="newClientState"
                name="basic"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
            >
                <a-form-item name="bldgNo" label="楼宇编码">
                    <a-input v-model:value="newClientState.bldgNo" placeholder="楼宇编码"/>
                </a-form-item>
                <a-form-item name="bldgName" label="楼宇名称">
                    <a-input v-model:value="newClientState.bldgName" placeholder="楼宇名称"/>
                </a-form-item>
                <a-form-item name="clientName" label="客户名称">
                    <a-input v-model:value="newClientState.clientName" placeholder="客户名称"/>
                </a-form-item>
                <a-form-item name="address" label="所在位置">
                    <a-input v-model:value="newClientState.address" placeholder="所在位置"/>
                </a-form-item>
                <a-form-item name="clientNo" label="客户编号">
                    <a-input v-model:value="newClientState.clientNo" placeholder="客户编号"/>
                </a-form-item>
                <a-form-item name="licenceNo" label="统一信用代码">
                    <a-input v-model:value="newClientState.licenceNo" placeholder="统一信用代码"/>
                </a-form-item>
                <a-form-item name="project" label="排产计划">
                    <a-input v-model:value="newClientState.project" placeholder="排产计划"/>
                </a-form-item>
                <a-form-item name="currentType" label="在用业务">
                    <a-input v-model:value="newClientState.currentType" placeholder="在用业务"/>
                </a-form-item>
                <a-form-item name="rent" label="租金">
                    <a-input v-model:value="newClientState.rent" placeholder="租金"/>
                </a-form-item>
                <a-form-item name="area" label="业务归属">
                    <a-select
                        v-model:value="newClientState.area"
                        style="width: 100%"
                        placeholder="业务归属"
                        :options="options9"
                        @change="handleChange"
                    ></a-select>
                </a-form-item>
                <a-form-item name="expireDate" label="业务到期">
                    <a-date-picker style="width:100%" v-model:value="newClientState.expireDate" />
                </a-form-item>
            </a-form>
            <a-button>增加</a-button>
            <template #footer>
                <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
                <a-button type="primary" @click="onClose">提交</a-button>
            </template>
        </a-drawer>
    </a-layout>
</template>
<script setup>
import {ref,reactive} from 'vue';
import {useRouter} from 'vue-router';
const newClientDrawerVisibility = ref(false);
const activeKey = ref('1')
const formState1 = reactive({});
const formState2 = reactive({});
const formState3 = reactive({});
const formState4 = reactive({});
const formState5 = reactive({});
const formState6 = reactive({});
const formState7 = reactive({});
const newClientState = reactive({});
var router = useRouter();
function newClient(){
    newClientDrawerVisibility.value = true;
}
function onClose(){
    newClientDrawerVisibility.value = false;
}
const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const options1 = ref([{value:"0",label:"0"},{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",lebel:"3"}]);
const options2 = ref([{value:"z",label:"直销"},{value:"f",label:"分销"},{value:"h",label:"合作"},{value:"q",label:"其他"}]);
const options3 = [{value:"a",label:"优势"},{value:"b",label:"均势"},{value:"c",label:"劣势"}];
const options4 = [{value:"0",label:"无"},{value:"solid",label:"固定"},{value:"break",label:"比例"}];
const options5 = ref([{value:"三七互娱",label:"三七互娱"},{value:"网易游戏",label:"网易游戏"},{value:"bilibili",label:"bilibili"}]);
const options6 = ref([{label:"无",value:"无"},{label:"电梯",value:"电梯"},{label:"电视",value:"电视"},{label:"电闸",value:"电闸"}])
const options7 = [{value:"0",label:"无"},{value:"1",label:"有"}];
const options8 = [{value:"0",label:"待建设"},{value:"1",label:"二日通"},{value:"2",label:"七日通"}]
const options9 = [{value:"CMCC",label:"移动"},{value:"unicome",label:"联通"},{value:"telcom",label:"电信"}]
const dataSource = [{
    key:'1',
    name:"宽带业务",
    address:"广州",
    project:"大项目",
    mybusiness:"随意",
    area:"看看先",
    rent:"¥1000",
    expiredDate:"2022-12-22",
}]
const columns=[{
    key:"1",
    title:"编号",
    dataIndex: 'key',
},{
    key:"2",
    title:"客户名称",
    dataIndex: 'name',
},{
    key:"3",
    title:"所在位置",
    dataIndex: 'address',
},{
    key:"4",
    title:"排产计划",
    dataIndex: 'project',
},{
    key:"5",
    title:"在用业务",
    dataIndex: 'mybusiness',
},{
    key:"6",
    title:"业务归属",
    dataIndex: 'area',
},{
    key:"7",
    title:"月租",
    dataIndex: 'rent',
},{
    key:"8",
    title:"业务到期",
    dataIndex: 'expiredDate',
}]
function goback(){
    router.back();
}
</script>