const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolve(result) {
    if (this.PromiseState === PENDING) {
        this.PromiseState = FULFILLED
        this.PromiseResult = result
    }
}

function reject(reason) {
    if (this.PromiseState === PENDING) {
        this.PromiseState = REJECTED
        this.PromiseResult = reason
    }
}

class MyPromise {
    static resolve(result) {
        return new MyPromise()
    }

    static reject(reason) {

    }

    PromiseResult = void 0
    PromiseState = PENDING

    onFulfilledCallbacks = []
    onRejectedCallbacks = []

    constructor(func) {
        try {
            func(resolve.bind(this), reject.bind(this))
        } catch (error) {
            reject.call(this, error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : result => result
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        if (this.PromiseState === PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        } else if (this.PromiseState === FULFILLED ) {
            setTimeout(() => {
                onFulfilled(this.PromiseResult)
            })
            
        } else if (this.PromiseState = REJECTED) {
            setTimeout(() => {
                onRejected(this.PromiseResult)
            })
        }

        return this
    }

    catch(onRejected) {

    }
}