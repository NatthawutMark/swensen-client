import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsersService } from '../_service/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    genderList: any = [
        { id: 'male', name: 'ชาย', },
        { id: 'female', name: 'หญิง', },
        { id: 'none', name: 'ไม่ระบุ', },
    ]

    form: FormGroup
    hide: boolean = true;

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private router: Router
    ) {
        this.form = this.fb.group({
            first_name: [''],
            last_name: [''],
            tel: [''],
            email: [''],
            password: [''],
            gender: ['none'],
            birth_date: [''],
            checkTerm: [false],
        })
    }

    ngOnInit(): void {

    }

    checkTerm(item: any) {
        console.log(item);
        this.form.get('checkTerm')?.setValue(item ? true : false)
    }

    submit() {
        console.log(this.form.value);
        Swal.fire({
            icon: 'warning',
            title: 'ยืนยันการสมัครข้อมูล',
            showCancelButton: true,
            confirmButtonColor: '#e21c23',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true
        }).then(res => {
            if (res.isConfirmed == true)
                this.save();
        })
    }

    save() {
        let data = this.form.value

        Swal.fire({
            title: 'กำลังดำเนินการ',
            imageUrl: 'assets/loading/loading-buffering.gif',
            imageWidth: 100,
            imageHeight: 100,
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                this.userService.register(data).subscribe((res): any => {
                    Swal.close();
                    if (res != null && res.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 3000
                        }).then(res => {
                            this.router.navigate(['/login'])
                        })
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: res.message,
                            confirmButtonText: 'ปิดหน้าจอ',
                            // timer: 3000
                        })
                    }
                }, (erorr) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'เกิดข้อผิดพลาด',
                        confirmButtonText: 'ปิดหน้าจอ'
                    })
                })
            }
        })
    }
}
