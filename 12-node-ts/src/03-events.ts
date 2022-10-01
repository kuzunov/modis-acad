import * as events from 'events';
import { EventEmitter } from 'events';
const second = (payload,status) => {
    console.log(`2222222:  ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
}
const emitter = new EventEmitter();
emitter.on('myevent', (payload,status) => {
    console.log(`Event recieved:  ${JSON.stringify(payload)}, status: ${JSON.stringify(status)}`);
});
emitter.once('myevent', second);

setTimeout(()=>emitter.off('myevent',second),10000)

let num = 0;
const interval = setInterval(()=> emitter.emit('myevent',{num: (++num), name:"asd",age:42}, "active"),
3000)