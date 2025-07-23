import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../service/patient.service';
import {Router, RouterOutlet} from '@angular/router';
import {UsersService} from '../service/users.service';
import {PersonnelService} from '../service/personnel.service';
import {NavComponent} from '../nav/nav.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../service/auth.service';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'app-enregistrement',
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, NavComponent, NgIf],
  templateUrl: './enregistrement.component.html',
  standalone: true,
  styleUrl: './enregistrement.component.css'
})
export class EnregistrementComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, protected authService:AuthService, private patientService: PatientService, private personnelService: PersonnelService, private usersService: UsersService, private router: Router) {
    this.formGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', [Validators.required]],
    })
  }

  userSave() {
    const formValue = this.formGroup.value;
    const password = this.formGroup.get('password')?.value;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const result = { login:  this.formGroup.get('login')?.value, role: this.formGroup.get('role')?.value, password:hashedPassword  , id: this.usersService.getLastUserId()};
    console.log(result);
    this.usersService.addTemporaryUser(result);
    if (formValue.role === "patient"){
      this.router.navigateByUrl('saveUsers/savePatient');
    }else if(formValue.role === "medecin" || formValue.role === "secretaire"){
      this.router.navigateByUrl('saveUsers/savePersonnel');
    }
  }
  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
