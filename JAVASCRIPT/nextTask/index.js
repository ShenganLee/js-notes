// 宏任务
class TimeoutTask {
    constructor() {
        this.tasks = []
    }

    next(fn) {
        this.tasks.push(fn)

        this.handleNext()
    }

    handleNext() {
        setTimeout(() => {
            while(this.tasks.length) {
                const fn = this.tasks.shift();
                fn();
            }
        }, 0)
    }
}

// 宏任务
class MessageTask {
    constructor() {
        this.tasks = []
        this.messageName = {}
        this.handleMessage = this.handleMessage.bind(this)

        window.addEventListener('message', this.handleMessage, true);
    }

    handleMessage(event) {
        console.log(event.data)
        if (event.source === window && event.data === this.messageName) {
            while(this.tasks.length) {
                const fn = this.tasks.shift();
                fn();
            }
        }
    }

    handleNext() {
        window.postMessage(this.messageName, '*');
    }

    next(fn) {
        this.tasks.push(fn)

        this.handleNext()
    }

    close() {
        window.removeEventListener('message', this.handleMessage, true);
    }
}

// 微任务
class MutationTask {
    constructor() {
        this.tasks = []

        this.handleCallback = this.handleCallback.bind(this)

        this.node = document.createTextNode('0')
        this.observer = new MutationObserver(this.handleCallback)

        this.observer.observe(this.node, { characterData: true });
    }

    handleCallback() {
        while(this.tasks.length) {
            const fn = this.tasks.shift();
            fn();
        }
    }

    handleNext() {
        const bool = !Number(this.node.textContent)
        this.node.textContent = Number(bool)
    }

    next(fn) {
        this.tasks.push(fn)

        this.handleNext()
    }

    close() {
        this.observer.disconnect()
    }
}

// 微任务
class PromiseTask {
    constructor() {
        this.tasks = []
    }

    next(fn) {
        this.tasks.push(fn)

        this.handleNext()
    }

    handleNext() {
        Promise.resolve().then(() => {
            while(this.tasks.length) {
                const fn = this.tasks.shift();
                fn();
            }
        })
    }
}

// 宏任务
class RequestIdTask {
    constructor() {
        this.tasks = []
    }

    next(fn) {
        this.tasks.push(fn)

        this.handleNext()
    }

    handleNext() {
        requestIdleCallback(() => {
            while(this.tasks.length) {
                const fn = this.tasks.shift();
                fn();
            }
        })
    }
}