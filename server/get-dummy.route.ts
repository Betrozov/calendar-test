

import { Request, Response } from 'express';
import { DUMMY } from './db-data';


export function getDummyData(req: Request, res: Response): void {

    console.log('Retrieving dummy data ...');

    res.status(200).json(Object(DUMMY));

}
