// EP: Enter parameters 入参
interface ISetEP {
    key: string; value: any; deep?: boolean; needExpire?: boolean; expireTimeout?: number | null;
}
interface IGetEp {
    key: string; deep?: boolean;
}
interface IStore {
    set({ key, value, deep, needExpire, expireTimeout }: ISetEP): void;
    get({ key, deep }: IGetEp): any;
}
const defaultTimeout = 7 * 24 * 60 * 60 * 1000
const store: IStore = {
    // 传参 名称,值,是否是localstorage,是否设置过期，过期时间
    set({ key, value, deep = false, needExpire = false, expireTimeout = null }) {
        const storage = deep ? window.localStorage : window.sessionStorage
        const type = typeof value
        if (type === 'object') {
            value = JSON.stringify(value)
        }
        let expireTime: number | null = null
        // 判断是否需要设置过期时间
        if (needExpire) {
            const currentTime = new Date().getTime()
            // 如果需要，判断是否设置了过期时间，没有设置则用默认值
            expireTimeout === null ?
                (expireTime = currentTime + defaultTimeout) :
                (expireTime = currentTime + expireTimeout)
        }
        const storageObject = JSON.stringify({
            value,
            type,
            expireTime
        })
        storage.setItem(key, storageObject)
    },
    get({ key, deep = false }) {
        const storage = deep ? window.localStorage : window.sessionStorage
        const stringifyJSON = storage.getItem(key)
        let storageObject = null
        // 将storeage中存储的对象从JSON字符串解析出来
        if (stringifyJSON) {
            try {
                storageObject = JSON.parse(stringifyJSON)
            } catch {
                throw Error('原生api存储的值请用原生api读取')
            }
        }
        if (storageObject !== null) {
            const { value, type, expireTime } = storageObject
            const currentTime = new Date().getTime()
            // 判断是否设置过期时间，如设置了是否已经过期
            if (expireTime && expireTime < currentTime) {
                // 已过期的参数直接从本地移除
                storage.removeItem(key)
                return null
            } else {
                return type === 'object' ? JSON.parse(value) : value
            }
        } else {
            return storageObject
        }
    }
}
export default store;
