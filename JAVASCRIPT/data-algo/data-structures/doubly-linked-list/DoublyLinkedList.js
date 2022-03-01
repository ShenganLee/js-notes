import DoublyLinkedListNode from "./DoublyLinkedListNode";
import Comparator from '../../utils/Comparator'

export default class DoublyLinkedList {
    constructor(comparatorFunction) {
        this.head = null
        this.tail = null

        this.comparator = new Comparator(comparatorFunction)
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode
        }

        this.head = newNode;

        if (!this.tail) this.tail = newNode

        return this
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value);

        this.tail
            ? (this.tail.next = newNode) && (newNode.previous = this.tail) && (this.tail = newNode)
            : (this.head = newNode) && (this.tail = newNode)
        
        return this
    }

    delete(value) {
        if (!this.tail) return null

        let deleteNode = null
        let currentNode = this.head

        while(currentNode) {
            if (this.comparator.equal(currentNode.value, value)) {
                deleteNode = currentNode

                if (deleteNode === this.head) {
                    this.head = deleteNode.next
                    this.head ? (this.head.previous = null) : (this.tail = null)

                    return deletedNode
                }

                if (deleteNode === this.tail) {
                    this.tail = deleteNode.previous
                    this.tail.next = null

                    return deletedNode
                }
                
                const previous = deleteNode.previous
                const next = deleteNode.next
                
                previous.next = next
                next.previous = previous

                return deletedNode
            }

            currentNode = currentNode.next
        }

        return deleteNode
    }

    find({ value = void 0, callback = void 0 }) {
        if (
            !this.tail
            || (value === void 0 && callback === void 0)
        ) return null

        let currentNode = this.head

        while(currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode
            }

            if (value !== void 0 && this.comparator.equal(currentNode.value, value)) {
                return currentNode
            }

            currentNode = currentNode.next
        }

        return null
    }

    deleteTail() {
        if (!this.tail) return null

        const deletedTail = this.tail

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.tail = deletedTail.previous
            this.tail.next = null
        }

        return deletedTail
    }

    deleteHead() {
        if (!this.head) return null

        const deletedHead = this.head

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else {
            this.head = deletedHead.next
            this.head.previous = null
        }

        return deletedHead
    }

    toArray() {
        const nodes = []

        let currentNode = this.head
        
        while(currentNode) {
            nodes.push(currentNode)

            currentNode = currentNode.next
        }

        return nodes
    }

    fromArray(values) {
        values.forEach(value => this.append(value))

        return this
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString()
    }

    reverse() {
        if (this.head === this.tail) return

        let currentNode = this.head
        let [previousNode, nextNode] = [null, null]

        while(currentNode) {
            nextNode = currentNode.next
            previousNode = currentNode.previous

            currentNode.next = previousNode
            currentNode.previous = nextNode
            
            currentNode = nextNode
        }

        const tailNode = this.tail

        this.tail = this.head;
        this.head = tailNode

        return this
    }
}