<template>
    <a-layout>
        <a-layout-content style="display:flex;flex-flow:column nowrap;">
            <h1 class="title">欢迎访问广东联通沃企+后台管理系统</h1>
            <div class="bgimg" :style="{background:bgObj}"></div>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import bg from '@img/56.png';
    var bgObj = 'url('+bg+') no-repeat center center/cover';
</script>
<style scoped>
.title{
    text-align: center;
    padding: 22px;
    font-size: 22px;
    font-weight: bold;
    color: #2a8ff7;
    background: #ffffff;
    margin:0;
}
.bgimg{
    flex:1;
}
</style>