import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';

@Component({
    selector: 'app-layout-admin',
    templateUrl: './layout-admin.component.html',
    styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {
    constructor(
        private router: Router,
        public userService: UsersService,
    ) {

    }

    ngOnInit(): void {

    }

    goHome() {

    }

    Logout() {
        localStorage.removeItem('currentAdmin');
        window.location.reload();
        // this.router.navigate(['/admin/login']);
    }
}
