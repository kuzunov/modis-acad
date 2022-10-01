import { promises, Resolver } from "dns";

const resolver = new Resolver();
resolver.setServers(['8.8.8.8']);
const domain ='yahoo.com';

const demo = (async() => {
    try {
    const address  = await promises.resolve(domain);
    address.map(async (addr) => {const hostnames = await promises.reverse(addr);
    console.log(hostnames)})
    }catch(err){
        console.log(err)
    }
})();
