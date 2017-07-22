# URIComponent

Uma simples lib para converter um objeto javascript em uma string de parâmetro URI codificada. 

## Importar

**AMD**

```js
define(['uricomp'], function (uricomp) {
  uricomp(...);
})
```

**CommonJS**

```js
var uricomp = require('uricomp');
uricomp(...);
```

**ES6 / ES2015 module**

```js
import uricomp from 'uricomp'
uricomp(...)
```

---

## Assinatura

```js
uricomp([Object])
```

---

## Uso

```js
var object = {
    name : 'leo jaimesson',
    age : 21,
    emails : {
        email1 : 'test@gmail.com',
        email2 : 'test@outlook.com'
    }
};
var uri = uricomp(object);

console.log(uri); // name=leo%20jaimesson&age=21&emails%5Bemail1%5D=test%40gmail.com&emails%5Bemail2%5D=test%40outlook.com
```

### Licença

**MIT**