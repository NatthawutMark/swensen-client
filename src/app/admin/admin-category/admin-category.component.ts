import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';
import { AdminCategoryAddComponent } from '../admin-category-add/admin-category-add.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/_service/category.service';
import Swal from 'sweetalert2';

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
        private dialog: MatDialog,
        private categoryService: CategoryService,
    ) {

    }

    ngOnInit(): void {
        if (this.usersService.currentAdminValue == null) {
            this.router.navigate(['/admin/login']);
            return;
        }
        this.getData();
    }

    async getData() {
        this.listCategory = [];
        await this.categoryService.list().subscribe((res: any) => {
            if (res != null && res.status == true) {
                this.listCategory = res.results.data;
            }
        });
    }

    remove(element: any) {
        var strTitle = 'ยืนยัน';
        var strText = 'คุณต้องการลบรายการใช่หรือไม่';

        Swal.fire({
            title: strTitle,
            html: strText,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#E3242B',
        }).then(res => {
            if (res.isConfirmed) {
                this.categoryService.remove(element.id).subscribe((res: any) => {
                    if (res != null && res.status == true) {
                        this.getData();
                    }
                })
            }
        });
    }

    active(element: any) {
        var strTitle = 'ยืนยัน';
        var strText = '';
        if (element.is_active == 1) {
            strText = 'คุณต้องการปิดการใช้งานหรือไม่ ?';
        }
        else {
            strText = 'คุณต้องการเปิดการใช้งานหรือไม่ ?';
        }

        Swal.fire({
            title: strTitle,
            html: strText,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#E3242B',
        }).then(res => {
            if (res.isConfirmed) {
                this.categoryService.active(element.id).subscribe((res: any) => {
                    if (res != null && res.status == true) {
                        this.getData();
                    }
                })
            }
        });
    }

    add() {
        const dialogRef = this.dialog.open(AdminCategoryAddComponent, {
            disableClose: true,
            width: '80%'
        });

        dialogRef.afterClosed().subscribe(res => {

        });
    }

    back() {
        this.router.navigate(['admin/home'])
    }
}
