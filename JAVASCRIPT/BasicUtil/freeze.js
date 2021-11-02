const isObject = (data) => data instanceof Object

function freeze(data, deep = false) {
    if (!isObject(data)) return data

    if (!deep) return Object.freeze(data)

    const weekMap = new WeakMap()

    const dataArray = [data]

    while(dataArray.length) {
        const current = dataArray.shift()
        if (isObject(current) && !weekMap.has(current)) {
            Object.freeze(current)
            weekMap.set(current)

            const keys = Reflect.ownKeys(current)
            dataArray.push(...keys.map(key => current[key]).filter(isObject))
        }
    }

    return data
}