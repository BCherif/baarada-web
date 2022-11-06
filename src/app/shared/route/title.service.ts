import {Injectable} from '@angular/core';

import {filter, map} from 'rxjs/operators';

import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';

const APP_TITLE = 'BAARADA';
const SEPARATOR = ' > ';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    public _titleSub = new BehaviorSubject('BAARADA');
    public _iconSub = new BehaviorSubject('icon-home');

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
    ) {
    }

    static ucFirst(text: string) {
        if (!text) {
            return text;
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    init() {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            map((route) => route.snapshot),
            map((snapshot) => {
                if (snapshot.data.title) {

                    let icon = 'icon-home|';
                    if (snapshot.data.icon) {
                        icon = snapshot.data.icon + '|';
                    }

                    if (snapshot.paramMap.get('id') !== null) {
                        return snapshot.data.title + SEPARATOR + snapshot.paramMap.get('id');
                    }

                    return icon + snapshot.data.title;

                } else {
                    // If not, we do a little magic on the url to create an approximation
                    return this.router.url.split('/').reduce((acc, frag) => {
                        if (acc && frag) {
                            acc += SEPARATOR;
                        }
                        return acc + TitleService.ucFirst(frag);
                    });
                }
            }))
            .subscribe((pathString) => {
                // console.log(pathString);
                this._iconSub.next(pathString.split('|')[0]);
                this._titleSub.next(pathString.split('|')[1]);
                this.titleService.setTitle(`${APP_TITLE} | ${pathString.split('|')[1]}`);
            });
    }
}
