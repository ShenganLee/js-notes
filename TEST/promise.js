// function MyPromiseApply(fn, ...args) {
//     try {
//         Reflect.apply(fn, null, args)
//     } catch (error) {
        
//     }
// }

class MyPromise {
    PromiseState = 'pendding'
    PromiseResult = void 0

    constructor(fn) {
        try {
            Reflect.apply(fn, null, [MyPromise.resolve.bind(this), MyPromise.reject.bind(this)])
        } catch (error) {
            
        }
        
    }

    static resolve(result) {
        if (this instanceof MyPromise && this.PromiseState === 'pendding') {
            this.PromiseState = 'fulfilled'
            this.PromiseResult = result
        }
        
        return 
    }

    static reject(errr) {
        this.PromiseState = 'rejected'
    }

    then(result, )
}