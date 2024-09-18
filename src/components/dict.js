import {carreralist} from "@apis/dictReq.js";
import {toRefs,onMounted,ref} from "vue";
const filterOption = (input, option) => {
    //注意默认的{label:"",value:""} 结构的select才适合这种通用筛选器
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
/*
const filterOptionOnLabel = (input, option) => {
    //注意默认的{label:"",value:""} 结构的select才适合这种通用筛选器
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
*/
export const Carrera = {
    props:{
        placeholder: { type: String, default: "请选择" },
        showSearch: { type: Boolean, default: false },
        value:{type:Array,default:[]}
    },
    emits: ["change", "update:value"],
    setup(props, { attrs, emit }) {
        const options = ref([]);
        const { placeholder,showSearch,value } = toRefs(props);
        onMounted(()=>{
            carreralist().then(({data:D})=>{
                var {code,data} = D;
                if(code === 1){
                    data.forEach(v=>{
                        options.value.push({
                            label:v.tradeName,
                            value:v.id,
                            ...v
                        })
                    })
                }
            })
        })
        return ()=><>
          <a-select
                mode="multiple"
                v-model={[value, "value"]}
                placeholder={placeholder.value}
                {...attrs}
                show-search={showSearch.value}
                options={options.value}
                filter-option={filterOption}
                onChange={(v) => {
                    emit("change", v);
                    emit("update:value", v);
                }}
            ></a-select>
        </>
    }
}
export const MemberType = {
    props:{
        placeholder:{type:String,default:"请选择成员类型"},
        value:{type:String,default:undefined}
    },
    emits:["change", "update:value"],
    setup(props,{emit,attrs}){
        const {value} = toRefs(props);
        const options = ref([{
            label:"会长单位",
            value:"1"
        },
        {
            label:"副会长单位",
            value:"2"
        },
        {
            label:"理事单位",
            value:"3"
        },
        {
            label:"成员单位",
            value:"4"
        }]);
        return ()=><>
            <a-select
                v-model={[value, "value"]}
                show-search
                placeholder={props.placeholder}
                {...attrs}
                options={options.value}
                filter-option={filterOption}
                onChange={(v) => {
                    emit("change", v);
                    emit("update:value", v);
                }}
                onSelect={(v) => {
                    emit("update:value", v);
                }}
            ></a-select>
        </>
    }
}
export const MemberStatus = {
    props:{
        placeholder:{type:String,default:"设置当前成员的状态"},
        value:{type:String,default:undefined}
    },
    emits:["change", "update:value"],
    setup(props,{emit,attrs}){
        const {value} = toRefs(props);
        const options = ref([{
            label:"正常",
            value:"1"
        },
        {
            label:"退会",
            value:"2"
        },
        {
            label:"不公示",
            value:"0"
        }]);
        return ()=><>
            <a-select
                v-model={[value, "value"]}
                show-search
                placeholder={props.placeholder}
                {...attrs}
                options={options.value}
                filter-option={filterOption}
                onChange={(v) => {
                    emit("change", v);
                    emit("update:value", v);
                }}
                onSelect={(v) => {
                    emit("update:value", v);
                }}
            ></a-select>
        </>
    }
}