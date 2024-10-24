
export class Events {
    events = new Map<string, Function[]>();
    constructor() {}

    on(key: string, fn: Function) {
        if (!this.events.has(key)) {
            this.events.set(key, []);
        }
        this.events.get(key)!.push(fn);
    }

    off(key: string, fn: Function) {
        if (!this.events.has(key)) {
            return;
        }
        const events = this.events.get(key)
        const index = events!.indexOf(fn);
        if (index > -1) events!.splice(index, 1);

        if (!events!.length) this.events.delete(key);
    }

    keys(): string[] {
        return Array.from(this.events.keys());
    }

    emit(key: string, ...args: any[]) {
        this.events.get(key)?.forEach(fn => {
            try {
                fn(...args)
            } catch (error) {
                console.error(error)
            }
        });
    }

    clear(key?: string) {
        if (typeof key === 'string') return void this.events.delete(key);

        this.events.clear();
    }
}