import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {PatientService} from '../../service/patient.service';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-save-patient',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './save-patient.component.html',
  standalone: true,
  styleUrl: './save-patient.component.css'
})
export class SavePatientComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router, private userService: UsersService) {
    this.formGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', [Validators.required]],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      num_secu_sociale: ['', [Validators.required, Validators.min(1)]]
    })
  }
  save() {
    const formValue = this.formGroup.value;

    const checkUnique = this.patientService.patients.find(p =>
      p.email === formValue.email || p.tel === formValue.tel || p.num_secu_sociale === formValue.num_secu_sociale
    );

    if (checkUnique) {
      if (checkUnique.email === formValue.email) {
        this.formGroup.get('email')?.setErrors({ notUnique: true });
      }
      if (checkUnique.tel === formValue.tel) {
        this.formGroup.get('tel')?.setErrors({ notUnique: true });
      }
      if (checkUnique.num_secu_sociale === formValue.num_secu_sociale) {
        this.formGroup.get('num_secu_sociale')?.setErrors({ notUnique: true });
      }
      return;
    }

    const result = { ...formValue, id: this.patientService.getLastPatientId(), user_id: this.userService.temporaryUser.id};
    console.log(result);
    this.patientService.addTemporaryPatient(result);
    this.router.navigateByUrl('saveUsers/savePatient/saveDossierMedical');
  }
  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
