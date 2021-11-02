const PENDING='pending'
const FULLFILLED='fullfilled'
const REJECTED='rejected'

const run = (cxt, status, data) => {
    cxt.status = status
    
    const fns = status === 'FULLFILLED' ?  cxt.onFulfilledStack : cxt.onRejectedStack
}

class Promise {
    status = PENDING

    onFulfilledStack = []
    onRejectedStack =  []

    static resolve(data) {
        return new Promise((resolve, reject) => resolve(data))
    }

    static reject(error) {
        return new Promise((resolve, reject) => reject(error))
    }

    constructor(fn) {
        const resolve = (data) => {
            this.status = FULLFILLED

            if (this.onFulfilledStack.length || this.onRejectedStack.length) {
                const onFulfilled = this.onFulfilledStack.shift()

                let promise = void 0
                if (onFulfilled) {
                    try {
                        const result = onFulfilled(data)
                        promise = Promise.resolve(result)
                    } catch (error) {
                        promise = Promise.reject(error)
                    }
                } else {
                    promise = Promise.resolve(data)
                }

                this.onFulfilledStack.forEach(onFulfilled => {
                    promise.then(onFulfilled)
                })

                this.onRejectedStack.forEach(onRejected => {
                    promise.catch(onRejected)
                })
            }
        }
        const reject = (error) => {
            this.status = REJECTED
            this.onRejected && this.onRejected(error)
        }

        fn(resolve, reject)
    }

    then(onFulfilled) {
        this.onFulfilledStack.push(onFulfilled)

        return this
    }

    catch(onRejected) {
        this.onRejectedStack.push(onRejected)

        return this
    }
}