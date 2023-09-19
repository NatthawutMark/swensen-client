import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../_service/users.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AdminProductComponent } from '../admin-product/admin-product.component';

@Component({
    selector: 'app-admin-product-add',
    templateUrl: './admin-product-add.component.html',
    styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

    form: FormGroup
    files: any[] = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AdminProductComponent>,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            image: this.fb.array([]),
        })
    }

    ngOnInit(): void {

    }

    get imageList() {
        return this.form.get('image') as FormArray;
    }

    formatBytes(bytes: any, decimals = 2) {
        bytes = parseInt(bytes);
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    async handleFileInput(event: any) {
        let _files: File[] = event.target.files;
        let f: File[] = event.target.files;

        this.files.push(f[0]);

        console.log('dsadasds',event);
        console.log('ssssss',event.target.result);

        if (this.imageList.value.length == 0) {
            for (let i = 0; i < _files.length; i++) {
                let _file = _files[i];
                var uploadedFile = new FileReader();
                uploadedFile.readAsDataURL(_file);
                uploadedFile.onload = (event: any) => {
                    this.imageList.push(
                        this.fb.group({
                            file_name: _file.name,
                            file_size: _file.size.toString(),
                            file_ext: _file.name.split('.')[1],
                            file_type: _file.type,
                            file_blob: event.target.result,
                            // file_desc: [''],
                            file_number: [''],
                            file_date: [''],
                            comment: [''],
                            send_date: new Date(),
                        })

                    );
                };
            }
        }
        else {
            for (let i = 0; i < _files.length; i++) {
                let _file = _files[i];
                var uploadedFile = new FileReader();
                uploadedFile.readAsDataURL(_file);
                uploadedFile.onload = (event: any) => {
                    this.imageList.push(
                        this.fb.group({
                            file_name: _file.name,
                            file_size: _file.size.toString(),
                            file_ext: _file.name.split('.')[1],
                            file_type: _file.type,
                            file_blob: event.target.result,
                            // file_desc: [''],
                            file_number: [''],
                            file_date: [''],
                            comment: [''],
                            send_date: new Date(),
                        })
                    );
                }
            }
        }
    }

    removeFile(i: number) {
        Swal.fire({
            title: 'คุณต้องการลบรายการนี้หรือไม่ ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fa8072',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.value) {
                this.imageList.removeAt(i);
                this.files.splice(i, 1);
            }
        });
    }


    save() {

    }

    close() {
        this.dialogRef.close(null);
    }
}
