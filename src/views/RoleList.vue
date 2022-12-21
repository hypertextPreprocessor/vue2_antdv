<template>
    <div>
    <a-row type="flex" justify="center" align="middle">
        <a-col :span="24">
            <div style="text-align:center;padding-top:30px;">
                <a-avatar :size="180">
                    <template #icon>
                        <a-image
                            :width="180"
                            :src="ic_launcher"
                            :preview="false"
                        />
                    </template>
                </a-avatar>
            </div>
        </a-col>
    </a-row>
    <p class="titlexx" style="text-align:center;">选择一个角色登录：</p>
    <a-divider />
    <div style="width:80%;margin:0 auto;">
    <a-list
        item-layout="horizontal"
        :data-source="datalist"
    >
        <template #renderItem="{ item }">
            <a-list-item @click="()=>{goHomePage(item.operationId)}">
                <a-list-item-meta
                    :description="item.description"
                >
                    <template #title>
                        <a href="https://www.antdv.com/">{{ item.title }}</a>
                    </template>
                    <template #avatar>
                        <a-avatar>
                            <template #icon>
                            <UserOutlined />
                            </template>
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <a-tag color="blue">运营商</a-tag>
                </template>
            </a-list-item>
        </template>
    </a-list>
    </div>
    </div>
</template>
<script setup>
import ic_launcher from "@img/ic_launcher.png";
import {ref,onMounted} from "vue";
import {loadRoleList,chooseARole} from '@api';
import {UserOutlined} from "@ant-design/icons-vue";
import { useRouter } from 'vue-router'
import { useConfig } from '@store';
const router = useRouter();
const store = useConfig();
var datalist = ref([]);
function goHomePage(oid){
    chooseARole(oid).then(({data})=>{
        var {code,data:D} = data;
        if(code===1){
            store.userToken = D.token;
            sessionStorage.setItem("userToken",D.token);
            router.push({name:"homeBoard"});
        }
    });
}
onMounted(()=>{
    loadRoleList().then(({data})=>{
        var {code,data:D} = data;
        if(code===1){
            D.forEach((v)=>{
                datalist.value.push({title:v.roleName,description:"运营商",operationId:v.operationId});
            });
        }
    })
});
</script>
<style scoped>
    .titlexx{
        text-align: center;
        padding: 10px 0px;
        margin: 0;
        margin-top: 30px;
    }
</style>