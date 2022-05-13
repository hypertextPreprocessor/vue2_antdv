import {defineStore} from 'pinia';
const useConfig = defineStore("config",{
    state:()=>({
        apiHost:"https://duerdedaner.com",
        environment:"dev",
        local:"Chinese",
        userToken:'sadkjvielksdjiv2136s5d1351sv6s351v5adv15e3sw25v13s5',
        role:'admin'
    })
});
export {useConfig};