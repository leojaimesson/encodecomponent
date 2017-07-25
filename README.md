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
  uricomponent.encode(...);
  uricomponent.decode(...);
})
```

**CommonJS**

```js
var uricomponent = require('uricomponent');
uricomponent.encode(...);
uricomponent.decode(...);
```

**ES6 / ES2015 module**

```js
import uricomponent from 'uricomponent'
uricomponent.encode(...)
uricomponent.decode(...);
```

---

## Signature

```js
uricomponent.encode([Object]);
uricomponent.decode([String]);
```

---

## Use

**Encode**

- Input

```js
var obj = {
    name : 'leo jaimesson',
    age : 21,
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    }
};

uricomponent.encode(obj);
```

- Output

```console
"name=leo%20jaimesson&age=21&emails%5Bemail1%5D=test%40gmail.com&emails%5Bemail2%5D=test%40outlook.com"
```

**Decode**

- Input

```js
var uri = "name=leo%20jaimesson&age=21&emails%5Bemail1%5D=test%40gmail.com&emails%5Bemail2%5D=test%40outlook.com";

uricomponent.decode(uri);
```

- Output

```js
{
    name : 'leo jaimesson',
    age : '21',
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    }
}
```

---

### License

[MIT License](https://github.com/leojaimesson/MIT-License)