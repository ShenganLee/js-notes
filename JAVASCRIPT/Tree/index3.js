class TreeNode {
    constructor() {

    }
}

class TreeList {
    constructor({
        parent,
    }) {
        this.first = null
        this.last = null

        this.size = 0
    }

    add(node, beforeNode, afterNode) {
        if (!node instanceof TreeNode) return

        if (!this.size) {
            this.first = node
            this.last = node
        } else if (beforeNode instanceof TreeNode) {

        } else if (afterNode instanceof TreeNode) {

        } else {
            
        }

        this.size ++
    }

    remove(node, beforeNode, afterNode) {
        if (!node instanceof TreeNode) return
    }
}