import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from "../../../../@vex/animations/fade-in-up.animation";
import {AuthService} from "../../../shared/services/auth.service";
import {AuthBody} from "../../../shared/utils/auth-body";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  copyright = 'Copyright © ' + new Date().getFullYear();

  loginForm: FormGroup;
  authBody = new AuthBody();
  loging: boolean = false;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _cd: ChangeDetectorRef,
              private _snackbar: MatSnackBar,
              private _authService: AuthService,
              private _toast: ToastrService,
  ) {
  }

  ngOnInit() {

    // clear local storage values
    localStorage.removeItem('app-token');
    localStorage.removeItem('isLoggedin');

    this.loginForm = this._fb.group({
      username: ['baarada', Validators.required],
      password: ['bbaarada', Validators.required]
    });
  }

  onLogin(): void {
    this.loging = true;
    this.authBody.username = this.loginForm.value.username;
    this.authBody.password = this.loginForm.value.password;
    this._authService.login(this.authBody).subscribe((ret) => {
      if (ret && ret['ok'] === true) {
        this.loging = false;
        // save local storage values
        localStorage.setItem('app-token', btoa(JSON.stringify(ret['data'])));
        localStorage.setItem('isLoggedin', 'true');
        // route to dashboard view
        this._router.navigateByUrl('/');

        this._toast.success(ret['message']);

      } else {
        this.loging = false;
        this._toast.error(ret['message']);
      }

    }, error => {
      this.loging = false;
      this._toast.error('Echec de connexion au serveur');
      return;
    });
  }

  send() {
    this._router.navigate(['/']);
    this._snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
      duration: 10000
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this._cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this._cd.markForCheck();
    }
  }
}
