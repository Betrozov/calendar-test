import { Component, VERSION as angularVersion } from '@angular/core';
import { VERSION as materialVersion, ThemePalette } from '@angular/material';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as german } from './i18n/de';

@Component({
    selector   : 'your-app',
    templateUrl: './your-app.component.html',
    styleUrls  : ['./your-app.component.scss']
})
export class YourAppComponent
{
    color: '' | ThemePalette = 'primary';
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, german);
    }
}
