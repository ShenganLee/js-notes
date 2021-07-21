import { nanoid } from 'nanoid'

type Tick = (...args: any[]) => void

const nextTick = (tick: Tick, ...args: any[]): void => {
    const isBrowser = typeof window === 'undefined'

    if (!isBrowser) {
        if (typeof process.nextTick !== 'undefined') {
            process.nextTick(tick, ...args)
        } else if (typeof Promise !== 'undefined') {
            Promise.resolve().then(() => Reflect.apply(tick, this, args))
        } else {
            setTimeout(tick, 0, ...args)
        }
    } else {
        if (typeof MutationObserver !== 'undefined') {
            const callback = () => tick(...args)
            const node = document.createTextNode('')
            const observer = new MutationObserver(callback)
            observer.observe(node, { characterData: true });
            node.textContent = '0'
        } else if (typeof Promise !== 'undefined') {
            Promise.resolve().then(() => Reflect.apply(tick, this, args))
        } else if (typeof postMessage !== 'undefined') {
            const messageName = nanoid()
            const callback = (event: MessageEventInit) => {
                if (event.source === window && event.data === messageName) {
                    Reflect.apply(tick, this, args)
                    window.removeEventListener('message', callback)
                }
            }
            window.addEventListener('message', callback)
            window.postMessage(messageName, '*')
        } else {
            setTimeout(tick, 0, ...args)
        }
    }
}

export default nextTick