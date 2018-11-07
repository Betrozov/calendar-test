import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { YourAppComponent } from './your-app.component';
import { YourAppService } from './your-app.service';


const routes = [
    {
        path     : 'your-app',
        component: YourAppComponent,
        resolve  : {
            chat: YourAppService
        }
    }
];

@NgModule({
    declarations: [
        YourAppComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,

        CdkTableModule,
        MatButtonModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule, 
        MatIconModule, 
        MatInputModule, 
        MatPaginatorModule, 
        MatRippleModule, 
        MatSelectModule, 
        MatSnackBarModule, 
        MatSortModule, 
        MatTableModule, 
        MatTabsModule,
        MatToolbarModule,
    ],
    entryComponents: [
        //YourAppFormDialogComponent,
    ],
    providers      : [
        YourAppService,
    ],
    exports     : [
        YourAppComponent,
        //YourAppFormDialogComponent,
    ]
})

export class YourAppModule
{
}
