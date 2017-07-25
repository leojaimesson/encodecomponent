var uricomp = require('../src/uricomponent');

var object = {
    name : 'leo jaimesson',
    age : 21,
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    }
};

var encode = uricomp.encode(object);
var decode = uricomp.decode(encode);

console.log('encode: ',encode);
console.log('decode: ', decode);
