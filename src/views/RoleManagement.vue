<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <a-card style="flex-grow:1;">
                <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
                    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
                        {{ pane.content }}
                    </a-tab-pane>
                </a-tabs>
            </a-card>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import { ref } from 'vue';
    const panes = ref([
      { title: '系统管理员', content: 'Content of Tab 1', key: '1' },
      { title: '测试组', content: 'Content of Tab 2', key: '2' },
      { title: '用户组', content: 'Content of Tab 3', key: '3', closable: false },
    ]);

    const activeKey = ref(panes.value[0].key);

    const newTabIndex = ref(0);
    const add = () => {
      activeKey.value = `newTab${++newTabIndex.value}`;
      panes.value.push({ title: '新建组', content: '输入组名称', key: activeKey.value });
    };
    const remove = (targetKey) => {
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
    };

    const onEdit = (targetKey,action)=>{
      if (action === 'add') {
        add();
      } else {
        remove(targetKey);
      }
    };
</script>