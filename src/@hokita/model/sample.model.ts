export class SampleModel {
    id: number;
    attr1: string;
    attr2: string;

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.id = data.id;
        this.attr1 = data.attr1 || 'attr1';
        this.attr2 = data.attr2 || 'attr2';
    }
}
