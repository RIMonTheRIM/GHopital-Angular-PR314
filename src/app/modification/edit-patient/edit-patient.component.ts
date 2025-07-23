import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../../service/patient.service';
import {Router} from '@angular/router';
import {UsersService} from '../../service/users.service';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-edit-patient',
  imports: [
    ReactiveFormsModule,
    NavComponent
  ],
  templateUrl: './edit-patient.component.html',
  standalone: true,
  styleUrl: './edit-patient.component.css'
})
export class EditPatientComponent {
  formGroup: FormGroup;
  sourcePatient: any;
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router, private userService: UsersService) {
    this.formGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', [Validators.required]],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      num_secu_sociale: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.sourcePatient = this.patientService.temporaryPatient;
    this.formGroup.patchValue(this.sourcePatient);
  }
  patientEdit() {
    const formValue = this.formGroup.value;
    const result = { ...formValue, id: this.sourcePatient.id, user_id: this.sourcePatient.user_id};
    console.log(result);
    //save
    this.patientService.editPatient(this.sourcePatient.id, result);
    this.router.navigateByUrl('listePatients');
  }
  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
