
export type arr1 = ['a', 'b', 'c']
export type arr2 = [3, 2, 1]

export type First<T extends any[]> = T[0]

export type head1 = First<arr1> // expected to be 'a'
export type head2 = First<arr2> // expected to be 3

// 拓展
// 空数组返回never
export type First1<T extends any[]> = T extends [] ? never : T[0]

export type First2<T extends any[]> = T['length'] extends 0 ? never : T[0]

export type First3<T extends any[]> = T extends [infer R, ...infer Rest] ? R : never