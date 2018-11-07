export class AbsenseReason {
    id: number;
    name: String;

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.id = data.id || 0;
        this.name = data.name || '';
    }
}
