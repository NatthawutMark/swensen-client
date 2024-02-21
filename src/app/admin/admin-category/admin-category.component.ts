import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';

@Component({
    selector: 'app-admin-category',
    templateUrl: './admin-category.component.html',
    styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

    listCategory: any = [];
    constructor(
        private usersService: UsersService,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        if (this.usersService.currentAdminValue == null) {
            this.router.navigate(['/admin/login']);
            return;
        }
    }

    remove(element: any) {

    }

    add() {

    }
    
    back() {
        this.router.navigate(['admin/home'])
    }
}
