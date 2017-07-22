var uricomp = require('../src/uricomp');

var object = {
    name : 'leo jaimesson',
    age : 21,
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    }
};

console.log(uricomp(object));
