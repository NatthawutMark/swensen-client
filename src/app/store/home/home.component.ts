import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../_service/users.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isLoading = true;
    listRecom: any = [];
    listPromo: any = [];
    listNews: any = [];

    constructor(
        private router: Router,
        private productService: ProductService
    ) {

    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.productService.list({}).subscribe((res: any) => {
            if (res != null && res.status == true) {
                console.log('yes');
                let data = res.results.data;
                data.forEach((item: any) => {
                    if (item.recommend == 1)
                        this.listRecom.push(item)
                    if (item.news == 1)
                        this.listNews.push(item)
                    if (item.promotion == 1)
                        this.listPromo.push(item)
                });
                this.isLoading = false;
            }
        });

    }

    goProduct() {
        this.router.navigate(['store/product'])
    }

    goStore() {
        this.router.navigate(['store/product'])
    }
}
