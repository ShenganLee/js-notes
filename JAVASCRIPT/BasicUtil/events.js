class Events {
    constructor() {
        this.queue = new Map()
    }

    on(key, func) {
        if (!func) return false

        const queue = this.queue.get(key) || []
        queue.push(func)

        this.queue.set(key, func)

        return true
    }

    off(key, func) {
        if (!func) return false

        const queue = this.queue.get(key) || []

        const index = queue.indexOf(func)

        if (index > -1) {
            queue.splice(index, 1)
            this.queue.set(queue)

            return true
        }

        return false
    }

    emit(key, ...args) {
        const queue = this.queue.get(key) || []

        queue.forEach(func => {
            Promise.resolve().then(() => Reflect.apply(func, null, args))
        })
    }
}