import * as events from 'events';
import * as rx from 'rxjs'
import {from, interval, map, zip} from 'rxjs'
import { EventEmitter } from 'events';
import { text } from 'stream/consumers';
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
const int = interval(1000);
const data = from(['hello','reactive','extejsions', 'js','from','ts'])
const dataStream = zip(data,int).pipe(
    map(([text,num])=>`${num}:${text}`))
dataStream.subscribe(next=> emitter.emit('myevent',{text: next}))