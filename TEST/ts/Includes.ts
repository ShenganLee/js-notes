// export type Includes<T extends any[], K> = K extends T[number] ? true : false
// type isPillarMen = Includes<[boolean], false> // true
// // true | fasle 都继承自 boolean 不能精确匹配


export type Equal<X, Y> = (
    <T>() => T extends X ? 1 : 2
) extends (
    <T>() => T extends Y ? 1 : 2
) ? true : false

// type x = Equal<true, boolean>

export type Includes<T extends any[], K> = T extends [infer F, ...infer Rest] ?
    Equal<F, K> extends true ?
        true : Includes<Rest, K>
    : false

export type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`