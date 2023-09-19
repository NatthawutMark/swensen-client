import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../_service/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductAddComponent } from '../admin-product-add/admin-product-add.component';
import { Location } from '@angular/common';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private router: Router,
        private dialog: MatDialog,
        private location: Location,
    )
    
    {
        
    }

    ngOnInit(): void {

    }

    add() {
        const dialogRef = this.dialog.open(AdminProductAddComponent, {
            disableClose: true,
            width: '80%',
            data: { }
        });

        dialogRef.afterClosed().subscribe((res: any) => {
            if (res && res.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                }).then(() => {
                    
                })
            }
        });
    }
}
