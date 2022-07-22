import { Todo } from './a'

export type TodoPreview = Readonly<Todo>

export type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
}

export type TodoPreview1 = MyReadonly<Todo>

// 拓展
export type Optional<T> = {
    [K in keyof T]?: T[K]
}

export type TodoPreview2 = Optional<Todo>