import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

//import { NavigationModule } from './apps/navigation/navigation.module';
//import { NavigationService } from './apps/navigation/navigation.service';

import { YourAppModule } from './apps/your-app/your-app.module';
import { YourAppService } from './apps/your-app/your-app.service';

@NgModule({
    entryComponents: [],
    imports: [
        //NavigationModule.forRoot(),
        YourAppModule,

    ],
    providers      : [
        //NavigationService,

        YourAppService,
    ]
})
export class HokitaModule
{
    constructor(@Optional() @SkipSelf() parentModule: HokitaModule)
    {
        if ( parentModule )
        {
            throw new Error('HokitaModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : HokitaModule,
            providers: [
                /*
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
                */
            ]
        };
    }
}
