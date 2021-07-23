import nextTick from '../src/main'

const cxt = {i: 0}
const args = [0, 0, 0, 0]

test('listener', (done) => {
    function listener(this: any, ...args: any[]) {
        try {
            if (this.i > 4) {
                expect(this).toStrictEqual(cxt)
                expect(args).toStrictEqual([4, 5, 6, 7]);
            } else {
                expect(this).toStrictEqual(cxt)
                expect(args).toStrictEqual([0, 1, 2, 3]);
            }

            done()
        } catch (error) {
            done(error)
        }
    }

    

    
    nextTick(listener, cxt, ...args.map(a => a + (cxt.i++)))
});

test('listener1', (done) => {
    function listener(this: any, ...args: any[]) {
        try {
            if (this.i > 4) {
                expect(this).toStrictEqual(cxt)
                expect(args).toStrictEqual([4, 5, 6, 7]);
            } else {
                expect(this).toStrictEqual(cxt)
                expect(args).toStrictEqual([0, 1, 2, 3]);
            }

            done()
        } catch (error) {
            done(error)
        }
    }

    

    
    nextTick(listener, cxt, ...args.map(a => a + (cxt.i++)))
});
