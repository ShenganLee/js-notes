

type StateType = 'pending' | 'fulfilled' | 'rejected';

type executorType = (resolve: (value?: any) => void, reject: (reason?: any) => void) => void;

type onFulfilledOrRejectedType = (data?: any) => any



class _Promise {
    state: StateType = 'pending'
    value?: any;
    reason?: any;

    onFulfilledCallbacks: onFulfilledOrRejectedType[];
    onRejectedCallbacks: onFulfilledOrRejectedType[];

    static resolve(value?: any): _Promise {
        if (value?.then) return value

        const nextPromise = new _Promise((resolve) => resolve(value))
        
        return nextPromise
    }

    static reject(reason?: any): _Promise {
        if (reason?.then) return reason

        const nextPromise = new _Promise((_, reject) => reject(reason))
        
        return nextPromise
    }

    constructor(executor?: executorType) {
        const resolve = (value?: any): void => {
            if (this.state === 'pending') {
                this.state = 'pending'
                this.value = value
                this.onFulfilledCallbacks.forEach(callabck => {
                    try {
                        callabck(value)
                    } catch (error) {
                        console.error(error)
                    }
                })
            }
        }
        const reject = (reason?: any): void => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason

                this.onRejectedCallbacks.forEach(callabck => {
                    try {
                        callabck(reason)
                    } catch (error) {
                        console.error(error)
                    }
                })
            }
        }

        try {
            executor?.(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled?: onFulfilledOrRejectedType, onRejected?: onFulfilledOrRejectedType): _Promise {
        return new _Promise((resolve, reject) => {
            const executeOnFulfilledOrOnRejected = (
                onFulfilledOronRejected?: onFulfilledOrRejectedType,
                valueOrReason?: any
            ): void => {
                setTimeout(() => {
                    try {
                        const value = onFulfilledOronRejected?.(valueOrReason)
                        if (value.then) {
                            return void value.then(resolve)
                        }
                        resolve(value)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        
            if (this.state === 'fulfilled') {
                return executeOnFulfilledOrOnRejected(onFulfilled, this.value)
            }
    
            if (this.state === 'rejected') {
                return executeOnFulfilledOrOnRejected(onRejected, this.reason)
            }
            
            const _onFulfilled = (value?: any) => executeOnFulfilledOrOnRejected(onFulfilled, value)
            const _onRejected = (reason?: any) => executeOnFulfilledOrOnRejected(onRejected, reason)
            this.onFulfilledCallbacks.push(_onFulfilled)
            this.onRejectedCallbacks.push(_onRejected)
        })
    }
}