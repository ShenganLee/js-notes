export type NodeDataType = Record<string | number | symbol, any>

export type RecursionKeyOrFunctionType = string | number | symbol | (<T>(data: T) => T[])

export const ChildrenSymbol = Symbol('children')

export class TreeNode<T extends NodeDataType> {
    data: T;
    parent?: TreeNode<T>;
    previous?: TreeNode<T>;
    next?: TreeNode<T>;
    child?: TreeNode<T>;

    static generaterTreeNode<T extends NodeDataType>(
        data: T,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
    ): TreeNode<T> {
        const current = new TreeNode<T>(data, parent, previous)

        if (parent && !previous) parent.child = current
        if (previous) previous.next = current

        return current
    }

    constructor(
        data: T,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
        next?: TreeNode<T>,
        child?: TreeNode<T>
    ) {
        this.data = data
        this.parent = parent;
        this.previous = previous;
        this.next = next;
        this.child = child;
    }

    get size(): number {
        return Array.from(this).length
    }

    get index(): number {
        let index = 0
        let current = this.previous

        while(current) {
            index ++
            current = current.previous
        }

        return index
    }

    get deep(): number {
        let index = 0
        let current = this?.parent

        while(current) {
            index ++
            current = current?.parent
        }

        return index
    }

    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {
        yield this

        let child = this.child
        while(child) {
            for (let item of child) {
                yield item
            }
            child = child.next
        }
    }

    toObject(fn: (data: T, children: T[], node: TreeNode<T>) => T): T {
        
        const children = []

        let node = this.child

        while(node) {
            children.push(node.toObject(fn))
            node = node?.next
        }

        return fn(this.data, children, this)
    }
}

class BasicTreeList<T extends NodeDataType> {
    protected readonly recursionKeyOrFunction: RecursionKeyOrFunctionType;
    protected nodes: TreeNode<T>[] = []

    constructor(recursionKeyOrFunction: RecursionKeyOrFunctionType = 'children') {
        this.recursionKeyOrFunction = recursionKeyOrFunction;
    }

    protected getRecursionChildren(data: T): T[] {
        return typeof this.recursionKeyOrFunction === 'function' ?
            this.recursionKeyOrFunction(data) :
            data[this.recursionKeyOrFunction]
    }

    protected generaterNode(
        data: T,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
    ): TreeNode<T> {
        const current = new TreeNode<T>(data, parent, previous)

        if (parent && !previous) parent.child = current
        if (previous) previous.next = current

        const children = this.getRecursionChildren(data)
        
        children?.length && this.generaterNodes(children, current)

        return current
    }

    protected generaterNodes(
        array: T[],
        parent?: TreeNode<T>
    ): TreeNode<T>[] {
        let previous: TreeNode<T>

        return array.map(data => {
            const current = this.generaterNode(data, parent, previous)
            previous = current
            return current
        })
    }

    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {
        for (let node of this.nodes) {
            for (let item of node) {
                yield item
            }
        }
    }
}

export class TreeList<T extends NodeDataType> extends BasicTreeList<T> {

    constructor(recursionKeyOrFunction: RecursionKeyOrFunctionType) {
        super(recursionKeyOrFunction)
    }

    clone() {

    }

    from(iterable: Iterable<T> | ArrayLike<T>): this {
        const array = Array.from(iterable)
        this.nodes = this.generaterNodes(array)

        return this;
    }

    toArray(fn: (data: T, children: T[], node: TreeNode<T>) => T): T[] {
        return this.nodes.map(node => node.toObject(fn))
    }

    map(fn: (data: T, node: TreeNode<T>) => T): TreeList<T> {
        const dataSource = this.toArray(
            (data, children, node) => ({
                ...fn(data, node),
                [ChildrenSymbol]: children
            })
        )

        return new TreeList(ChildrenSymbol).from(dataSource)
    }

    // filter(fn: (data: T, node: TreeNode<T>) => boolean): TreeList<T> {
    //     // const 
    // }
}
