let test = require('ava').test;
let uri = require('../src/uricomponent');

let object = {
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

let array = [
    1,
    2,
    {
        a : 'a',
        b : 'b'
    }
];

let simpleArray = [1, 2, 3, 4];

let simpleObject = {
	    name: 'Teste',
	    year: 2018
};

test('Encode Object', t => {
	t.deepEqual(uri.encode(object), 'name=leo%20jaimesson&age=21&emails%5Bemail1%5D=test%40gmail.com&emails%5Bemail2%5D=test%40outlook.com&numbers%5B%5D=1&numbers%5B%5D=2&numbers%5B%5D=3');
});

test('Encode Array', t => {
	t.deepEqual(uri.encode(array, 'name'), 'name%5B%5D=1&name%5B%5D=2&name%5B2%5D%5Ba%5D=a&name%5B2%5D%5Bb%5D=b');
});

test('Decode Simple Array', t => {
	let  encodeArray = uri.encode(simpleArray, 'name');
	t.deepEqual(simpleArray, uri.decode(encodeArray, 'name'));
});

test('Decode Simple Object', t => {	
	let encodeObject = uri.encode(simpleObject);
	t.deepEqual(simpleObject, uri.decode(encodeObject));
});
