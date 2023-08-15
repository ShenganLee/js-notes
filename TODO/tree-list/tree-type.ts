export interface TreeNodeCls<T> {
    $fruit: T;
    $prev?: TreeNodeCls<T>;
    $next?: TreeNodeCls<T>;
    $parent?: TreeNodeCls<T>;
    $child?: TreeNodeCls<T>;

    [Symbol.iterator](): IterableIterator<TreeNodeCls<T>>;

    remove(): void;
    append(treeNode: TreeNodeCls<T>): this;

    forEach(fn: (node: TreeNodeCls<T>, target: this) => void): void;
    some(fn: (node: TreeNodeCls<T>, target: this) => boolean): boolean;
    every(fn: (node: TreeNodeCls<T>, target: this) => boolean): boolean;

    hasChild(child: TreeNodeCls<T>): boolean;

};

export interface TreeListCls<T> {
    $first?: TreeNodeCls<T>;
    $last?: TreeNodeCls<T>;

    asTree<T>(arr: T[]): TreeListCls<T>;
}



