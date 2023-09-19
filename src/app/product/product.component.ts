import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_service/users.service';
import { CategoryService } from '../_service/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    form: FormGroup
    listCate: any;
    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            cate: ['']
        })
    }

    ngOnInit(): void {
        this.getCategoty();
    }

    async getCategoty() {
        var res = await this.categoryService.list({}).toPromise();
        if (res != null && res.status == true) {
            this.listCate = res.results.data
        }
    }
}
