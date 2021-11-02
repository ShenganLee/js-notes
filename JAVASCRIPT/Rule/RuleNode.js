import { EventEmitter } from 'events';

const PENDING ='pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class RuleNode extends EventEmitter {
    constructor(opts) {
        super()
    }

    start() {

    }

    destroy() {

    }

    restart() {
        
    }

    previous(cxt) {

    }

    execute(cxt) {

    }

    next() {

    }

    run(cxt) {
        if (this.previous(cxt)) {
            const _cxt = this.execute(cxt)
        }
    }
}