import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_service/users.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
    form: FormGroup;
    hide: boolean = true;

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private router: Router
    ) {
        this.form = fb.group({
            username: [''],
            password: [''],
        });
    }

    ngOnInit(): void {
        if (this.usersService.currentAdminValue != null) {
            this.router.navigate(['/admin']);
            return;
        }
    }

    async login() {
        let where = {
            type: 'admin',
            username: this.form.get('username')?.value,
            password: this.form.get('password')?.value,
        }
        var resAdmin = await this.usersService.login(where).toPromise();
        if (resAdmin != null && resAdmin.status == true) {
            let res = resAdmin.results.data;
            console.log('login success');
            this.router.navigate(['/admin/home']);
        }
    }

}
