import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userNow: any
    constructor(
        private router: Router,
        public userService: UsersService,
        // private rout: Route
        // private window:Window
    ) {

    }

    ngOnInit(): void {
        // let local = localStorage.getItem('currentUser')

        // this.userNow = JSON.parse(local!) ?? null

        // console.log(this.userService.currentUserValue);

    }

    goLogin() {
        this.router.navigate(['/login'])
    }

    goRegister() {
        this.router.navigate(['/register'])
    }
    goHome() {
        this.router.navigate(['/'])
    }

    Logout() {
        localStorage.removeItem('currentUser');
        window.location.reload()
    }
}
