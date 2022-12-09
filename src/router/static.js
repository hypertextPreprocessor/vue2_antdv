import {
    HomeOutlined,FlagOutlined,TeamOutlined,AccountBookOutlined,
    AreaChartOutlined,ConsoleSqlOutlined,ReconciliationOutlined,
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
                            title:"标的管理",
                            icon:FlagOutlined
                        },
                        children:[
                            {
                                path:"",    //留空确保大菜单无路由，默认的大导航菜单始终导航到此子路由
                                name:"course",
                                component:async()=>await tryImport('Course'),
                                //component:()=>import("@src/views/Course"),
                                meta:{
                                    title:"课程管理"
                                }
                            },
                            {
                                path:"timeTable",
                                name:"timeTable",
                                component:async()=>await tryImport('TimeTable'),
                                //component:()=>import("@src/views/TimeTable"),
                                meta:{
                                    title:"排课管理"
                                }
                            },
                            {
                                path:"comment",
                                name:"comment",
                                component:async()=>await tryImport('Comment'),
                                //component:()=>import("@src/views/Comment"),
                                meta:{
                                    title:"评论管理"
                                }
                            }
                        ]
                    },{
                        path:"group",
                        name:"group",
                        component:async()=>await tryImport('Group'),
                        //component:()=>import("@src/views/Group"),
                        meta:{
                            title:"群聊管理",
                            icon:TeamOutlined
                        }
                    },{
                        path:"order",
                        name:"order",
                        component:async()=>await tryImport('Order'),
                        //component:()=>import("@src/views/Order"),
                        meta:{
                            title:"订单管理",
                            icon:AccountBookOutlined
                        }, 
                        children:[{
                            path:"",
                            name:"detail",
                            component:async()=>await tryImport('Detail'),
                            //component:()=>import("@src/views/Detail"),
                            meta:{
                                title:"订单管理"
                            }
                        },{
                            path:"refund",
                            name:"refund",
                            component:async()=>await tryImport('Refund'),
                            //component:()=>import("@src/views/Refund"),
                            meta:{
                                title:"退款管理"
                            }
                        }]
                    },{
                        path:"dataChart",
                        name:"dataChart",
                        component:async()=>await tryImport('DataChart'),
                        //component:()=>import("@src/views/DataChart"),
                        meta:{
                            title:"数据报表",
                            icon:AreaChartOutlined
                        }
                    },{
                        path:"dataAnalyse",
                        name:"dataAnalyse",
                        component:async()=>await tryImport('DataAnalyse'),
                        //component:()=>import("@src/views/DataAnalyse"),
                        meta:{
                            title:"数据分析",
                            icon:ConsoleSqlOutlined
                        }
                    },{
                        path:"operators",
                        name:"operators",
                        component:async()=>await tryImport('Operators'),
                        //component:()=>import("@src/views/Operators"),
                        meta:{
                            title:"运营商管理",
                            icon:ReconciliationOutlined
                        },
                        children:[{
                            path:"",
                            name:"mainInfo",
                            component:async()=>await tryImport('MainInfo'),
                            //component:()=>import("@src/views/MainInfo"),
                            meta:{
                                title:"主体信息管理"
                            }
                        },{
                            path:"addr",
                            name:"addr",
                            component:async()=>await tryImport('Addr'),
                            //component:()=>import("@src/views/Addr"),
                            meta:{
                                title:"营地管理"
                            }
                        },{
                            path:"area",
                            name:"area",
                            component:async()=>await tryImport('Area'),
                            //component:()=>import("@src/views/Area"),
                            meta:{
                                title:"营区管理"
                            }
                        },{
                            path:"guider",
                            name:"guider",
                            component:async()=>await tryImport('Guider'),
                            //component:()=>import("@src/views/Guider"),
                            meta:{
                                title:"导师管理"
                            }
                        },{
                            path:"balance",
                            name:"balance",
                            component:async()=>await tryImport('Balance'),
                            //component:()=>import("@src/views/Balance"),
                            meta:{
                                title:"余额管理"
                            }
                        }]
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
        path:'/:notMatch(.*)*',
        name:"notExist",
        component:()=>import('@src/views/NotExist')
    } 
];
export default staticRoute;