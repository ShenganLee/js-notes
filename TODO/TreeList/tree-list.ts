import { TreeNode } from './tree-node'

import { getRecursionChildren } from './util'

import { NodeDataType, RecursionKeyOrFunctionType } from './types'

export const FilterSymbol = Symbol('filter')
export const ChildrenSymbol = Symbol('children')

export class TreeList<T extends NodeDataType> {

    protected nodes: TreeNode<T>[] = []
    protected readonly recursionKeyOrFunction: RecursionKeyOrFunctionType;
    
    constructor(recursionKeyOrFunction: RecursionKeyOrFunctionType = 'children') {
        this.recursionKeyOrFunction = recursionKeyOrFunction;
    }

    protected generaterTreeNode(
        data: T,
        parent?: TreeNode<T>,
        previous?: TreeNode<T>,
    ): TreeNode<T> {

        const current = TreeNode.generaterTreeNode<T>(data, parent, previous)

        const children = getRecursionChildren<T>(data, this.recursionKeyOrFunction)
        
        children?.length && this.generaterTreeNodes(children, current)

        return current
    }

    protected generaterTreeNodes(
        array: T[],
        parent?: TreeNode<T>
    ): TreeNode<T>[] {
        let previous: TreeNode<T>

        return array.map(data => {
            const current = this.generaterTreeNode(data, parent, previous)
            previous = current
            return current
        })
    }

    get size(): number {
        return Array.from(this).length
    }

    *[Symbol.iterator](): IterableIterator<TreeNode<T>> {
        for (let node of this.nodes) {
            for (let item of node) {
                yield item
            }
        }
    }

    from(iterable: Iterable<T> | ArrayLike<T>): this {
        const array = Array.from(iterable)
        this.nodes = this.generaterTreeNodes(array)

        return this;
    }

    toArray(fn: (data: T, children: T[], node: TreeNode<T>) => T): T[] {
        return this.nodes.map(node => node.format(fn))
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

    filter(fn: (data: T, node: TreeNode<T>) => boolean): TreeList<T> {
        const treeNodeSet = Array.from(this).filter(
            node => fn(node.data, node)
        ).reduce((prev, cur) => {
            prev.add(cur)
            cur.getParents().forEach(node => prev.add(node))
            return prev
        }, new Set())

        const dataSource = this.toArray((data, children, node) => {
            return {
                ...data,
                [FilterSymbol]: treeNodeSet.has(node),
                [ChildrenSymbol]: children.filter(
                    ({ [FilterSymbol]: _ }) => _
                ).map(
                    ({ [FilterSymbol]: _, ...restChild }) => restChild
                )
            }
        }).filter(
            ({ [FilterSymbol]: _ }) => _
        ).map(
            ({ [FilterSymbol]: _, ...restData }) => restData
        )

        return new TreeList(ChildrenSymbol).from(dataSource)
    }
}