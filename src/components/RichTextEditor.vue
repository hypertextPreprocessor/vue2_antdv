<template>
    <div>
        <div id="toolbar" ref="toolbar">
            <select class="ql-font"></select>
            <select class="ql-size">
                <option value="small"></option>
                <!-- Note a missing, thus falsy value, is used to reset to default -->
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <button class="ql-blockquote"></button>
            <button class="ql-code"></button>
            <button class="ql-code-block"></button>
            <select class="ql-header">
                <option selected></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
            </select>
            <span class="ql-formats">
                <button class="ql-link"></button>
                <select class="ql-color"></select>
                <select class="ql-background"></select>
            </span>
            <span class="ql-formats">
                <!-- Add a bold button -->
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>
            </span>
            <span class="ql-formats">
                <input v-model="tableRowNum" style="width:20px;" type="text" placeholder="行"/> x <input style="width:20px;" v-model="tableColumnNum" type="text" placeholder="列"/>
                <a-button size="small" @click="createTable">
                    <template #icon><TableOutlined/></template>
                </a-button>
            </span>
            <span class="ql-formats">
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
            </span>
            <span class="ql-formats">
                <button class="ql-image"></button>
                <button class="ql-video"></button>
            </span>
            <span class="ql-formats">
                <button class="ql-indent" value="-1"></button>
                <button class="ql-indent" value="+1"></button>
                <button class="ql-direction" value="rtl"></button>
                <select class="ql-align">
                    <option selected></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>
                <button class="ql-formula"></button>
                <button class="ql-clean"></button>
            </span>
        </div>
        <div id="editor" ref="container" style="min-height:400px;">
            
        </div>
    </div>
</template>

<script setup>
import {onMounted,shallowRef,ref,watch} from "vue";
import {useConfig} from "@store";
import Quill from 'quill'
import QuillBetterTable from 'quill-better-table'
//import Syntax from "@src/utils/syntax.js";
import { message } from "ant-design-vue";
import {TableOutlined} from '@ant-design/icons-vue';

import Delta from 'quill-delta';
import Emitter from 'quill/core/emitter';

import QiniuUpload from "@src/utils/qiniu.js";
import hljs from 'highlight.js';

const editor = shallowRef();
const container = ref();
const toolbar = ref();
const tableColumnNum = ref('3');
const tableRowNum = ref('3');
const store = useConfig();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
function initQuill(){
    hljs.highlightAll();
    Quill.register({
        'modules/better-table': QuillBetterTable,
        //'modules/syntax': Syntax,
    }, true)
    editor.value = new Quill(container.value,{
        modules: { 
            toolbar:toolbar.value,
            uploader:{
                handler:(range,files)=>{
                    //通过剪切板粘贴的图片不会执行这里;
                    const promises = files.map(file => {
                        return new Promise((resolve,reject)=>{
                            new QiniuUpload({file:file,name:file.name,observer:{
                                error(err){
                                    reject(err);
                                },
                                complete(res){
                                    resolve(store.cdn+res.key);
                                }
                            }});
                        });
                        /*
                        return new Promise(resolve => {
                            const reader = new FileReader();
                            reader.onload = e => {
                                resolve(e.target.result);
                            };
                            reader.readAsDataURL(file);
                        });
                        */
                    });
                    Promise.all(promises).then(images => {
                        const update = images.reduce((delta, image) => {
                            return delta.insert({ image });
                        }, new Delta().retain(range.index).delete(range.length));
                        editor.value.updateContents(update, Emitter.sources.USER);
                        editor.value.setSelection(
                            range.index + images.length,
                            Emitter.sources.SILENT,
                        );
                    });
                }
            },
            syntax:{
                hljs:()=>hljs
            },
            table: false,
            'better-table':{
                operationMenu: {
                    items: {
                        insertColumnRight:{
                            text:"右侧插入一列"
                        },
                        insertColumnLeft:{
                            text:"左侧插入一列"
                        },
                        insertRowUp:{
                            text:"上方插入一行"
                        },
                        insertRowDown:{
                            text:"下方插入一行"
                        },
                        deleteColumn:{
                            text:"删除所选列"
                        },
                        deleteRow:{
                            text:"删除所选行"
                        },
                        deleteTable:{
                            text:"删除表格"
                        },
                        mergeCells:{
                            text:"合并所选单元格"
                        },
                        unmergeCells: {
                            text: '拆分所选单元格'
                        }
                    },
                    color: {
                        text:'背景颜色',
                        colors: ['red', 'green', 'yellow', '#f7f7f7','#dbdbdb', 'gray', '#333333', '#666666', '#999999','#d98c8c','#000000','#2d6024','#d3c352','#7e52d3','#8ad5e1','#090d40','#578d88','#75762b','#f5c4c4','#1ad5ff','#c5d352']
                    }
                }
            },
            keyboard: {
                bindings: QuillBetterTable.keyboardBindings
            }
        },
        theme: 'snow'
    });
    editor.value.on('text-change',function(){
        emit("update:modelValue",editor.value.getContents())
    })
}
function createTable(){
    if(tableRowNum.value=="" || tableColumnNum.value==""){
        message.warn("表格行或列不能为空");
    }else if(forbidEmptyALl(tableRowNum.value) || forbidEmptyALl(tableColumnNum.value)){
        message.warn("表格行或列不能为空");
    }else{
        if(Object.is(Number(tableRowNum.value),NaN)||Object.is(Number(tableColumnNum.value),NaN)){
            message.warn("表格行或列只能填入数字");
        }else{
            let tableModule = editor.value.getModule('better-table');
            tableModule.insertTable(Number(tableRowNum.value),Number(tableColumnNum.value));
        }
    }
}
function forbidEmptyALl(value){
    value = String(value);
    return value.match(/\s/g)!=null&&value.match(/\s/g).length === value.length
}
watch(
    ()=>props.modelValue,
    (cur,old)=>{
        if(cur!=old&&old==''){
            editor.value.setContents(cur);
        }
    }
)
onMounted(()=>{
    initQuill();
});
</script>
<style scoped>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
@import "~highlight.js/styles/github.css";
@import "~quill-better-table/dist/quill-better-table.css";
.ql-ui{
    color:#333333;
}
</style>