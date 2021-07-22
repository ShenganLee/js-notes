import nextTick from './main'

test('listener', (done) => {
    const cxt = {}
    function listener(this: any, ...args: any[]) {
        try {
            expect(this).toEqual(cxt)
            expect(args).toStrictEqual([111, 222, 333]);
            done()
        } catch (error) {
            done(error)
        }
    }
    
    nextTick(listener, cxt, 111, 222, 333)
});
