// export type Concat<P extends any[], Q extends any[]> = [...P, ...Q]

// export type Result = Concat<[1], [2]>

// 拓展
export type Concat<P, Q> = [
    ...P extends any[] ? P : [P],
    ...Q extends any[] ? Q : [Q]
]

export type Result = Concat<1, [2]>

// export type a = [1,2,3]
// export type b<T> = [...T extends any[] ? T : [T]]

// type c = b<a>