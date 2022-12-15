export const fn = <T>(ref: T): T => {
    return ref
}

// console.log(fn('a'))
const d = fn({ a: 0, b: 1, c: 2 })

console.log(d.a)