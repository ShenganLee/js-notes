class TreeNode {
    value;
    previousSibling;
    nextSibling;
    children;

    constructor(value) {
        this.value = value
    }

    
}

class Trees {
    head;
    tail;

    constructor() {

    }

    prepend(value) {
        const head = this.head

        const treeNode = new TreeNode(value)
        this.head = treeNode
        this.head.nextSibling = head

        head?.previousSibling = treeNode

        if (this.tail === void 0) this.tail = treeNode
    }

    append(value) {
        const tail = this.tail

        const treeNode = new TreeNode(value)
        this.tail = treeNode
        this.tail.previousSibling = tail

        tail?.nextSibling = treeNode

        if (this.head === void 0) this.head = treeNode
    }


}