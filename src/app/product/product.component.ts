import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_service/users.service';
import { CategoryService } from '../_service/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ProductService } from '../_service/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    form: FormGroup
    listCate: any;
    listPro: any[] = [];

    mastListPro: any[] = [];
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            cate: ['']
        })
    }

    ngOnInit(): void {
        this.getCategoty();
        this.getProduct()
    }

    async getCategoty() {

        var res = await this.categoryService.list({}).toPromise();
        if (res != null && res.status == true) {
            this.listCate = res.results.data;
        }
    }

    async getProduct(data?: any) {
        // let _data = {
        //     cate_id: data
        // }
        var resPro = await lastValueFrom(this.productService.list({}));
        if (resPro != null && resPro != null) {
            let res = resPro.results.data;
            res.forEach((item: any) => {
                this.listPro.push({
                    id: item.id,
                    name: item.name,
                    file_image: item.file_image,
                    cate_name: item.cate_name,
                    cate_id: item.cate_id,
                })
            })
            // this.listPro = res.results.data;
            this.mastListPro = this.listPro;
            console.log(this.listPro);

        }
    }

    async selectCategory(event: any) {
        let id = event.source.value;
        console.log(id);
        
        if (event.value == "") {
            this.listPro = this.mastListPro;
        }
        else {
            this.listPro = this.mastListPro.filter(x => x.cate_id == id);
            console.log(this.listPro);
        }
    }

}
