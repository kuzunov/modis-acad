import * as dns from 'dns';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const domain = 'yahoo.com'
dns.resolve(domain, (err,addresses) => {
    if (err) throw err;
    console.log(`Addresses: ${addresses}`);
    addresses.map((address)=>{dns.reverse(address,(err,hostnames)=>{
        if (err) throw err; 
        console.log(`Add: ${address} => ${JSON.stringify(hostnames)}`);
    })})
})