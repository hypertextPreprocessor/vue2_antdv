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
                    RightSidebar:{template:"<h1>sss</h1>"}
                }
            },{
                path:"main-setting",
                name:"mainSetting",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuSetting'),
                    RightSidebar:{template:"<router-view></router-view>"}
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
        path:'/:notMatch(.*)*',
        name:"notFound",
        component:{template:'<div>page not found</div>'}
    } 
]
export default routes;
