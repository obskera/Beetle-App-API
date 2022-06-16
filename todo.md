- [ ] implement toasts instead of alerts, whenever telling the user something they can't change
  - [octo's toast notifications](https://codepen.io/octoshrimpy/pen/JYPQbo?editors=1010)
- [ ] look up `.env` files for that pesky mongodb secret
- [ ] rename button `save standings` into `download standings`
- [ ] set canvas css to position fixed, and push it offscreen using 200vw
- [ ] `save standings` > `cancel` causes app to freeze
- [ ] extract all strings (alerts, urls, etc) into an object, to make it easier to modify them in the future
- [ ] all `alert()` and `prompt()` messages are very verbose. 
  - look into [google's guidelines](https://primer.style/design/)
- [ ] gracefully handle missing data
- [ ] check out `__dirname` and how to get current url/path
- [ ] setup vertical ruler to 78, clean up anything that passes it [relevant](https://github.com/microsoft/vscode/issues/103662)

```js

// declare class here to pull out any fetch code from main codebase
class dbapi {
  put(args) {
    return fetch(put, args)
  }
}

let dbapi = new dbapi()
foo() {
  args = {stuff} // declare to simplify line below
  let bar = await dbapi.put(args) // call class above
}
```