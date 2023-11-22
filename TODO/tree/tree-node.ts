import { Clone } from './clone'

export class TreeNode {
    parent?: TreeNode;
    left?: TreeNode;
    right?: TreeNode;
    child?: TreeNode;

    constructor() {}

    *[Symbol.iterator](): IterableIterator<TreeNode> {

        yield this

        let node = this.child

        while(node) {
            for (let item of node) {
                yield item
            }

            node = node.right
        }
    }

    get leftHeight(): number {
        if (!this.left) return 0

        return this.left.leftHeight + 1
    }

    get rightHeight(): number {
        if (!this.right) return 0

        return this.right.rightHeight + 1
    }

    get size(): number {
        return Array.from(this).length
    }

    get depth(): number {
        if (!this.parent) return 0

        return this.parent.depth + 1
    }

    remove(): void {
        if (!!this.left) this.left.right = this.right

        if (!!this.right) this.right.left = this.left

        if (this.parent?.child === this) this.parent.child = this.right
    }

    insertBefore(node: TreeNode): void {
        if (this === node) throw new Error("The current node cannot be consistent with the target node")
        if (this.hasChildren(node)) throw new Error("The current node cannot be the parent node of the target node")

        this.remove()

        if (!!node.left) {
            node.left.right = this
            this.left = node.left
        }

        node.left = this
        this.right = node
        this.parent = node.parent

        if (node.parent?.child === node) {
            node.parent.child = this
        }

    }

    insertAfter(node: TreeNode): void {
        if (this === node) throw new Error("The current node cannot be consistent with the target node")
        if (this.hasChildren(node)) throw new Error("The current node cannot be the parent node of the target node")

        this.remove()

        if (!!node.right) {
            node.right.left = this
            this.right = node.right
        }

        node.right = this
        this.left = node

        this.parent = node.parent
    }

    append(node: TreeNode): void {
        if (this === node) throw new Error("The current node cannot be consistent with the target node")
        if (this.hasParent(node)) throw new Error("The current node cannot be a child node of the target node")

        if (!this.child) {
            node.remove()
            this.child = node
            node.parent = this
            return
        }

        let lastChild = this.child
        while(lastChild.right) {
            lastChild = lastChild.right
        }

        lastChild.insertAfter(node)
    }

    clone(deep = false): TreeNode {
        const cloneNode = Clone.clone(this)

        if (!deep) return cloneNode

        for (let node of this) {

        }
    }

    hasParent(node: TreeNode): boolean {
        if (!this.parent) return false

        if (this.parent === node) return true

        return this.parent.hasParent(node)
    }

    hasChildren(node: TreeNode): boolean {
        return node.hasParent(this)
    }
}