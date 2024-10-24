
export type AsyncStorageStoreType = {
    setItem: (key:string, value: any) => void | Promise<void>,
    getItem: (key:string) => any | Promise<any>,
    removeItem: (key:string) => void | Promise<void>,
    clear: () => void | Promise<void>,
    keys: () => string[] | Promise<string[]>,
}

export type AsyncStorageStoreValueType = {
    date: number,
    data: any,
    expries: number
}

export class AsyncStorage {
    store: AsyncStorageStoreType;
    constructor(store: AsyncStorageStoreType) {
        this.store = store;
    }

    async #getItem(key: string) {
        const storeValueString = await this.store.getItem(key);
        if (!storeValueString) return

        const storeValue = JSON.parse(storeValueString)

        if (storeValue.expries > 0 && Date.now() - storeValue.date > storeValue.expries) {
            return this.store.removeItem(key);
        }

        return storeValue.data;
    }

    async setItem(key: string, value: any, expries = -1): Promise<void> {
        const storeValue: AsyncStorageStoreValueType = {
            date: Date.now(),
            data: value,
            expries: Date.now() + expries
        }

        return this.store.setItem(key, JSON.stringify(storeValue));
    }

    async getItem(key: string): Promise<any> {
        
        return this.#getItem(key);
    }

    async removeItem(key: string): Promise<void> {
        return this.store.removeItem(key);
    }

    async clear(): Promise<void> {
        return this.store.clear();
    }

    async keys(): Promise<string[]> {
        return this.store.keys();
    }

    async getAll(): Promise<{ [key: string]: any }> {
        const keys = await this.store.keys();
        const result: { [key: string]: any } = {};

        for (const key of keys) {
            result[key] = await this.#getItem(key);
        }

        return result;
    }

    async cleanExpired(): Promise<void> {
        const keys = await this.store.keys();
        for (const key of keys) {
            await this.#getItem(key);
        }
    }
}