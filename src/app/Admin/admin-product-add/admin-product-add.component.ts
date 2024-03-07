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
import { MaterialModule } from 'src/app/shared/material/material.module'

@Component({
    selector: 'app-admin-product-add',
    templateUrl: './admin-product-add.component.html',
    styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

    id = '';
    form: FormGroup
    files: any[] = [];
    listCate: any[] = [];

    fileBase64: any;
    reqType = "add";

    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File[] = []; // Variable to store file
    preview: any;
    special = [
        { id: 'promo', name_th: 'โปรโมชั่น' },
        { id: 'recom', name_th: 'สินค้าแนะนำ' },
        { id: 'news', name_th: 'สินค้าใหม่' },
    ]

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
            price: [''],
            qty: [''],
            cate_id: [''],
            special: [''],
        })
        if (data != null) {
            this.reqType = "edit";
            this.id = data.id
        }
    }

    get imageList() {
        return this.form.get('image') as FormArray;
    }

    ngOnInit(): void {
        this.getCategoty();
        if (this.data != null) {
            this.getdata();
        }
    }

    getdata() {
        if (this.id != '') {
            this.productService.detail(this.id).subscribe((res: any) => {
                if (res != null && res.status == true) {
                    let result = res.results.data;

                    result.images.forEach((img: any) => {
                        this.productService.getFileBlob(img.id).subscribe((fileImg: any) => {

                            const reader = new FileReader();
                            reader.readAsDataURL(fileImg);
                            reader.onload = () => {
                                this.fileBase64 = reader.result
                                this.preview = reader.result

                                this.imageList.push(
                                    this.fb.group({
                                        file_name: img.file_name,
                                        file_size: img.file_size.toString(),
                                        file_ext: img.file_name.split('.')[1],
                                        file_blob: fileImg,
                                        base64: reader.result
                                    }))
                            };
                        })
                    });

                    this.form.get('name')?.setValue(result.name);
                    this.form.get('price')?.setValue(result.price);
                    this.form.get('qty')?.setValue(result.qty);
                    this.form.get('cate_id')?.setValue(result.cate_id);
                    this.form.get('special')?.setValue(result.special);
                }
            })
        }
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
        await this.categoryService.list().subscribe((res: any) => {
            if (res != null && res.status == true) {
                this.listCate = res.results.data;
            }
        });
    }

    // async handleFileInput(event: any) {
    //     let _files: File[] = event.target.files;
    //     let f: File[] = event.target.files;

    //     this.files.push(f[0]);

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

        if (this.imageList.controls.length > 0) {
            this.imageList.clear()
        }

        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fileBase64 = reader.result
            this.preview = reader.result

            this.imageList.push(
                this.fb.group({
                    file_name: file.name,
                    file_size: file.size.toString(),
                    file_ext: file.name.split('.')[1],
                    file_blob: file,
                    base64: reader.result
                }))
        };
    }

    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
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
        let data = {
            id: this.id,
            action: this.reqType,
            imageList: this.imageList.value,
            ...this.form.value
        };


        Swal.fire({
            title: 'กำลังดำเนินการ',
            imageUrl: 'assets/loading/loading-buffering.gif',
            imageWidth: 100,
            imageHeight: 100,
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                this.productService.submit(data).subscribe(res => {
                    Swal.close();
                    if (res.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000,
                        }).then(() => {
                            let data = {
                                status: true
                            }
                            this.dialogRef.close(data);
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'เกิดข้อผิดพลาด',
                            html: res.message,
                            confirmButtonText: 'ปิดหน้าจอ'
                        });
                    }
                }, (error) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'เกิดข้อผิดพลาด',
                        confirmButtonText: 'ปิดหน้าจอ'
                    });
                });
            }

        })

    }

    submit() {
        let data = this.form.value;
        //#region Validate
        if (data.name == '' || data.cate == '') {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                confirmButtonText: 'ปิดหน้าจอ'
            });
            return;
        }
        this.save();
    }

    close() {
        this.dialogRef.close(null);
    }
}
