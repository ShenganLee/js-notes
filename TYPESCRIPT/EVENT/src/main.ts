
type Event = string | symbol

type Listener = (...args: any[]) => void

class EventTarget {
    private events: Map<Event, Listener[]>;
    private globalEvents: Listener[];

    constructor() {
        this.events = new Map()
        this.globalEvents = []
    }

    private getListeners(event: Event): Array<Listener> {
        let listeners = this.events.get(event)

        if (listeners === undefined) {
            listeners = []
            this.events.set(event, listeners)
        }

        return listeners
    }

    on(listener: Listener): this
    on(event: Event, listener: Listener): this
    on(event: Event | Listener, listener?: Listener): this {
        if (listener === undefined) {
            this.globalEvents.push(event as Listener)
        } else {
            const listeners = this.getListeners(event as Event)
            listeners.push(listener as Listener)
        }

        return this
    }

    addEventListener(listener: Listener): this
    addEventListener(event: Event, listener: Listener): this
    addEventListener(event: Event | Listener, listener?: Listener): this {
        if (listener === undefined) return this.on(event as Listener)

        return this.on(event as Event, listener as Listener)
    }

    off(listener: Listener): this
    off(event: Event, listener: Listener): this
    off(event: Event | Listener, listener?: Listener): this {
        if (listener === undefined) {
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
        if (listener === undefined) return this.off(event as Listener)

        return this.off(event as Event, listener as Listener)
    }

    private run(listener: Listener, ...args: any[]) {
        try {
            Reflect.apply(listener, this, args)
        } catch (error) {
            console.error(error)
        }
        return true
    }

    emit(event: Event, ...args: any[]): boolean {
        const listeners = this.getListeners(event)

        let every = listeners.every(listener => this.run(listener, ...args))

        every = this.globalEvents.every(listener => this.run(listener, [event, ...args]))

        return every
    }

    dispatch(event: Event, ...args: any[]): boolean {
        return this.emit(event, ...args)
    }
}

export default EventTarget