const Home = {template:'<div>Home</div>'};
const routes = [
    {
        path:"/",
        name:"home",
        component:Home,
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