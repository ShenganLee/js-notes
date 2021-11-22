class MapStore {
    constructor(initState = {}) {
        this.state = new Map()
        
        Reflect.ownKeys(initState).forEach(key => {
            this.state.set(key, initState[key])
        })
    }

    set(key, value) {
        this.state.set(key, value)
    }

    get(key) {
        this.state.get(key)
    }

    on(channel, key, func) {

    }

    off(channel, key, func) {

    }
}