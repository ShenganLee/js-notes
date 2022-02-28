const state = new Proxy({a: 1}, {
    get: (target, p, receiver) => {
        console.log(target, p, receiver)
        return target[p]
    }
})

const fn = (key) => {
    console.log(state[key])
}

const proxyfn = new Proxy(fn, {
    apply: (target, thisArg, argArray) => {
        // console.log('start', target)
        Reflect.apply(target, thisArg, argArray)
        // console.log('end')
    }
})

proxyfn(state)

class Express {
    constructor() { 
        this.list = []
    }

    use(fn) {
        this.list.push(fn)
    }

    execute(i = 0) {
        const fn = this.list[i]
        fn && Reflect.apply(fn, this, [() => this.execute(++i)])
    }
}

const express = new Express()

express.use((next) => {
    console.log(1)
    next()
    console.log(1)
})

express.use((next) => {
    console.log(2)
    next()
    console.log(2)
})

express.use((next) => {
    console.log(3)
    next()
    console.log(3)
})

express.execute()