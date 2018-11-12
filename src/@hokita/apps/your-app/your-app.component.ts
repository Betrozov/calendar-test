import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material';
import * as moment from 'moment';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as german } from './i18n/de';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'your-app',
    templateUrl: './your-app.component.html',
    styleUrls: ['./your-app.component.scss']
})
export class YourAppComponent implements OnInit {
    color: '' | ThemePalette = 'primary';
    baseCalendar: { day: number }[] = [];
    employees: {
        name: string;
        events: {
            dateFrom: string;
            dateUntil: string;
            allDay: boolean;
            reason: string;
        }[]
    }[];
    publicEvents: {
        name: string;
        dateFrom: string;
        dateUntil: string;
        allDay: boolean;
        reason: string;
    }[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient,
                private _fuseTranslationLoaderService: FuseTranslationLoaderService) {
        this._fuseTranslationLoaderService.loadTranslations(english, german);
        for (let i = 0; i <= 30; i++) {
            this.baseCalendar.push({day: i + 1});
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        combineLatest(
            this.http.get('/api/calendar/people-absenses'),
            this.http.get('/api/calendar/events'),
            (peopleAbsences, calendarEvents) => {
                return {
                    peopleAbsences,
                    calendarEvents
                };
            }
        ).subscribe(({peopleAbsences, calendarEvents}: { peopleAbsences: any; calendarEvents: any; }) => {
            this.employees = peopleAbsences.data.employees;
            this.publicEvents = peopleAbsences.data.publicEvents;
            console.log(111111111111, peopleAbsences);
            console.log(222222222222, calendarEvents);
        });

        console.log('baseCalendar', this.baseCalendar);
    }
}
