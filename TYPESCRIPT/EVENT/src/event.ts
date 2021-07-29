export type Type = string | symbol

export type Listener = (...args: any[]) => void

export interface Option {
    capture?: boolean;
    once?: boolean;
}

export interface ListenerOption extends Option {
    target: Listener;
    listener: Listener;
    option: Option;
}

export class Event {
    private event: Map<Type, Array<ListenerOption>>

    private getListenerOptions(type: Type): Array<ListenerOption> {
        let listeners = this.event.get(type)

        if (listeners === undefined) {
            listeners = []
            this.event.set(type, listeners)
        }

        return listeners
    }

    private getOptions(option?: boolean | Option): Option {
        if (typeof option === 'boolean') {
            return { capture: option }
        } else if (option !== void 0) {
            return option
        }
        return {}
    }

    private createListenerOption(type: Type, target: Listener, option: Option): ListenerOption {
        const listener = (...args: any[]) => {
            if (option.capture) {
                Promise.resolve().then(() => {
                    this.run(target, ...args)
                })
            } else {
                setTimeout(() => {
                    this.run(target, ...args)
                }, 0)
            }

            if (option.once) {
                this.off(type, listener, option)
            }
        }

        return {
            target,
            listener,
            option,
        }
    }

    private run(listener: Listener, ...args: any[]) {
        try {
            Reflect.apply(listener, this, args)
        } catch (error) {
            console.error(error)
        }
    }

    constructor() {
        this.event = new Map()
    }

    on(type: Type, listener: Listener): this
    on(type: Type, listener: Listener, useCapture: boolean): this
    on(type: Type, listener: Listener, option: Option): this
    on(type: Type, listener: Listener, option?: boolean | Option): this {
        const listenerOptions = this.getListenerOptions(type)

        const options = this.getOptions(option)

        const listenerOption = this.createListenerOption(type, listener, options)
        listenerOptions.push(listenerOption)

        return this
    }

    addEventListener(type: Type, listener: Listener): this
    addEventListener(type: Type, listener: Listener, useCapture: boolean): this
    addEventListener(type: Type, listener: Listener, option: Option): this
    addEventListener(type: Type, listener: Listener, option?: boolean | Option): this {
        if (option === void 0) {
            return this.on(type, listener)
        } else if (typeof option === 'boolean') {
            return this.on(type, listener, option as boolean)
        }
        return this.on(type, listener, option as Option)
    }

    off(type: Type, listener: Listener): this
    off(type: Type, listener: Listener, useCapture: boolean): this
    off(type: Type, listener: Listener, option: Option): this
    off(type: Type, listener: Listener, option?: boolean | Option): this {
        const listenerOptions = this.getListenerOptions(type)

        const options = this.getOptions(option)

        const index = listenerOptions.findIndex(listenerOption => {
            const { target, option } = listenerOption
            return target === listener && !option.capture === !options.capture && !option.once === !options.once
        })

        if (index > -1) {
            listenerOptions.splice(index, 1)
        }

        return this
    }

    removeEventListener(type: Type, listener: Listener): this
    removeEventListener(type: Type, listener: Listener, useCapture: boolean): this
    removeEventListener(type: Type, listener: Listener, option: Option): this
    removeEventListener(type: Type, listener: Listener, option?: boolean | Option): this {
        if (option === void 0) {
            return this.off(type, listener)
        } else if (typeof option === 'boolean') {
            return this.off(type, listener, option as boolean)
        }
        return this.off(type, listener, option as Option)
    }

    once(type: Type, listener: Listener): this {
        return this.on(type, listener, { once: true })
    }

    emit(type: Type, ...args: any[]): this {
        const listenerOptions = this.getListenerOptions(type)

        listenerOptions.forEach(listenerOption => {
            this.run(listenerOption.listener, ...args)
        })

        return this;
    }

    dispatch(type: Type, ...args: any[]): this {
        return this.emit(type, args)
    }
}