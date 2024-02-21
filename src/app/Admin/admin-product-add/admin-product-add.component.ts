import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../_service/users.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AdminProductComponent } from '../admin-product/admin-product.component';
import { FileUploadService } from 'src/app/_service/file-upload.service';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
    selector: 'app-admin-product-add',
    templateUrl: './admin-product-add.component.html',
    styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

    form: FormGroup
    files: any[] = [];
    listCate: any[] = [];

    fileBase64: any;

    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File[] = []; // Variable to store file
    preview: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AdminProductComponent>,
        private fb: FormBuilder,
        private fileUploadService: FileUploadService,
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            image: this.fb.array([]),
            name: [''],
            cage_id: ['']
        })
        // this.form.setControl("image", this.fb.array([]));
    }

    get imageList() {
        return this.form.get('image') as FormArray;
    }

    ngOnInit(): void {
        this.getCategoty();
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

    async getCategoty() {
        var res = await this.categoryService.list({}).toPromise();
        if (res != null && res.status == true) {
            this.listCate = res.results.data
        }
    }

    // async handleFileInput(event: any) {
    //     let _files: File[] = event.target.files;
    //     let f: File[] = event.target.files;

    //     this.files.push(f[0]);

    //     console.log('dsadasds',event);
    //     console.log('ssssss',event.target.result);

    //     if (this.imageList.value.length == 0) {
    //         for (let i = 0; i < _files.length; i++) {
    //             let _file = _files[i];
    //             var uploadedFile = new FileReader();
    //             uploadedFile.readAsDataURL(_file);
    //             uploadedFile.onload = (event: any) => {
    //                 this.imageList.push(
    //                     this.fb.group({
    //                         file_name: _file.name,
    //                         file_size: _file.size.toString(),
    //                         file_ext: _file.name.split('.')[1],
    //                         file_type: _file.type,
    //                         file_blob: event.target.result,
    //                         // file_desc: [''],
    //                         file_number: [''],
    //                         file_date: [''],
    //                         comment: [''],
    //                         send_date: new Date(),
    //                     })

    //                 );
    //             };
    //         }
    //     }
    //     else {
    //         for (let i = 0; i < _files.length; i++) {
    //             let _file = _files[i];
    //             var uploadedFile = new FileReader();
    //             uploadedFile.readAsDataURL(_file);
    //             uploadedFile.onload = (event: any) => {
    //                 this.imageList.push(
    //                     this.fb.group({
    //                         file_name: _file.name,
    //                         file_size: _file.size.toString(),
    //                         file_ext: _file.name.split('.')[1],
    //                         file_type: _file.type,
    //                         file_blob: event.target.result,
    //                         // file_desc: [''],
    //                         file_number: [''],
    //                         file_date: [''],
    //                         comment: [''],
    //                         send_date: new Date(),
    //                     })
    //                 );
    //             }
    //         }
    //     }
    // }

    // removeFile(i: number) {
    //     Swal.fire({
    //         title: 'คุณต้องการลบรายการนี้หรือไม่ ?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#fa8072',
    //         confirmButtonText: 'ยืนยัน',
    //         cancelButtonText: 'ยกเลิก',
    //     }).then((result) => {
    //         if (result.value) {
    //             this.imageList.removeAt(i);
    //             this.files.splice(i, 1);
    //         }
    //     });
    // }

    // On file Select
    onChange(event: any) {
        // this.file = event.target.files[0];
        if (this.imageList.controls.length > 0) {
            this.imageList.clear()
        }

        // console.log(event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fileBase64 = reader.result
            this.preview = reader.result
            console.log(reader);
            
            this.imageList.push(
                this.fb.group({
                    file_name: file.name,
                    file_size: file.size.toString(),
                    file_ext: file.name.split('.')[1],
                    file_type: file.type,
                    // file_blob: reader.result
                    file_blob: file
                }))

        };
    }

    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {

                    // Short link via api response
                    this.shortLink = event.link;

                    this.loading = false; // Flag variable 
                }
            }
        );
    }


    save() {
        let data = this.form.value;
        console.log(this.form);


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
                this.productService.submit(data).subscribe(res => {
                    if (res.status == true) {

                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000,
                        }).then(() => {
                            // this.dialogRef.close('');
                            location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'เกิดข้อผิดพลาด',
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

    submit() {
        let data = this.form.value;
        console.log(this.form.value);
        //#region Validate
        if (data.name == '' || data.cate == '') {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                confirmButtonText: 'ปิดหน้าจอ'
            });
            return;
        }

        // if (this.form.status == 'INVALID') {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'กรุณาตรวจสอบข้อมูล',
        //         confirmButtonText: 'ปิดหน้าจอ'
        //     });
        //     return;
        // }
        //#endregion
        // Swal.fire({
        //     icon: 'warning',
        //     title: 'ยืนยันการสมัครข้อมูล',
        //     showCancelButton: true,
        //     confirmButtonColor: '#e21c23',
        //     confirmButtonText: 'ยืนยัน',
        //     cancelButtonText: 'ยกเลิก',
        //     reverseButtons: true
        // }).then(res => {
        //     if (res.isConfirmed == true)
        this.save();
        // })
    }

    close() {
        this.dialogRef.close(null);
    }
}
