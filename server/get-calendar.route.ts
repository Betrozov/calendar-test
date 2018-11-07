

import { Request, Response } from 'express';
import { EVENTS, ABSENSE_REASONS, PEOPLE_ABSENSES, PERSON_FULL_YEAR_ABSENSES } from './db-data';


export function getAbsenseReasons(req: Request, res: Response): void {

    console.log('Retrieving absense reasons data ...');

    res.status(200).json(Object(ABSENSE_REASONS));

}

export function getPoepleAbsenses(req: Request, res: Response): void {

    console.log('Retrieving people absenses data ...');

    res.status(200).json(Object(PEOPLE_ABSENSES));

}

export function getSinglePersonFullYearAbsenses(req: Request, res: Response): void {

    console.log('Retrieving person full year absenses data ...');

    res.status(200).json(Object(PERSON_FULL_YEAR_ABSENSES));

}

export function getAllEvents(req: Request, res: Response): void {

    console.log('Retrieving events data ...');

    res.status(200).json(Object(EVENTS));

}
