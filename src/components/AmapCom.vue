<template>
    <div style="width:100%;height:100%;position:relative;">
        <div style="position: absolute;top:30px;left:50%;margin-left:-150px;z-index: 1;width:300px;display: flex;align-items: center;justify-content: center;align-content: center;">
            <a-form>
                <a-form-item>
                    <a-input-search style="width:300px;" v-model:value="searchValue" placeholder="输入关键字在视野区域内搜索" enter-button @search="onSearch"/>
                </a-form-item>
                <a-form-item v-if="searchResultList!=null">
                    <div style="max-height:300px;overflow-y:scroll;padding:12px;background:#ffffff;">
                    <a-list item-layout="horizontal" :data-source="searchResultList">
                        <template #renderItem="{ item }">
                            <a-list-item style="cursor:pointer;" @click="()=>{moveMapTo([item.location.lng,item.location.lat])}">
                                <a-list-item-meta :description="item.district + '  '+ item.address">
                                    <template #title>{{ item.name}}</template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                    </div>
                </a-form-item>
            </a-form>
        </div>
        <div ref="container" style="width:100%;height:100%;"></div>
    </div>
</template>
<script setup>
import {ref,onMounted,shallowRef} from "vue";
import AMapLoader from '@amap/amap-jsapi-loader';
import {useConfig} from "@store";
import {message} from "ant-design-vue";
const props = defineProps(['modelValue']);
const emit = defineEmits(["update:modelValue","change"]);
const store = useConfig();
const container = ref(null);
const map = shallowRef(null);
const _Amap = ref(null);
const marker = ref(null);
const infWin = ref(null);
const location = ref(null);
const geocoder = ref(null);
/*
const spotAddress = ref("");
const spotLat = ref();
const spotLng = ref();
*/
const searchValue = ref("");
const searchResultList=ref(null);
const searchCity = ref("全国");
window._AMapSecurityConfig = {
    serviceHost:'https://192.168.0.202/_AMapService',
}
function moveMapTo(pos){
    setMarker(pos);
    map.value.setCenter(pos);
    map.value.setZoom(13);
    searchResultList.value = null;
    getAddress(pos).then(result=>{
        searchCity.value = result.regeocode.addressComponent.citycode;
    });
}
function onSearch(value){
    if(value==""){
        message.error("输入关键字再搜索");
        return false;
    }
    if(value.match(/\s/g)!=null&&value.match(/\s/g).length === value.length){
        message.error("请规范输入！");
        return false;
    }
    var autoOptions = {
        citylimit:true, //限制在城市内搜索
        //city 限定城市，默认全国
        city:searchCity.value
    };
    var autoComplete = new _Amap.value.AutoComplete(autoOptions);
    autoComplete.search(value,(status, result)=>{
        if(status==="complete"&& result.info === 'OK'){
            searchResultList.value = result.tips;
        }
    })
}
function createInfoWindow(title,content){
    var MarkerPopInfoWindow = `
    <p>${title}</p>
        <div style="    
    position: relative;
    background: #ffffff;
    padding: 10px;
    min-height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;">
            
            <p style="    
                display: flex;
                width: 100%;
                align-items: center;
            "><span style="flex:1;">地址：</span><span id="markerSpot" style="flex:3;" type="text">${content}</span></p>
        </div>
    `;
    return MarkerPopInfoWindow;
}
function infoWindow(pos){
    getAddress(pos).then(result=>{
        /*
        spotAddress.value = result.regeocode.formattedAddress;
        spotLat.value = pos[1];
        spotLng.value = pos[0];
        */
        infWin.value = new _Amap.value.InfoWindow({
            isCustom:false,
            offset:new _Amap.value.Pixel(0, -35),
            content:createInfoWindow('当前位置',result.regeocode.formattedAddress),  //传入 dom 对象，或者 html 字符串
            anchor:'bottom-center'
        });
        infWin.value.open(map.value,pos);
    });
}
function getAddress(pos){
   return new Promise((resolve,reject)=>{
        geocoder.value.getAddress(pos,(status,result)=>{
            if (status === 'complete' && result.info === 'OK') {
                var updatedStr = JSON.stringify({
                    address:result.regeocode.formattedAddress,
                    longitude:pos[0],
                    latitude:pos[1],
                });
                emit('update:modelValue',updatedStr);
                resolve(result);
            }else{
                reject("未能获取地址，请重试");
            }   
        });
   });
    
}
function setMarker(pos){
    if(marker.value!=null){
        map.value.remove(marker.value);
        map.value.off('click',()=>{infoWindow(pos)});
    }
    marker.value = new _Amap.value.Marker({
        position: pos,//    [center.lng,center.lat],
        offset: new _Amap.value.Pixel(0,0), // 设置点标记偏移量
    });
    marker.value.setMap(map.value);
    marker.value.on("click",()=>{infoWindow(pos)});
}
function initMap(params){
    AMapLoader.load({
        "key":store.mapKeyJs,   // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": [],          // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        _Amap.value = AMap;
        map.value = new AMap.Map(container.value,{
            zoom:11,//级别
            viewMode:'3D',//使用3D视图
            terrain:true,
            showLabel:true,
            layers:[
                new AMap.TileLayer({}),
                //new AMap.Buildings({}),
                //new AMap.DistrictLayer({}),
                //new AMap.IndoorMap({}),
                //new AMap.TileLayer.Satellite({}),
                //new AMap.TileLayer.Traffic({})
            ]
        });
        map.value.on('click',function(){
            searchResultList.value = null;
        });
        map.value.on('zoomend',function(){
            var center = map.value.getCenter();
            getAddress([center.lng,center.lat]).then(result=>{
                searchCity.value = result.regeocode.addressComponent.citycode;
            });
        })
        map.value.on('complete', function(){
            // 地图图块加载完成后触发
            if(params==""){
                var center = map.value.getCenter();
                setMarker([center.lng,center.lat]);
                getAddress([center.lng,center.lat]).then(result=>{
                    searchCity.value = result.regeocode.addressComponent.citycode;
                });
            }else{
                var paramsObj = JSON.parse(params);
                moveMapTo([paramsObj.longitude,paramsObj.latitude]);
            }
            
        });
        map.value.on("dragging",function(){
            var center = map.value.getCenter();
            setMarker([center.lng,center.lat]);
            if(infWin.value!=null)infWin.value.close()
        });
        map.value.on("dragend",function(){
            var center = map.value.getCenter();
            setMarker([center.lng,center.lat]);
            getAddress([center.lng,center.lat]).then(result=>{
                searchCity.value = result.regeocode.addressComponent.citycode;
            });
        });
        //var toolbar = new AMap.ToolBar();
        //map.value.addControl(toolbar);
        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation','AMap.Geocoder','AMap.AutoComplete'],function(){//异步加载插件
        var toolbar = new AMap.ToolBar({position:"RT"});
        map.value.addControl(toolbar);
        var scale = new AMap.Scale();
        map.value.addControl(scale);
        geocoder.value = new AMap.Geocoder({});
        location.value = new AMap.Geolocation();
        map.value.addControl(location.value);
    });
    }).catch(e => {
        console.log(e);
    })
}
onMounted(()=>{
    initMap(props.modelValue);
});
</script>
<style scoped>
.ant-form-item{
    margin-bottom:0px;
}
.ant-list{
    background:#ffffff;
}
</style>