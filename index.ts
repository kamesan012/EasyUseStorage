import store from './store';
/**
 * 说明：大致用法与浏览器原生localStorage相同，增加了过期时间的配置，可以直接传对象给value，会自动转换JSON
 * 注意：一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
 */
class CusLocalStorage {
    defaultTimeout = 7 * 24 * 60 * 60 * 1000
    expireTimeout: number
    constructor(expireTimeout?: number) {
        this.expireTimeout = expireTimeout ?? this.defaultTimeout
    }
    /**
     * 说明：与localStorage.setItem()的用法基本一致，增强了功能——可以直接给value传对象
     * 注意：一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
     */
    setItem(key: string, value: any): void;
    /**
     * 说明：与localStorage.setItem()的用法基本一致，增强了功能——可以直接给value传对象，新增传参expireTimeout
     * @param { number | null } expireTimeout 过期时间，数值为ms，传null时使用默认值7天
     * 注意：一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
     */
    setItem(key: string, value: any, expireTimeout: number | null): void;
    setItem(key: string, value: any, expireTimeout?: number | null): void {
        const deep = true
        if (expireTimeout !== undefined) {
            const needExpire = true
            expireTimeout = expireTimeout ?? this.expireTimeout
            store.set({ key, value, deep, needExpire, expireTimeout })
        } else {
            store.set({ key, value, deep })
        }
    }

    getItem(key: string): any {
        const deep = true
        return store.get({ key, deep })
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
    }

    clear(): void {
        localStorage.clear()
    }
}

/**
 * 说明：大致用法与浏览器原生sessionStorage相同，增加了过期时间的配置，可以直接传对象给value，会自动转换JSON。
 * 注意：注意一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
 */
class CusSessionStorage {
    defaultTimeout = 7 * 24 * 60 * 60 * 1000
    expireTimeout: number
    constructor(expireTimeout?: number) {
        this.expireTimeout = expireTimeout ?? this.defaultTimeout
    }
    /**
     * 说明：与sessionStorage.setItem()的用法基本一致，增强了功能——可以直接给value传对象
     * 注意：一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
     */
    setItem(key: string, value: any): void;
    setItem(key: string, value: any, expireTimeout: number | null): void;
    /**
     * 说明：与sessionStorage.setItem()的用法基本一致，增强了功能——可以直接给value传对象，新增传参expireTimeout
     * @param { number | null } expireTimeout 过期时间，数值为ms，传null时使用默认值7天
     * 注意：一些特殊的对象如Date、RegExp、Error等，由于JSON.stringfy()的问题需自行做特殊处理
     */
    setItem(key: string, value: any, expireTimeout?: number | null): void {
        if (expireTimeout !== undefined) {
            const needExpire = true
            expireTimeout = expireTimeout ?? this.expireTimeout
            store.set({ key, value, needExpire, expireTimeout })
        } else {
            store.set({ key, value })
        }
    }

    getItem(key: string): any | null {
        return store.get({ key })
    }

    removeItem(key: string): void {
        sessionStorage.removeItem(key)
    }

    clear(): void {
        sessionStorage.clear()
    }
}
const cusLocalStorageInstance = new CusLocalStorage()
const cusSessionStorageInstance = new CusSessionStorage()
export { cusLocalStorageInstance, cusSessionStorageInstance, CusLocalStorage, CusSessionStorage }
export { default as cookie } from './cookie'
