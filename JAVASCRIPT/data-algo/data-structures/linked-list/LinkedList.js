import Comparator from '../../utils/Comparator'
import LinkedListNode from './LinkedListNode'

class LinkedList {
    constructor(compareFunction) {
        // 头部
        this.head = null
        // 尾部
        this.tail = null

        this.compare = new Comparator(compareFunction)
    }

    // 向头部添加新节点
    prepend(value) {
        const node = new LinkedListNode(value, this.head)

        this.head = node

        if (!this.tail) this.tail = node

        return this
    }

    // 向尾部添加新节点
    append(value) {
        const node = new LinkedListNode(value, null)

        this.tail ? 
            (this.tail.next = node) && (this.tail = node) : 
            (this.head = node) && (this.tail = node)
        
        return this
    }

    // 删除
    delete(value) {
        if (!this.head) return null

        let last = null
        let current = this.head

        while(current) {
            if (this.compare.equal(value, current.value)) {
                if (current === this.head) {
                    this.head === this.tail ?
                        (this.head = null) || (this.tail = null) :
                        (this.head = this.head.next)
                } else if (current === this.tail) {
                    this.tail = last
                    this.tail.next = null
                } else {
                    last.next = current.next
                }

                return current
            }

            last = current
            current = current.next
        }

        return null
    }

    // 查询
    find({ value, callback: fn }) {
        if (!this.head) return null

        let current = this.head

        while(current) {
            if (
                (typeof fn === 'function' && fn(current.value)) ||
                (value !== void 0 && this.compare.equal(value, current.value))
            ) return current
            
            current = current.next
        }

        return null
    }

    //删除头部
    deleteHead() {
        const node = this.head

        if (this.head === this.tail) {
            this.head = null
            this.tail = null

            return node
        }

        this.head = node.next

        return node
    }

    // 删除尾部
    deleteTail() {
        const node = this.tail

        if (this.head === this.tail) {
            this.head = null
            this.tail = null

            return node
        }

        let current = this.head
        while(current.next) {
            if (node === current.next) {
                this.tail = current.next
                this.tail.next = null

                return node
            }

            current = current.next
        }

        return node
    }

    // 数组转换到链表
    fromArray(values) {
        values.forEach(value => {
            this.append(value)
        })

        return this
    }

    // 链表转换到数组
    toArray() {
        const nodes = []

        const current = this.head

        while(current) {
            nodes.push(current)
            current = current.next
        }

        return nodes
    }

    // 反转链表
    reverse() {
        if (!this.head || this.head === this.tail) return this

        let [current, prev, next] = [this.head, null, null]

        while(current) {
            next = current.next

            current.next = prev

            prev = current
            current = next
        }

        this.tail = this.head
        this.head = prev

        return this
    }

    // 转换为字符串
    toString(fn) {
        return Array.prototype.toString.apply(this.toArray().map(node => node.toString(fn)))
    }
}

export default LinkedList
