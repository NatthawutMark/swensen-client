import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../_service/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup
    hide: boolean = true;

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: [''],
            password: [''],
        })
    }

    ngOnInit(): void {
        let hasLogin = this.userService.currentUserValue ?? null
        if (hasLogin != null) {
            this.router.navigate(['/home'])
        }

    }

    login() {
        let data = this.form.value;
        console.log(this.form);

        //#region Validate
        if (data.email == '' || data.password == '') {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                confirmButtonText: 'ปิดหน้าจอ'
            });
            return;
        }

        if (this.form.status == 'INVALID') {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณาตรวจสอบข้อมูล',
                confirmButtonText: 'ปิดหน้าจอ'
            });
            return;
        }
        //#endregion

        Swal.fire({
            title: 'กำลังดำเนินการ',
            imageUrl: 'assets/loading/loading-buffering.gif',
            imageWidth: 100,
            imageHeight: 100,
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.close();
                this.userService.login(data).subscribe(res => {
                    if (res != null && res.status == true) {
                        // this.router.navigate(['/home'])
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'ไม่พบข้อมูลผู้ใช้ กรุณาลองใหม่',
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


}
