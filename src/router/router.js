const routes = [
    {
        path:"/",
        name:"home",
        component:()=>import('@src/views/HomePage'),
        children:[
            {
                path:"main-common",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuCommon'),
                    RightSidebar:{template:"<h1>tanglin</h1>"}
                }
            },
            {
                path:"main-setting",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuSetting'),
                    RightSidebar:{template:"<h1>欢迎访问</h1>"}
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