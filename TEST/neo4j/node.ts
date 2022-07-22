class Nnode {
    data: any;
    _id: string;
    

    constructor(data: any, _id?: string) {
        this.data = data;
        this._id = _id || ''
    }
}