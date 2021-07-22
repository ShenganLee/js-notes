/* eslint-disable @typescript-eslint/ban-types */
import { nanoid } from 'nanoid'

type Tick = (...args: any[]) => void

type RunTicks = () => void;
interface TickAndCxt {
    tick: Tick;
    cxt: object;
    args: any[];
}

const tickAndCxtList: TickAndCxt[] = []

const run = () => {
    while(tickAndCxtList.length) {
        const { tick, cxt, args } = tickAndCxtList.shift() as TickAndCxt
        try {
            Reflect.apply(tick, cxt, args)
        } catch (error) {
            console.error(error)
        }
    }
}

const processNextTick = () => process.nextTick(run)
const promiseNextTick = () => Promise.resolve().then(run)
const setTimeoutNextTick = () => setTimeout(run, 0)

let mutationObserverNode: Text;
const mutationObserverNextTick = () => {
    if (!mutationObserverNode) {
        mutationObserverNode = document.createTextNode('')
        const observer = new MutationObserver(run)
        observer.observe(mutationObserverNode, { characterData: true });
    }
    mutationObserverNode.textContent = nanoid()
}

let messageName: string;
const postMessageNextTick = () => {
    if (!messageName) {
        messageName = nanoid()
        const callback = (event: MessageEventInit) => {
            if (event.source === window && event.data === messageName) {
                run()
            }
        }
        window.addEventListener('message', callback)
    }

    window.postMessage(messageName, '*')
}

let runTicks: RunTicks;
const nextTick = (tick: Tick, cxt: object, ...args: any[]): void => {
    tickAndCxtList.push({ tick, cxt, args })

    if (!runTicks) {
        const isBrowser = typeof window !== 'undefined'

        if (isBrowser) { // browser
            if (typeof MutationObserver !== 'undefined') {
                runTicks = mutationObserverNextTick
            } else if (typeof Promise !== 'undefined') {
                runTicks = promiseNextTick
            } else if (typeof postMessage !== 'undefined') {
                runTicks = postMessageNextTick
            } else {
                runTicks = setTimeoutNextTick
            }
        } else { // nodejs
            if (typeof process.nextTick !== 'undefined') {
                runTicks = processNextTick
            } else if (typeof Promise !== 'undefined') {
                runTicks = promiseNextTick
            } else {
                runTicks = setTimeoutNextTick
            }
        }
    }

    runTicks()
}

export default nextTick