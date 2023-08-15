export type Awaited<T> =
    T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
        T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
            F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
                Awaited<V> : // recursively unwrap the value
                never : // the argument to `then` was not callable
        T; // non-object or non-thenable

export interface PromiseLike<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ) : PromiseLike<TResult1 | TResult2>;
}

export type Executor<R> = (resolve: (result: R) => void, reject: (error: any) => void) => void


export type State = 'Pending' | 'Fulfilled' | 'Rejected'

// export interface PPP = 'qqq'

export interface MyPromise<T> extends PromiseLike<T> {

    new (execute: Executor<T>): MyPromise<T>;

    resolve(): MyPromise<void>;

    reject<T = never>(reason?: any): MyPromise<T>;
}

// export class MyPromise