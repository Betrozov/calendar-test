import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AppState } from '@modulware/app/reducers';
import { Store } from '@ngrx/store';
import { locale as german } from './i18n/de';
import { locale as english } from './i18n/en';
import { SampleModel } from '@hokita/model/sample.model';


@Component({
    selector   : 'your-app',
    templateUrl: './your-app.component.html',
    styleUrls  : ['./your-app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class YourAppComponent implements OnInit
{
    color: '' | ThemePalette = 'primary';
    sampleData: SampleModel[] = [];

    /**
     * Constructor
     *
     * @param { FuseTranslationLoaderService } _fuseTranslationLoaderService
     * @param { Store } _store
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _store: Store<AppState>
    ) 
    {
        this._fuseTranslationLoaderService.loadTranslations(english, german);
    }

    ngOnInit(): void {
        /* ngrx only if it was requested and is part of your task */
        /*
        this.selectedView$ = this._store.pipe(select(selectViewById(parseInt(localStorage.getItem('selectedViewId'), 10))));
        this.selectedView$.subscribe(
            selectedView => { 
                console.log(selectedView);
                if (selectedView) { this.viewType = selectedView.applicationRoot; };
            }
        );
        */
    }
}
