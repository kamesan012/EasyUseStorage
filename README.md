# Easy-use-storage v1.0.0

New storage API that can help user set expired time and no need to use JSON.parse in most scenarios.

## Installation

```bash
npm i easy-use-storage
```

## Usage

```js
import { cusLocalStorageInstance, cusSessionStorageInstance } from 'easy-use-storage'
// Add it to window (optional).
window.cusLocalStorage = cusLocalStorageInstance
window.cusSessionStorage = cusSessionStorageInstance
// Usage of cusSessionStorage is the same as cusLocalStorage's.
// You can use it's basic feature as the original localStorage API.
cusLocalStorage.setItem('userId', '135568')
console.log(cusLocalStorage.getItem('userId')) // '135568'
// By use our API you can pass an Object without JSON.parse.
cusLocalStorage.setItem('commonObj', {
    name: 'test-user',
    age: 18,
    job: ['Frontend Engineer', 'Backend Engineer']
})
// Of course you can get the Object directly.
console.log(cusLocalStorage.getItem('commonObj')) // { name: 'test-user', age: 18, job: ['Frontend Engineer', 'Backend Engineer'] }
// You can pass extra parameter expireTimeout(defalut 7 days) to make it support expiration.
cusLocalStorage.setItem('expired', 'someValue', -1000)
console.log(cusLocalStorage.getItem('expired')) // null
// use default
cusLocalStorage.setItem('stillCanUse', 'someValue', null)
console.log(cusLocalStorage.getItem('stillCanUse')) // 'someValue'
// ⚠ Some object like Date and RegExp may work incorrectly.
cusLocalStorage.setItem('info', {
    name: 'test',
    timestamp: new Date()
});
console.log(cusLocalStorage.getItem('info')) // { name: 'test', timestamp: '2023-02-06T09:12:19.498Z' } Date will be converted to string.
```

