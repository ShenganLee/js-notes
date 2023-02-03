export class TreeNode<T> {
    data: T;
    parent?: TreeNode<T>;
    previous?: TreeNode<T>;
    next?: TreeNode<T>;
    child?: TreeNode<T>;

    static generaterTreeNode<T>(
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
        let current = this.parent

        while(current) {
            index ++
            current = current.parent
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

    remove() {
        if (this.previous) this.previous.next = this.next
        if (this.next) this.next.previous = this.previous
        if (this.parent?.child === this) this.parent.child = this.next

        this.parent = void 0
        this.previous = void 0
        this.next = void 0
    }

    hasParent(node: TreeNode<T>): boolean {
        let current = this.parent

        while(current) {
            if (node === current) return true

            current = current.parent
        }

        return false
    }

    hasChild(node: TreeNode<T>): boolean {
        return node.hasParent(this)
    }

    getParents(deep?: number): TreeNode<T>[] {
        const parents = []

        let current = this.parent

        while(current) {
            if (
                typeof deep === 'number' &&
                (this.deep - current.deep) > deep
            ) return parents

            parents.unshift(current)

            current = current.parent
        }

        return parents
    }

    getChildren(deep?: number): TreeNode<T>[] {
        const children = []

        for (let node of this) {
            if (node === this) continue

            if (
                typeof deep === 'number' &&
                (node.deep - this.deep) > deep
            ) continue

            children.push(node)
        }

        return children
    }

    format(fn: (data: T, children: T[], node: TreeNode<T>) => T): T {
        
        const children = []

        let node = this.child

        while(node) {
            children.push(node.format(fn))
            node = node.next
        }

        return fn(this.data, children, this)
    }

    toString(): string {
        return JSON.stringify(
            this.format((data, children) => ({ ...data, children })),
            null,
            4
        )
    }
}
