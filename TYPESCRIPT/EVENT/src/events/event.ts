export type Listener = (...args: any[]) => void

export interface EventListenerOptions {
    once?: boolean;
    capture?: boolean;
}

export type EventsHandleWeakMapOption = Listener | boolean

export class Event {
    private macrotask: Array<Listener>
    private microtask: Array<Listener>

    constructor() {
        this.macrotask = []
        this.microtask = []
    }

    on(listener: Listener): this
    on(listener: Listener, useCapture: boolean): this
    on(listener: Listener, option: EventListenerOptions): this
    on(listener: Listener, option?: boolean | EventListenerOptions): this {
        let [capture, once] = [false, false]
        if (typeof option === 'boolean' && (option as boolean) === true) {
            capture = true
        } else if (option !== void 0) {
            once = !!(option as EventListenerOptions).once
            capture = !!(option as EventListenerOptions).capture
        }

        const tasks = capture ? this.microtask : this.macrotask
        tasks.push(listener)
        if (once) tasks[-tasks.length] = listener
        
        return this;
    }

    addEventListener(listener: Listener): this
    addEventListener(listener: Listener, useCapture: boolean): this
    addEventListener(listener: Listener, option: EventListenerOptions): this
    addEventListener(listener: Listener, option?: boolean | EventListenerOptions): this {
        if (option === void 0) {
            return this.on(listener)
        } else if (typeof option === 'boolean') {
            return this.on(listener, option as boolean)
        }  else {
            return this.on(listener, option as EventListenerOptions)
        }
    }

    off(listener: Listener): this
    off(listener: Listener, useCapture: boolean): this
    off(listener: Listener, option: EventListenerOptions): this
    off(listener: Listener, option?: boolean | EventListenerOptions): this {
        let capture = false
        if (typeof option === 'boolean' && (option as boolean) === true) {
            capture = true
        } else if (option !== void 0) {
            capture = !!(option as EventListenerOptions).capture
        }

        const tasks = capture ? this.microtask : this.macrotask

        const index = tasks.findIndex(task => task === listener)

        if (index > 0) {
            tasks.splice(index, 1)
            delete tasks[-(index + 1)]
        }
        return this
    }

    removeEventListener(listener: Listener): this
    removeEventListener(listener: Listener, useCapture: boolean): this
    removeEventListener(listener: Listener, option: EventListenerOptions): this
    removeEventListener(listener: Listener, option?: boolean | EventListenerOptions): this {
        if (option === void 0) {
            return this.off(listener)
        } else if (typeof option === 'boolean') {
            return this.off(listener, option as boolean)
        }  else {
            return this.off(listener, option as EventListenerOptions)
        }
    }

    once(listener: Listener, useCapture?: boolean): this {
        const capture = !!useCapture
        return this.on(listener, { once: true, capture })
    }

    emit(...args: any[]): void {
        const onceMicrotaskIndex: Array<number> = []
        const onceMacrotaskIndex: Array<number> = []

        this.microtask.forEach((task, index, list) => {
            Promise.resolve().then(() => {
                Reflect.apply(task, this, [...args])
            })

            if (task === list[-(index + 1)]) {
                onceMicrotaskIndex.push(index)
            }
        })

        this.macrotask.forEach((task, index, list) => {
            setTimeout(() => {
                Reflect.apply(task, this, [...args])
            }, 0)

            if (task === list[-(index + 1)]) {
                onceMacrotaskIndex.push(index)
            }
        })

        onceMicrotaskIndex.forEach(index => {
            this.microtask.splice(index, 1)
            delete this.microtask[-(index + 1)]
        })
        onceMacrotaskIndex.forEach(index => {
            this.macrotask.splice(index, 1)
            delete this.macrotask[-(index + 1)]
        })
    }
}