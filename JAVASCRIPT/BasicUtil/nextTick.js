const p = Promise.resolve()

function nextTick(func) {
    return func ? p.then(func) : p
}