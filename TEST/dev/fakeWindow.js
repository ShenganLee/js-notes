window.getFakeWindow = function() {
    const fakeWindow = new Proxy(Object.create(null), {
        get: function(target, p) {
            if (Reflect.has(target, p)) return Reflect.get(target, p)

            return Reflect.get(window, p)
        },
        set: function(target, p, newValue) {
            Reflect.set(target, p, newValue)
            return true
        }
    })

    return fakeWindow
}

const executableScript = `
    ;(function(){
        const fakeWindow = window.getFakeWindow();
        (function(window, self, globalThis){
            ;${scriptText}
        }).bind(fakeWindow)(fakeWindow, fakeWindow, fakeWindow)
    })();
`

eval.call(window, executableScript)

