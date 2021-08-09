
class TreeNode {
    private parent: TreeNode
    private children: TreeNode[]
    private prev: TreeNode
    private next: TreeNode
    private data: any


}
class TreeMap {
    private memorizedDataSource: any[]
    private memorizedChildren: (treeNode: any) => any[]

    private treeNode: TreeNode[]

    private initTreeNode(): TreeNode[] {
        
    }

    constructor(dataSource: any[], children: (treeNode: any) => any[]) {
        this.memorizedDataSource = dataSource
        this.memorizedChildren = children
    }
}