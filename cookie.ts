type ICookie = {
    get(name: string): string | null;
    set(name: string, value: string, time?: number): void;
    clear(name: string): void;
};
/**
 * document cookie 存取。
 * @returns
 * @example
 *
 * 从document.cookie里面获取值
 * cookie.get(name);
 * 设置/更新document.cookie的值
 * cookie.set(name, value, [day=30]);
 * 删除document.cookie里面存储的值
 * cookie.clear(name);
 */
const cookie: ICookie = {
    get(name: string): string | null {
        name = window.decodeURIComponent(name);
        const match = new RegExp(`\\b${name}=([^;]*)\\b`).exec(document.cookie);
        if (!match) return null;
        return window.decodeURIComponent(match[1]);
    },
    set(name: string, value: string, day = 30): void {
        name = window.encodeURIComponent(name);
        value = window.encodeURIComponent(value);
        document.cookie = `${name}=${value}; expires=${new Date().getTime() + day * 24 * 60 * 60 * 1000}; path=/;`;
    },
    clear(name: string): void {
        this.set(name, '', -1);
    }
};

export default cookie;
