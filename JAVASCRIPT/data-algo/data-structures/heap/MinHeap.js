import Heap from "./Heap";

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.comparator.lessThan(firstElement, secondElement)
    }
}