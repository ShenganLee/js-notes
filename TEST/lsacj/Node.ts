export type NodeId = string | symbol

export class Node {
    $id: NodeId;
    props: any;

    constructor($id: NodeId, props: any) {
        this.$id = $id
        this.props = props
    }
}