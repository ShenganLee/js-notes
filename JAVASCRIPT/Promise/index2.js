const PENDING ='pending'
const FULLFILLED ='fullfilled'
const REJECTED ='rejected'

const pipFulfilledAndRejected = (promise, onfulfilledAndOnrejectedStack, onfulfilledAndOnrejectedWeakMap) => {
    while(onfulfilledAndOnrejectedStack.length) {
        const fn = onfulfilledAndOnrejectedStack.shift()
        const status = onfulfilledAndOnrejectedWeakMap.get(fn)
        status === FULLFILLED ? promise.then(fn) : promise.catch(fn)
    }

    return promise
}
const resolve = function (value) {
    if (this instanceof MyPromise) {
        this.value = value
        this.status = FULLFILLED

        let fn = this.onfulfilledAndOnrejectedStack.shift()
        while(this.onfulfilledAndOnrejectedStack.length && this.onfulfilledAndOnrejectedWeakMap.get(fn) !== FULLFILLED) {
            fn = this.onfulfilledAndOnrejectedStack.shift()
        }

        if (!fn) return this

        const myPromise = new MyPromise((_resolve, _reject) => {
            try {
                const result = fn(value)
                _resolve(result)
            } catch (error) {
                _reject(error)
            }
        })

        return pipFulfilledAndRejected(myPromise, this.onfulfilledAndOnrejectedStack, this.onfulfilledAndOnrejectedWeakMap)
    }

    // MyPromise.resolve
    if (value instanceof MyPromise) return value
    return new MyPromise((_resolve) => _resolve(data))
}

const reject = function (reason) {
    if (this instanceof MyPromise) {
        this.reason = reason
        this.status = REJECTED

        let fn = this.onfulfilledAndOnrejectedStack.shift()
        while(this.onfulfilledAndOnrejectedStack.length && this.onfulfilledAndOnrejectedWeakMap.get(fn) !== REJECTED) {
            fn = this.onfulfilledAndOnrejectedStack.shift()
        }

        if (!fn) return this

        const myPromise = new MyPromise((_resolve, _reject) => {
            try {
                const result = fn(reason)
                _resolve(result)
            } catch (error) {
                _reject(error)
            }
        })

        return pipFulfilledAndRejected(myPromise, this.onfulfilledAndOnrejectedStack, this.onfulfilledAndOnrejectedWeakMap)
    }

    // MyPromise.reject
    if (reason instanceof MyPromise) return reason
    return new MyPromise((_, _reject) => _reject(reason))
}

class MyPromise {
    static resolve = resolve
    static reject = reject

    value = void 0
    reason = void 0
    status = PENDING
    onfulfilledAndOnrejectedStack = []
    onfulfilledAndOnrejectedWeakMap = new WeakMap()

    constructor(fn) {
        return fn(resolve.bind(this), reject.bind(this))
    }

    then(onFulfilled, onRejected) {
        const _onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        const _onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        
        if (this.status === PENDING) {
            this.onfulfilledAndOnrejectedStack.push(fn)
            this.onfulfilledAndOnrejectedWeakMap(fn, FULLFILLED)

            return this
        }

        if (this.status === FULLFILLED) {
            return MyPromise.resolve(this.value).then(fn)
        }
    }

    catch(fn) {
        if (this.status === PENDING) {
            this.onfulfilledAndOnrejectedStack.push(fn)
            this.onfulfilledAndOnrejectedWeakMap(fn, REJECTED)

            return this
        }
        if (this.status === REJECTED) {
            return MyPromise.reject(this.reason).catch(fn)
        }
        return this
    }
}

