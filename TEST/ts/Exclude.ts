import { Todo } from './a'

export type Todo1 = Pick<Todo, 'title' | 'description'>

// type a = Todo1 extends Todo ? true : false

export type Exclude<T, U> = T extends U ? never : T

export type Exclude1<T, U> = T extends U ? never : T

export type Todo2 = Exclude<Todo1, Todo>

export type Todo3 = Exclude<'title' | 'description', Todo>

type C = Exclude<'a' | 'b', 'a' | 'c'> // 'b'