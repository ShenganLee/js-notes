import EventTarget from './main'



test('listener', (done) => {
    const listener = (...args: any[]) => {
        try {
            expect(args).toStrictEqual([111, 222, 333]);
            done()
        } catch (error) {
            done(error)
        }
    }

    const eventTarget = new EventTarget()

    eventTarget.on('test', listener)
    eventTarget.emit('test', 111, 222, 333)
});

test('global listener', (done) => {
    const listener = (...args: any[]) => {
        try {
            expect(args).toStrictEqual(['test', 111, 222, 333]);
            done()
        } catch (error) {
            done(error)
        }
    }

    const eventTarget = new EventTarget()

    eventTarget.on(listener)
    eventTarget.emit('test', 111, 222, 333)
});
