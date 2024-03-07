import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../_service/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductAddComponent } from '../admin-product-add/admin-product-add.component';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/_service/product.service';
import { lastValueFrom } from 'rxjs';
// import { AdminProductAddComponent } from '../admin-product-add/admin-product-add.component';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

    listPro: any[] = []
    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private productService: ProductService,
        private router: Router,
        private dialog: MatDialog,
        private usersService: UsersService,
    ) {

    }

    ngOnInit(): void {
        if (this.usersService.currentAdminValue == null) {
            this.router.navigate(['/admin/login']);
            return;
        }
        this.getProduct()
    }

    async getProduct() {
        this.listPro = []
        var resPro = await this.productService.list({}).toPromise();
        if (resPro != null && resPro.status == true) {
            let res = resPro.results.data;
            res.forEach((item: any) => {
                this.listPro.push({
                    id: item.id,
                    name: item.name,
                    file_image: item.file_image,
                    cate_name: item.cate_name,
                    price: item.price,
                    qty: item.qty,
                    status_name: item.status_name,
                })
            })

        }
    }

    add() {
        const dialogRef = this.dialog.open(AdminProductAddComponent, {
            disableClose: true,
            width: '60%',
        });

        dialogRef.afterClosed().subscribe((res: any) => {
            if (res && res.status === true) {
                this.getProduct();
            }
        });
    }

    edit(element: any) {
        let id = element.id

        const dialogRef = this.dialog.open(AdminProductAddComponent, {
            disableClose: true,
            width: '60%',
            data: {
                id: id
            }
        });

        dialogRef.afterClosed().subscribe((res: any) => {
            if (res && res.status === true) {
                this.getProduct();
            }
        });
    }

    remove(data: any) {
        Swal.fire({
            icon: 'warning',
            title: 'ยืนยันการลบข้อมูล',
            showCancelButton: true,
            confirmButtonColor: '#e21c23',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true
        }).then(res => {
            if (res.isConfirmed == true) {
                Swal.close();
                this.productService.remove({ id: data }).subscribe(res => {
                    if (res != null && res.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ลบสำเร็จ',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000,
                        }).then(() => {
                            // this.listPro = this.listPro.filter(x => x.id != data);
                            this.getProduct();
                        })
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'ลบไม่สำเร็จ',
                            html: res._message,
                            confirmButtonText: 'ปิดหน้าจอ'
                        });
                    }
                }, (error) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'เกิดข้อผิดพลาด',
                        confirmButtonText: 'ปิดหน้าจอ'
                    });
                })
            }

        })
    }

    back() {
        this.router.navigate(['admin/home'])
    }

}

