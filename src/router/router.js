const routes = [
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
                    RightSidebar:{template:"<router-view></router-view>"}
                },
                children:[
                    {
                        path:"sys1",
                        name:"sys1",
                        component:()=>import('@src/views/RoleManagement')
                    },{
                        path:"sys2",
                        name:"sys2",
                        component:()=>import('@src/views/OrgManagement')
                    },{
                        path:"sys3",
                        name:"sys3",
                        component:()=>import('@src/views/LoginLogList')
                    },{
                        path:"sys4",
                        name:"sys4",
                        component:()=>import('@src/views/OperatingLogList')
                    },{
                        path:"info1",
                        name:"info1",
                        component:()=>import('@src/views/BdgeManager')
                    },{
                        path:"info2",
                        name:"info2",
                        component:()=>import('@src/views/EnterpriseManagement')
                    },{
                        path:"info3",
                        name:"info3",
                        component:()=>import('@src/views/BdgeManagement')
                    },{
                        path:"info3/white-paper",
                        name:"whitePaper",
                        component:()=>import('@src/views/WhitePaper'),
                    },{
                        path:"info4",
                        name:"info4",
                        component:()=>import('@src/views/BusinessMgmt')
                    },{
                        path:"info5",
                        name:"info5",
                        component:()=>import('@src/views/QuoteInfo')
                    },{
                        path:"info6",
                        name:"info6",
                        component:()=>import('@src/views/FlawsReslovtion')
                    },{
                        path:"info7",
                        name:"info7",
                        component:()=>import('@src/views/UserMgmt')
                    },{
                        path:"info8",
                        name:"info8",
                        component:()=>import('@src/views/CompanyInfoMgmt')
                    },{
                        path:"info9",
                        name:"info9",
                        component:()=>import('@src/views/IntelligenceUsage')
                    },{
                        path:"product1",
                        name:"product1",
                        component:()=>import('@src/views/product/productSort.vue')
                    },{
                        path:"product2",
                        name:"product2",
                        component:()=>import('@src/views/product/productProvince.vue')
                    },{
                        path:"product3",
                        name:"product3",
                        component:()=>import('@src/views/product/productVideo.vue')
                    },{
                        path:"page1",
                        name:"page1",
                        component:()=>import('@src/views/PageSlideMgmt')
                    },{
                        path:"page2",
                        name:"page2",
                        component:()=>import('@src/views/pages/posterManage.vue')
                    },{
                        path:"page3",
                        name:"page3",
                        component:()=>import('@src/views/PublicAnnounce')
                    },{
                        path:"page4",
                        name:"page4",
                        component:()=>import('@src/views/product/productVideo.vue')
                    },{
                        path:"page5",
                        name:"page5",
                        component:()=>import('@src/views/product/productVideo.vue')
                    },{
                        path:"promotion1",
                        name:"promotion1",
                        component:()=>import('@src/views/FaqList')
                    },{
                        path:"promotion2",
                        name:"promotion2",
                        component:()=>import('@src/views/FaqList')
                    },{
                        path:"promotion3",
                        name:"promotion3",
                        component:()=>import('@src/views/FaqList')
                    },{
                        path:"",
                        name:"blank1",
                        component:()=>import('@src/views/HomeBlank')
                    }
                ]
            },
            {
                path:"main-setting",
                name:"mainSetting",
                components:{
                    LeftSidebar:()=>import('@src/views/navbars/LeftNavMenuSetting'),
                    RightSidebar:{template:"<router-view></router-view>"}
                },
                children:[
                    {
                        path:"alter-pass",
                        name:"alterPass",
                        component:{template:"<h1>修改密码</h1>"}
                    },{
                        path:"",
                        name:"blank2",
                        component:()=>import('@src/views/HomeBlank')
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
        name:"notFound",
        component:{template:'<div>page not found</div>'}
    } 
]
export default routes;
