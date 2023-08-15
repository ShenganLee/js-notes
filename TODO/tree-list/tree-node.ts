export class TreeNode<T> {
    $fruit: T;
    $prev?: TreeNode<T>;
    $next?: TreeNode<T>;
    $parent?: TreeNode<T>;
    $child?: TreeNode<T>;

    constructor(
        fruit: T,
    ) {
        this.$fruit = fruit
    }

    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {

        yield this

        let node = this.$child
        while(node) {
            for (let item of node) {
                yield item
            }
            node = node.$next
        }
    }

    get index(): number {

        let index = 0
        let node = this.$prev

        while(node) {
            index ++
            node = node.$prev
        }

        return index
    }

    get depth(): number {

        let depth = 0
        let node = this.$parent

        while(node) {
            depth ++
            node = node.$parent
        }

        return depth
    }

    get parents(): TreeNode<T>[] {

        const parents = []

        let node = this.$parent

        while(node) {
            parents.push(node)

            node = node.$parent
        }

        return parents.reverse()
    }

    get firstChild(): void | TreeNode<T> {
        return this.$child
    }

    get lastChild(): void | TreeNode<T> {

        let node = this.$child

        if (node?.$next) node = node.$next

        return node
    }

    remove(): void {

        const { $parent, $prev, $next } = this

        if ($prev) $prev.$next = $next
        if ($next) $next.$prev = $prev
        if ($parent && $parent.firstChild === this) $parent.$child = $next

        this.$parent = void 0;
        this.$prev = void 0;
        this.$next = void 0;
    }

    clone(deep = true): TreeNode<T> {

        const cloneNode = new TreeNode<T>(window.structuredClone(this.$fruit))

        if (!deep) return cloneNode

        const memoMap = new WeakMap<TreeNode<T>, TreeNode<T>>()

        this.forEach(node => {
            if (node === this) {
                memoMap.set(node, cloneNode)
                return
            }

            const newNode = new TreeNode<T>(window.structuredClone(this.$fruit))
            memoMap.set(node, newNode)

            const parentNode = node.$parent && memoMap.get(node.$parent)

            parentNode?.append(parentNode)
        })

        return cloneNode
    }

    append(node: TreeNode<T>): this {

        if (node === this) throw new Error("can not append self node")

        if (this.hasParent(node)) throw new Error("can not append parent node")

        node.remove()

        node.$parent = this

        const { firstChild, lastChild } = this

        if (!firstChild) {
            this.$child = node
        } else if (!!lastChild) {
            lastChild.$next = node
            node.$prev = lastChild
        }

        return this
    }

    insertBefore(selector: TreeNode<T>): void {

        if (selector === this) throw new Error("can not insertBefore self node")

        if (this.hasChild(selector)) throw new Error('can not insertBefore parent node')

        if (this.$next === selector) return

        this.remove()

        const parent = selector.$parent

        this.$parent = parent

        if (parent && parent.firstChild === selector) {
            // first node
            parent.$child = this
        } else if (selector.$prev) {
            // not first node
            selector.$prev.$next = this
            this.$prev = selector.$prev
        }

        this.$next = selector
        selector.$prev = this
    }

    insertAfter(selector: TreeNode<T>): void {

        if (selector === this) throw new Error("can not insertAfter self node")

        if (this.hasChild(selector)) throw new Error('can not insertAfter parent node')

        if (this.$prev === selector) return

        this.remove()

        this.$parent = selector.$parent

        if (selector.$next) {
            selector.$next.$prev = this
            this.$next = selector.$next
        }

        selector.$next = this
        this.$prev = selector
    }

    forEach(fn: (node: TreeNode<T>, target: this) => void): void {
        for (let node of this) {
            fn(node, this)
        }
    }

    some(fn: (node: TreeNode<T>, target: this) => boolean): boolean {
        for (let node of this) {
            const flag = fn(node, this)
            if (flag) return true
        }

        return false
    }

    every(fn: (node: TreeNode<T>, target: this) => boolean): boolean {
        for (let node of this) {
            const flag = fn(node, this)
            if (!flag) return false
        }

        return false
    }

    hasChild(child: TreeNode<T>): boolean {

        if (this.$parent === child.$parent) return false

        let node = child.$parent
        while(node) {
            if (node === this) return true;
            node = node.$parent
        }

        return false
    }

    hasParent(parent: TreeNode<T>): boolean {
        return parent.hasChild(this)
    }
}