import { NodeId } from './Node'

export class Relation {
    $start: NodeId;
    $end: NodeId;
    $category: string;

    props: any;

    constructor(
        $start: NodeId,
        $end: NodeId,
        $category: string,
    ) {
        this.$start = $start
        this.$end = $end
        this.$category = $category
    }
}