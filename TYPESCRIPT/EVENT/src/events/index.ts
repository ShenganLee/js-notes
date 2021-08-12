import { Listener, EventListenerOptions, Event } from './event'

export type Handler = string | symbol

export class Events {
    private events: Map<Handler, Event>

    constructor() {
        this.events = new Map()
    }

    on(handler: Handler, listener: Listener): this
    on(handler: Handler, listener: Listener, useCapture: boolean): this
    on(handler: Handler, listener: Listener, option: EventListenerOptions): this
    on(handler: Handler, listener: Listener, option?: boolean | EventListenerOptions): this {
        let event = this.events.get(handler)
        if (!event) {
            event = new Event()
            this.events.set(handler, event)
        }

        if (option === void 0) {
            event.on(listener)
        } else if (typeof option === 'boolean') {
            event.on(listener, option as boolean)
        } else {
            event.on(listener, option as EventListenerOptions)
        }

        return this;
    }

    addEventListener(handler: Handler, listener: Listener): this
    addEventListener(handler: Handler, listener: Listener, useCapture: boolean): this
    addEventListener(handler: Handler, listener: Listener, option: EventListenerOptions): this
    addEventListener(handler: Handler, listener: Listener, option?: boolean | EventListenerOptions): this {
        if (option === void 0) {
            return this.on(handler, listener)
        } else if (typeof option === 'boolean') {
            return this.on(handler, listener, option as boolean)
        } else {
            return this.on(handler, listener, option as EventListenerOptions)
        }
    }

    off(handler: Handler, listener: Listener): this
    off(handler: Handler, listener: Listener, useCapture: boolean): this
    off(handler: Handler, listener: Listener, option: EventListenerOptions): this
    off(handler: Handler, listener: Listener, option?: boolean | EventListenerOptions): this {
        const event = this.events.get(handler)

        if (!event) return this

        if (option === void 0) {
            event.off(listener)
        } else if (typeof option === 'boolean') {
            event.off(listener, option as boolean)
        } else {
            event.off(listener, option as EventListenerOptions)
        }

        if (!event.length) {
            this.events.delete(handler)
        }

        return this;
    }

    removeEventListener(handler: Handler, listener: Listener): this
    removeEventListener(handler: Handler, listener: Listener, useCapture: boolean): this
    removeEventListener(handler: Handler, listener: Listener, option: EventListenerOptions): this
    removeEventListener(handler: Handler, listener: Listener, option?: boolean | EventListenerOptions): this {
        if (option === void 0) {
            return this.off(handler, listener)
        } else if (typeof option === 'boolean') {
            return this.off(handler, listener, option as boolean)
        } else {
            return this.off(handler, listener, option as EventListenerOptions)
        }
    }

    once(handler: Handler, listener: Listener, useCapture?: boolean): this {
        const capture = !!useCapture
        return this.on(handler, listener, { once: true, capture })
    }

    emit(handler: Handler, ...args: any[]): void {
        const event = this.events.get(handler)

        event && event.emit(...args)
        event && !event.length && this.events.delete(handler)
    }

    fire(handler: Handler, ...args: any[]): void {
        this.emit(handler, ...args)
    }
}


