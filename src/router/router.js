const routes = [    //基础路由
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
                }
            },{
                path:"main-setting",
                name:"mainSetting",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuSetting'),
                    RightSidebar:()=>import('@src/views/MainContent')
                }
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
        path:"/:notMatch(.*)*",
        name:"notExist",
        component:()=>import('@src/views/NotExist')
    } 
];
//页面路由，或可在服务器端配置此路由结构返回到前端动态渲染；
export var pageRoute = [
    {
        path: "homeBoard",
        name: "homeBoard",
        component: "HomeBoard"
    },{
        path:"spot",
        name:"spot",
        component:"Spot",
        children:[
            {
                path:"",    //留空确保大菜单无路由，默认的大导航菜单始终导航到此子路由
                name:"course",
                component:"Course"
            },
            {
                path:"timeTable",
                name:"timeTable",
                component:"TimeTable"
            },
            {
                path:"comment",
                name:"comment",
                component:"Comment"
            }
        ]
    },{
        path:"group",
        name:"group",
        component:"Group"
    },{
        path:"order",
        name:"order",
        component:"Order",
        children:[{
            path:"",
            name:"detail",
            component:"detail"
        },{
            path:"refund",
            name:"refund",
            component:"Refund"
        }]
    },{
        path:"dataChart",
        name:"dataChart",
        component:"DataChart"
    },{
        path:"dataAnalyse",
        name:"dataAnalyse",
        component:"DataAnalyse"
    },{
        path:"operators",
        name:"operators",
        component:"Operators",
        children:[{
            path:"",
            name:"addr",
            component:"Addr"
        },{
            path:"area",
            name:"area",
            component:"Area"
        },{
            path:"guider",
            name:"guider",
            component:"Guider"
        },{
            path:"balance",
            name:"balance",
            component:"Balance"
        }]
    },{
        path:"/:notMatch(.*)*",
        name:"notExist",
        component:"NotExist"
    }
  ];
export var systemRoute=[{
    path:"profile",
    name:"profile",
    component:"Profile"
},{
    path:"sysSetting",
    name:"sysSetting",
    component:"SysSetting"
},{
    path:"/:notMatch(.*)*",
    name:"notExist",
    component:"NotExist"
}];
export default routes;
