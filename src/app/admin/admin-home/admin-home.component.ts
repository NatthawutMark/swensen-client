import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

    listMenu = [
        {
            id: 1,
            name: 'จัดการประเภท',
            url: '/admin/category'
        },
        {
            id: 2,
            name: 'จัดการสินค้า',
            url: '/admin/product'
        },
        // {
        //     id:3,
        //     name:'จัดการประเภท',
        //     url:'/admin/category'
        // },
        // {
        //     id:4,
        //     name:'จัดการประเภท',
        //     url:'/admin/category'
        // },
    ]
    constructor(
        private router: Router,
        private usersService: UsersService,
    ) {

    }

    ngOnInit(): void {
        if (this.usersService.currentAdminValue == null) {
            this.router.navigate(['/admin/login']);
            return;
        }

    }

    goto(element: any) {
        this.router.navigate([element.url])
    }
}
