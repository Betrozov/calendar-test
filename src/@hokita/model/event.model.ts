import { AbsenseReason } from './absenseReason.model';

export class Event {
    id: number;
    dateFrom: Date;
    dateUntil: Date;
    reason: AbsenseReason;

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.id = data.id;
        this.dateFrom = new Date(data.dateFrom) || new Date();
    }
}
