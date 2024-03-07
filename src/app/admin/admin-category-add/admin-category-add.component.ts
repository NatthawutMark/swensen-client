import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminCategoryComponent } from '../admin-category/admin-category.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
    selector: 'app-admin-category-add',
    templateUrl: './admin-category-add.component.html',
    styleUrls: ['./admin-category-add.component.scss']
})

export class AdminCategoryAddComponent implements OnInit {

    form: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AdminCategoryComponent>,
        private fb: FormBuilder,
        private categoryService: CategoryService,
    ) {
        this.form = fb.group({
            name: ['']
        })
    }

    ngOnInit(): void {

    }

    close() {
        this.dialogRef.close();
    }

    submit() {
        let req = {
            name: this.form.get('name')?.value
        }

        this.categoryService.submit(req).subscribe(res => {

        })
    }
}
