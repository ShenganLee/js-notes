const PENDING ='pending'
const FULLFILLED ='fullfilled'
const REJECTED ='rejected'

const resolveOrRejectPromise = (that, fn, data) => {
    const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = typeof fn === 'function' ? fn(data) : data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    })

    while(that.onfulfilledStack.length) {
        const _onfulfilled = this.onfulfilledStack.shift()
        const _onrejected = this.onrejectedStack.shift()

        promise.then(_onfulfilled, _onrejected)
    }

    return promise
}

const resolve = function(value) {
    if (this instanceof MyPromise) {
        this.value = value
        this.status = FULLFILLED

        if (!this.onfulfilledStack.length) return this

        this.onrejectedStack.shift()
        const onfulfilled = this.onfulfilledStack.shift()

        return resolveOrRejectPromise(this, onfulfilled, value)
    }

    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(value)
            } catch (error) {
                reject(error)
            }
        })
    })
}
const reject = function(reason) {
    if (this instanceof MyPromise) {
        this.reason = reason
        this.status = REJECTED

        if (!this.onrejectedStack.length) return this

        this.onfulfilledStack.shift()
        const onrejected = this.onrejectedStack.shift()
        
        return resolveOrRejectPromise(this, onrejected, reason)
    }

    return new MyPromise((_, reject) => {
        setTimeout(() => {
            try {
                reject(reason)
            } catch (error) {
                reject(error)
            }
        })
    })
}

class MyPromise {
    static resolve = resolve
    static reject = reject

    value = void 0
    reason = void 0
    status = PENDING
    onfulfilledStack = []
    onrejectedStack = []


    constructor(fn) {
        if (typeof fn !== 'function') throw new Error("executor must be function")

        const [_resolve, _reject] = [resolve.bind(this), reject.bind(this)]
        try {
            fn(_resolve, _reject)
        } catch (error) {
            _reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        const _onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
        const _onrejected = typeof onrejected === 'function' ? onrejected : reason => {throw reason}

        if (this.status === PENDING) {
            this.onfulfilledStack.push(_onfulfilled)
            this.onrejectedStack.push(_onrejected)

            return this
        }

        return MyPromise.reject(this.value).then(onfulfilled, onrejected)
    }

    catch(onrejected) {
        if (this.status === PENDING) {
            return this.then(void 0, onrejected)
        }

        return MyPromise.catch(this.reason).catch(onrejected)
    }
}