import { Todo } from './a'

export type TodoPreview = Pick<Todo, 'title' | 'completed'>

export const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

export type MyPick<T, K extends keyof T> = { [P in K]: T[P] }

export type MyTodoPreview = MyPick<Todo, 'title' | 'completed'>

// 拓展
export type MyPick1<T, K extends keyof T = keyof T> = { [P in K]: T[P] }
export type MyTodoPreview10 = MyPick1<Todo>
export type MyTodoPreview11 = MyPick1<Todo, 'title' | 'completed'>
