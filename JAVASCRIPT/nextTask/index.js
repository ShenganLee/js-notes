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

class MessageTask {
    constructor() {
        this.tasks = []
        this.messageName = 'zero-task'
        this.handleMessage = this.handleMessage.bind(this)

        window.addEventListener('message', this.handleMessage, true);
    }

    handleMessage(event) {
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