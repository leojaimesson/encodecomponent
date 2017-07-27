var uricomp = require('../src/uricomponent');

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

var encodeObj = uricomp(object);
var encodeArr = uricomp(array, 'name');

console.log('encode-object: ',encodeObj);
console.log('encode-array: ', encodeArr);
