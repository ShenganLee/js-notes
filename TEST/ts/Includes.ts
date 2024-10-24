// export type Includes<T extends any[], K> = K extends T[number] ? true : false
// type isPillarMen = Includes<[boolean], false> // true
// // true | fasle 都继承自 boolean 不能精确匹配


export type Equal<X, Y> = (
    <T>() => T extends X ? 1 : 2
) extends (
    <T>() => T extends Y ? 1 : 2
) ? true : false

// type x = <T>() => T extends string | number ? 1 : 2
// type y = <T>() => T extends number | string ? 1 : 2

// let x1: x;
// let x2: y;

// const z1 = x1<string>()
// const z2 = x2<number>()
// type x = Equal<true, boolean>

export type Includes<T extends any[], K> = T extends [infer F, ...infer Rest] ?
    Equal<F, K> extends true ?
        true : Includes<Rest, K>
    : false

export type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`