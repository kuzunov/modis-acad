let range = {

    *[Symbol.iterator](){
       let nextVal = 0;
        for (let nextVal=0; nextVal<10; nextVal++)
        yield nextVal;
    }
}
for (const v of range) {
    console.log(v);
}