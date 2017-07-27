# URIComponent

A simple library to converting a javascript object to an encoded URI parameter string. 

## Installation

```console
npm install uricomponent
```

## Import

**AMD**

```js
define(['uricomponent'], function (uricomponent) {
  uricomponent(...);
})
```

**CommonJS**

```js
var uricomponent = require('uricomponent');
uricomponent(...);
```

**ES6 / ES2015 module**

```js
import uricomponent from 'uricomponent'
uricomponent(...);
```

---

## Signature

```js
uricomponent([Object]);
uricomponent([Array],[String]);
```

---

## Use

- Input

```js
var obj = {
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

uricomponent.encode(obj);
```

- Output

```console
"name=leo%20jaimesson&age=21&emails%5Bemail1%5D=test%40gmail.com&emails%5Bemail2%5D=test%40outlook.com&numbers%5B%5D=1&numbers%5B%5D=2&numbers%5B%5D=3"
```

- Input

```js
var array = [
    1,
    2,
    {
        a : 'a',
        b : 'b'
    }
]

uricomponent(array, 'name');
```

- Output

```console
"name%5B%5D=1&name%5B%5D=2&name%5B2%5D%5Ba%5D=a&name%5B2%5D%5Bb%5D=b"
```

---

### License

[MIT License](https://github.com/leojaimesson/MIT-License)