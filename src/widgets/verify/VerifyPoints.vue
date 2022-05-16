<template>
    <teleport :to="appendTo" v-if="visible">
        <div class="pointVerifyPop">
            <canvas id="canvas"></canvas>
        </div>
    </teleport>
</template>
<script setup>
    import {defineProps,toRefs,onMounted} from 'vue';
    const props = defineProps({
        appendTo:String,
        visible:Boolean
    });
    const { appendTo,visible } = toRefs(props);
    const textArr = ["我","很","好"];
    onMounted(()=>{
        var canvas = document.querySelector('#canvas');
        var context = canvas.getContext('2d');
        context.fillStyle="#dedede";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.strokeStyle="#000";
        context.arc(canvas.width-20,20,10,0,Math.PI*90)
        context.stroke();
        context.strokeText(textArr[0],23,23);
        context.strokeText(textArr[1], 10, 50);
        context.strokeText(textArr[2], 50, 30);
        context.save();

    })
</script>
<style scoped>
.pointVerifyPop{
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.8);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
}
</style>