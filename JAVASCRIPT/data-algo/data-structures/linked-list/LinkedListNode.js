class LinkedListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }

    toString(fn) {
        return typeof fn === 'function' ? fn(this.value) : `${this.value}`
    }
}

export default LinkedListNode
