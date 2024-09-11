import {
    HomeOutlined,FlagOutlined,TeamOutlined,
    ProfileOutlined,SettingOutlined
} from '@ant-design/icons-vue';

async function tryImport(moduleName){
    try{
        await import(`@src/views/${moduleName}`);
        return import(`@src/views/${moduleName}`);
    }catch(e){
        return import("@src/views/NotExist");
    }
}

var staticRoute = [
    {
        path:"/",
        name:"home",
        component:()=>import('@src/views/HomePage'),
        children:[
            {
                path:"main-common",
                name:"mainCommon",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuCommon'),
                    RightSidebar:()=>import('@src/views/MainContent')
                },
                children:[
                    {
                        path: "homeBoard",
                        name: "homeBoard",
                        component:async()=>await tryImport('HomeBoard'),
                        //component:()=>import("@src/views/HomeBoard"),
                        meta:{
                            title:"首页",
                            icon:HomeOutlined
                        }
                    },{
                        path:"spot",
                        name:"spot",
                        component:async()=>await tryImport('Spot'),
                        //component:()=>import("@src/views/Spot"),
                        meta:{
                            title:"商会成员",
                            icon:FlagOutlined
                        }
                    },{
                        path:"group",
                        name:"group",
                        component:async()=>await tryImport('Group'),
                        //component:()=>import("@src/views/Group"),
                        meta:{
                            title:"风云人物",
                            icon:TeamOutlined
                        }
                    },{
                        path:"/:notMatch(.*)*",
                        name:"notExist",
                        component:async()=>await tryImport('NotExist'),
                        //component:()=>import('@src/views/NotExist')
                    }
                ]
            },{
                path:"main-setting",
                name:"mainSetting",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuSetting'),
                    RightSidebar:()=>import('@src/views/MainContent')
                },
                children:[
                    {
                        path:"profile",
                        name:"profile",
                        component:async()=>await tryImport('Profile'),
                        //component:()=>import("@src/views/Profile"),
                        meta:{
                            title:"个人资料",
                            icon:ProfileOutlined
                        }
                    },{
                        path:"sysSetting",
                        name:"sysSetting",
                        component:async()=>await tryImport('SysSetting'),
                        //component:()=>import("@src/views/SysSetting"),
                        meta:{
                            title:"系统设置",
                            icon:SettingOutlined
                        }
                    },{
                        path:"/:notMatch(.*)*",
                        name:"notExist",
                        component:async()=>await tryImport('NotExist'),
                        //component:()=>import('@src/views/NotExist')
                    }
                ]
            }  
        ]
    },{
        path:"/login",
        name:"login",
        component:()=>import('@src/views/UsrLogin')
    },{
        path:"/regiester",
        name:"regiester",
        component:{template:'<div>regiester</div>'}
    },{
        path:"/role",
        name:"role",
        component:async()=>await tryImport('RoleList'),
    },{
        path:'/:notMatch(.*)*',
        name:"notExist",
        component:()=>import('@src/views/NotExist')
    } 
];
export default staticRoute;