//这里放置使用非常频繁的组件;
import { h } from "vue";
import {Empty} from 'ant-design-vue';
const RenderEmpty={
    setup(){
        var simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

        return ()=>h(
        <a-empty image={simpleImage}  v-slots={{description:()=>"暂无数据"}}></a-empty>
        );
    }
}
export {RenderEmpty};