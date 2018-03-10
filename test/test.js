var uri = require('../src/uricomponent');

var object = {
    name : 'leo jaimesson',
    age : 21,
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    },
    numbers : [
        1,
        2,
        3
    ]
};

var array = [
    1,
    2,
    {
        a : 'a',
        b : 'b'
    }
]


console.log('-------- TESTE 1 --------');

var encodeObj = uri.encode(object);
var encodeArr = uri.encode(array, 'name');

console.log(`encode-object: ${encodeObj}`);
console.log(`encode-array: ${encodeArr}`);

// Test Simple Decode 
console.log('-------- TESTE 2 --------');

let simpleArray = [1, 2, 3, 4];

let simpleObject = {
    name: 'Teste',
    year: 2018
};

let encodeArray = uri.encode(simpleArray, 'name')
let encodeObject = uri.encode(simpleObject)

console.log(encodeArray)
console.log(encodeObject)

let decodeArray = uri.decode(encodeArray, 'name')
let decodeObject = uri.decode(encodeObject)

console.log('Decode Array >> ', decodeArray)
console.log('Decode Object >> ', decodeObject)





