import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

// HOKITA
//import { JwtToken } from '@modulware/app/model/jwtToken.model';
//import { tap } from 'rxjs/operators';
//import { noop } from 'rxjs';
//import { AuthService } from '@modulware/app/auth/auth.service';
//import { JwtHelperService } from '@auth0/angular-jwt';
//import { Router } from '@angular/router';
//import { Store } from '@ngrx/store';
//import { AppState } from '@modulware/app/reducers';
//import { Login } from '@modulware/app/auth/auth.actions';

@Component({
    selector   : 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class Login2Component implements OnInit, OnDestroy
{
    loginForm: FormGroup;
    loginFormErrors: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        // HOKITA
        //private auth: AuthService,
        //private router: Router,
        //private store: Store<AppState>,
        //private jwtHelperService: JwtHelperService
    )
    {

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar : {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer : {
                    hidden: true
                }
            }
        };

        // Set the defaults
        this.loginFormErrors = {
            email   : {},
            password: {}
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onLoginFormValuesChanged();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On form values changed
     */
    onLoginFormValuesChanged(): void
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    // HOKITA
    login() {

        const val = this.loginForm.value;
    
        /*
        this.auth.login(val.email, val.password)
        .pipe(
          tap(jwtAuthenticationResponse => {
            console.log('jwtAuthenticationResponse');
            console.log(jwtAuthenticationResponse);
            const decodedToken = this.jwtHelperService.decodeToken(jwtAuthenticationResponse.token) as JwtToken;
            console.log('decodedToken:' + decodedToken);
            this.store.dispatch(new Login({jwtAuthenticationResponse, 'user': decodedToken.ud}));
            //this.router.navigateByUrl('/home');
          })
        )
        .subscribe(
          noop,
          () => alert('Login Failed')
        );
        */
    }
}
