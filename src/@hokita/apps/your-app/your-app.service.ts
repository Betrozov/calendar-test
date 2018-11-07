import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class YourAppService {

    arData: any[] = [];
    onArDataChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
      // Set the defaults
      this.onArDataChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getArData()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get array of data
     *
     * @returns {Promise<any>}
     */
    getArData(): Promise<any>
    {
        console.log('getArData');
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/data')
                .subscribe((response: any) => {
                    this.arData = response;
                    this.onArDataChanged.next(this.arData);
                    resolve(response);
                }, reject);
        });
    }

}
