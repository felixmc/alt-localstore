# Alt LocalStore

This is a module for automatically saving and restoring store state from `localStorage` for react applications using `alt` and `immutable`.


## Setup

First, make sure you make the `setState()` method public in the state constructor like so:

```javascript
class MyStore {

  constructor() {

    this.exportPublicMethods({
      setState: this.setState
    });

  }

}
```

Without this, the localstore won't be able to restore the store state from `localStorage`.


## Usage

```javascript
import LocalStore from 'alt-localstore';
import MyStore from './MyStore';

let myStore    = alt.createStore(MyStore);
let localCache = new LocalStore(myStore);

localCache.restore();
```

### constructor(store[, localStorageKey])
Constructor takes in an alt store instance and an optional key to be used for `localStorage` which defaults to the store `displayName`.

### save([state])
Save the store state to `localStorage`. Automatically called on store state changes.  
Takes in optional state param to save instead of the store state.

### restore()
Restore the `localStorage` saved data to the state store. Defaults to `{}`.


### listen()
Listen to store state changes and automatically persist the new state to `localStorage`.
Automatically called in the constructor.


### unlisten()
Stop listening to store state changes.


## Source Code
Source code was originally written in es6. Default import retrieves the babel transpiled es5 version. To import the es6 version of the module, use `import LocalStore from 'alt-localstore/index.es6'`
