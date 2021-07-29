
type Event = string | symbol

type Listener = (...args: any[]) => void

class EventTarget {
    private events: Map<Event, Listener[]>;
    private globalEvents: Listener[];

    private run(listener: Listener, ...args: any[]) {
        try {
            Reflect.apply(listener, this, args)
        } catch (error) {
            console.error(error)
        }
        return true
    }

    private getListeners(event: Event): Array<Listener> {
        let listeners = this.events.get(event)

        if (listeners === undefined) {
            listeners = []
            this.events.set(event, listeners)
        }

        return listeners
    }

    private getOnceListener(listener: Listener): Listener
    private getOnceListener(event: Event, listener: Listener): Listener
    private getOnceListener(event: Event | Listener, listener?: Listener): Listener {
        let onceListener: Listener
        if (listener === void 0) {
            onceListener = (...args: any[]) => {
                this.run(event as Listener, ...args)
                this.off(onceListener)
            }
        } else {
            onceListener = (...args: any[]) => {
                this.run(listener as Listener, ...args)
                this.off(event as Event, onceListener)
            }
        }
        
        return onceListener
    }

    constructor() {
        this.events = new Map()
        this.globalEvents = []
    }

    on(listener: Listener): this
    on(event: Event, listener: Listener): this
    on(event: Event | Listener, listener?: Listener): this {
        if (listener === void 0) {
            this.globalEvents.push(event as Listener)
        } else {
            const listeners = this.getListeners(event as Event)
            listeners.push(listener as Listener)
        }

        return this
    }

    once(listener: Listener): this
    once(event: Event, listener: Listener): this
    once(event: Event | Listener, listener?: Listener): this {
        if (listener === void 0) {
            const _event = this.getOnceListener(event as Listener)
            this.globalEvents.push(_event)
        } else {
            const listeners = this.getListeners(event as Event)
            const _listener = this.getOnceListener(event as Event, listener as Listener)
            listeners.push(_listener)
        }
        return this;
    }

    addEventListener(listener: Listener): this
    addEventListener(event: Event, listener: Listener): this
    addEventListener(event: Event | Listener, listener?: Listener): this {
        if (listener === void 0) return this.on(event as Listener)

        return this.on(event as Event, listener as Listener)
    }

    off(listener: Listener): this
    off(event: Event, listener: Listener): this
    off(event: Event | Listener, listener?: Listener): this {
        if (listener === void 0) {
            const index = this.globalEvents.findIndex((_listener) => _listener === event as Listener)
            index > -1 && this.globalEvents.splice(index, 1)
        } else {
            const listeners = this.getListeners(event as Event)
            const index = listeners.findIndex((_listener) => _listener === listener)
            index > -1 && listeners.splice(index, 1)
        }

        return this
    }

    removeEventListener(listener: Listener): this
    removeEventListener(event: Event, listener: Listener): this
    removeEventListener(event: Event | Listener, listener?: Listener): this {
        if (listener === void 0) return this.off(event as Listener)

        return this.off(event as Event, listener as Listener)
    }

    clear(): this {
        this.events.clear()
        this.globalEvents.length = 0
        return this;
    }

    emit(event: Event, ...args: any[]): boolean {
        setTimeout(() => {
            const listeners = this.getListeners(event)
            listeners.every(listener => this.run(listener, ...args))
            this.globalEvents.every(listener => this.run(listener, event, ...args))
        }, 0)

        return this.events.has(event)
    }

    dispatch(event: Event, ...args: any[]): boolean {
        return this.emit(event, ...args)
    }
}

export default EventTarget