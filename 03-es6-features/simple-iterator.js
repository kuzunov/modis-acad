let range = {

    [Symbol.iterator]: () => {
       let nextVal = 0;
        return {
            next: () => {
                return { 
                    value: nextVal++,
                    done: nextVal>100
                }
            }
        }
    }
}
for (const v of range) {
    console.log(v);
}