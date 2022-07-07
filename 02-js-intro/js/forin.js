var triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
    this.color = 'red';
    this.size= 12;
}

ColoredTriangle.prototype = triangle;
ColoredTriangle.prototype.toString = function(){
    return `Triangle ${this.color}`;
};
Object.defineProperty(triangle, "name", {
    writable:false,enumerable:true,configurable:true
})

function test() {
    var obj = new ColoredTriangle();

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(`obj.${prop} = ${obj[prop]}`);
        }
    }
}

test()
