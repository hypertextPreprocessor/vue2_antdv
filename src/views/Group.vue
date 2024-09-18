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
import {ref,h,provide} from "vue";
import GroupTable from "@src/views/group/Table";
import GroupForm from "@src/views/group/Form";
const panes = ref([{title:"人物列表",content:()=><GroupTable ref={listRef} onAddGroup={addgroup} onEditGroup={editgroup} />,key:"0",closable:false}]);
const activeKey = ref(panes.value[0].key);
const listRef = ref();
provide("listRef",listRef);
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
function addgroup(){
    var arr = panes.value.filter(it=>it.title==="人物新增");
    if(arr.length){
        activeKey.value = arr[0].key;
        arr[0].content = ()=><GroupForm />;
    }else{
        add("人物新增",()=>h(<GroupForm />));
    }
}
function editgroup(data){
    var arr = panes.value.filter(it=>it.title==="人物修改");
    if(arr.length){
        activeKey.value = arr[0].key;
        arr[0].content = ()=><GroupForm group-id={data.id}/>;
    }else{
        add("人物修改",()=>h(<GroupForm group-id={data.id}/>));
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