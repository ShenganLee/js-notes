const queue = []

const next = () => {
    while(queue.length) {
        try {
            queue.shift()()
        } catch (error) {
            console.error(error)
        }
    }
}

// macro-task
// ALL
const sto = (fn) => queue.push(fn) && setTimeout(next);
// Node
const sit = (fn) => queue.push(fn) && setImmediate(next);
// Browser
const raf = (fn) => queue.push(fn) && requestAnimationFrame(next);
const ric = (fn) => queue.push(fn) && requestIdleCallback(next);
const mct = (() => {
    const channel = new MessageChannel();
    channel.port1.onmessage = next

    return (fn) => queue.push(fn) && channel.port2.postMessage(null)
})();

// micro-task
// ALL
const prt = (() => {
    const then = Promise.resolve().then;

    return (fn) => queue.push(fn) && then(next)
})();
// Node
const pnt = (fn) => queue.push(fn) && process.nextTick(next);
// Browser
const mot = (() => {
    const node = document.createTextNode('')
    const observer = new MutationObserver(next)
    observer.observe(node, { characterData: true })

    return (fn) => {
        queue.push(fn)
        node.textContent = node.textContent > '\x00' ? '\x00' : '\x01'
    }
})();

const nextTick = (fn) => {
    
}

// nextTick.sto = sto
// nextTick.sit = sit
// nextTick.raf = raf
// nextTick.ric = ric
// nextTick.mct = mct

// nextTick.prt = prt
// nextTick.pnt = pnt
// nextTick.mot = mot
