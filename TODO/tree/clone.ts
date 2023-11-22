export type KeyType = ReadonlyArray<string | symbol | number | ((...args: any[]) => boolean)>
export interface CloneConfigType {
    includes?: KeyType,
    excludes?: KeyType,
    transfers?: KeyType,
}

const isObject = (value: unknown): boolean => {
    const type = typeof value
    return value !== null && (type === 'object' || type === 'function')
}

const cloneObj = <T extends object>(source: T, target: T, config?: CloneConfigType, baseConfig?: CloneConfigType): T => {
    Reflect.ownKeys(source).forEach((key) => {
        if (
            !!config?.excludes?.some(exclude => {
                typeof exclude === 'function'
                ? exclude(key, source)
                : exclude === key
            })
        ) return

        if (
            !!config?.transfers?.some(transfer => {
                typeof transfer === 'function'
                ? transfer(key, source)
                : transfer === key
            })
        ) {
            Reflect.set(target, key, Reflect.get(source, key))
            return
        }

        if (
            !!config?.includes
            && !config.includes.some(include => {
                typeof include === 'function'
                ? include(key)
                : include === key
            })
        ) return

        Reflect.set(target, key, Clone.clone(Reflect.get(source, key), baseConfig))
    })

    return target
}

export class Clone {
    static clone<T extends unknown>(obj: T, config?: CloneConfigType): T {
        if (!isObject(obj)) return obj

        let result;
        // Array
        if (Array.isArray(obj)) {
            result = new (obj as any).constructor(obj.length)
            const _config = { ...config, excludes: ['length'] } as CloneConfigType
            if (!!config?.excludes) _config.excludes?.concat(config.excludes)
            cloneObj(obj, result, _config,  config)
        }

        result = Object.create(Object.getPrototypeOf(obj))

        cloneObj(obj, result, config)

        return result;
    }
}
