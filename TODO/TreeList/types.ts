export type NodeDataType = Record<string | number | symbol, any>

export type RecursionKeyOrFunctionType = string | symbol | (<T>(t: T) => T[])

export interface TreeNodeConstructor {
    new <T> (
        data: T,
        parent?: TreeNodeInterface<T>,
        previous?: TreeNodeInterface<T>,
        next?: TreeNodeInterface<T>,
        child?: TreeNodeInterface<T>
    ): TreeNodeInterface<T>;
}

export interface TreeNodeInterface<T> extends TreeNodeConstructor {
    data: T;
    readonly deep: number;
    readonly length: number;

    parent?: TreeNodeInterface<T>;
    previous?: TreeNodeInterface<T>;
    next?: TreeNodeInterface<T>;
    child?: TreeNodeInterface<T>;

    [Symbol.iterator](): IterableIterator<TreeNodeInterface<T>>;
}



// export interface BasicTreeList<T> {
//     readonly recursionKeyOrFunction: RecursionKeyOrFunctionType;
//     nodes: Node<T>[];

//     new <T>(recursionKeyOrFunction: RecursionKeyOrFunctionType): BasicTreeList<T>

//     getRecursionChildren(data: T): T[];

//     generaterNode(
//         data: T,
//         parent?: Node<T>,
//         previous?: Node<T>,
//     ): Node<T>;

//     generaterNodes(
//         array: T[],
//         parent?: Node<T>
//     ): Node<T>[]

//     [Symbol.iterator](): IterableIterator<T>;
// }

// export interface TreeList<T extends NodeDataType> extends BasicTreeList<T> {
//     new <T extends NodeDataType>(recursionKeyOrFunction: RecursionKeyOrFunctionType): TreeList<T>;

//     fromArray(array: T[]): this;
// }