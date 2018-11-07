import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatIconRegistry } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

//import { AuthModule } from '@modulware/app/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from '@modulware/app/reducers';
import { CustomSerializer, tokenGetter } from '@modulware/app/shared/utils';

//import { JwtModule } from '@auth0/angular-jwt';
import { HokitaModule } from '@hokita/hokita.module';


const appRoutes: Routes = [
    {
        path        : 'sample',
        loadChildren: 'app/main/sample/sample.module#SampleModule'
    },
    {
        path        : 'your-app',
        loadChildren: '@hokita/apps/your-app/your-app.module#YourAppModule'
    },
    {    
        path      : '**',
        redirectTo: '/sample'
    }
];


@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,

        HokitaModule.forRoot('root'),

        /*
        AuthModule.forRoot(),
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:4200'],
              blacklistedRoutes: []
            }
          }),
        */
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'})

    ],
    providers: [
      { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
        // matIconRegistry.addSvgIconInNamespace('extra', 'thumb_up', domSanitizer.bypassSecurityTrustResourceUrl('https://chan4077.github.io/res/thumbup_icon.svg'));
        
    }
}
