# Easy-use-storage v1.0.0

New storage API that can help user set expired time and no need to use JSON.parse in most scenarios.

## GitHub

https://github.com/kamesan012/EasyUseStorage

## Installation

```bash
npm i easy-use-storage
```

## Usage

```js
import { cusLocalStorageInstance, cusSessionStorageInstance, CusLocalStorage, CusSessionStorage } from 'easy-use-storage'
// Add it to window (optional).
window.cusLocalStorage = cusLocalStorageInstance
window.cusSessionStorage = cusSessionStorageInstance
// You can also create instance by yourself.
const myLocalStorage = new CusLocalStorage() // pass nothing to use default timeout (7 days)
const anotherLocalStorage = new CusLocalStorage(1000 * 60) // pass millisecond
// Usage of cusSessionStorage is the same as cusLocalStorage's.
// You can use it's basic feature as the original localStorage API.
cusLocalStorage.setItem('userId', '135568')
console.log(cusLocalStorage.getItem('userId')) // '135568'
// Original localStorage API only return string type, but our API return any type or result you pass in.
cusLocalStorage.setItem('number', 123)
console.log(cusLocalStorage.getItem('number')) // 123 || our API returns 123 and localStorage API returns '123'
cusLocalStorage.setItem('boolean', true)
console.log(cusLocalStorage.getItem('number')) // true || our API returns true and localStorage API returns 'true'
// You can pass an Object without JSON.parse by using our API.
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
