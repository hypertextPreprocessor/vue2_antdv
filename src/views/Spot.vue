<template>
    <div style="height:100%;overflow-y:scroll;padding-bottom:100px;background:#ffffff;">
        <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
                <KeepAlive>
                    <component :is="pane.content"></component>
                </KeepAlive>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
import {ref,h} from "vue";
import MemberTable from "@src/views/member/Table";
import MemberForm from "@src/views/member/Form";
const panes = ref([{title:"活动列表",content:()=><MemberTable ref={listRef} onAddMember={addcourse} onEditMember={editcourse} />,key:"0",closable:false}]);
const activeKey = ref(panes.value[0].key);
const listRef = ref();
const newTabIndex = ref(0);
const add = (title,func) => {
    newTabIndex.value++;
    panes.value.push({
        title: `${title}`,
        content:func,
        key: String(newTabIndex.value),
    });
    activeKey.value = String(newTabIndex.value);
};
function addcourse(){
    var arr = panes.value.filter(it=>it.title==="活动新增");
    if(arr.length){
        activeKey.value = arr[0].key;
        arr[0].content = ()=><MemberForm />;
    }else{
        add("活动新增",()=>h(<MemberForm />));
    }
}
function editcourse(data){
    var arr = panes.value.filter(it=>it.title==="活动修改");
    if(arr.length){
        activeKey.value = arr[0].key;
        arr[0].content = ()=><MemberForm course-id={data.courseId}/>;
    }else{
        add("活动修改",()=>h(<MemberForm course-id={data.courseId}/>));
    }
}
const remove = targetKey => {
    let lastIndex = 0;
    panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
    });
    panes.value = panes.value.filter(pane => pane.key !== targetKey);
    if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = panes.value[lastIndex].key;
        } else {
          activeKey.value = panes.value[0].key;
        }
      }
}
const onEdit = targetKey => {
    remove(targetKey);
};

</script>