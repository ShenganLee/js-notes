// function fn<T extends object> (x: T): T {
//     return { ...x }
// }

// const p = Promise.resolve<number>(1)



// export type MyAwaited<T> = T extends Promise<infer U> ? U : never

// Promise 嵌套 递归优化
export type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer P> ? (
    P extends Promise<unknown> ? MyAwaited<P> : P
) : never


export type x = Awaited<Promise<number>>
export type y = MyAwaited<Promise<number>>