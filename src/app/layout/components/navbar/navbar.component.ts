import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy
{
    // Layout
    @Input()
    layout;

    fusePerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,

        private activatedRoute: ActivatedRoute,
    )
    {
        // Set the defaults
        this.layout = 'vertical';

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // ModulWare: Subscribe to router events to save menu to localstore
        /*
        _router.events.pipe(
            .filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
                console.log('Navigated to : ' + event.url);
                if (event.url === '/auth/login' || event.url === '/logout') {
                    localStorage.removeItem('selectedMenuId');
                    localStorage.removeItem('selectedViewId');
                } else {
                    console.log(this.activatedRoute.root);
                    //const menuItem = _fuseNavigationService.getNavigationItemParent(event.url);
                    //if (menuItem ) localStorage.setItem('selectedMenuId', menuItem.id);
                }
                console.log(event);
            }
        );
        */
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective)
    set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        this._fuseNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._fusePerfectScrollbar.update();
                }, 310);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event) => {
                    if ( this._fuseSidebarService.getSidebar('navbar') )
                    {
                        this._fuseSidebarService.getSidebar('navbar').close();
                    }
                }
            );


        // ModulWare: Save current menu to localStorage
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            ).subscribe(event => {
                const e = event as NavigationEnd;
                if ( e.url === '/auth/login' || e.url === '/logout' ) {
                    localStorage.removeItem('selectedMenuId');
                    localStorage.removeItem('selectedViewId');
                } else {
                    const menuItem = this._fuseNavigationService.getNavigationItem(e.url);
                    if ( menuItem ) { localStorage.setItem('selectedMenuId', menuItem.id); }
                }
            });


        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(filter(value => value !== null))
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.fusePerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
