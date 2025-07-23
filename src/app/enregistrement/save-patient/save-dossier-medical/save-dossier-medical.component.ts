import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {PatientService} from '../../../service/patient.service';
import {PersonnelService} from '../../../service/personnel.service';
import {UsersService} from '../../../service/users.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-save-dossier-medical',
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    NgForOf
  ],
  templateUrl: './save-dossier-medical.component.html',
  standalone: true,
  styleUrl: './save-dossier-medical.component.css'
})
export class SaveDossierMedicalComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService, private personnelService: PersonnelService, private usersService: UsersService, private router: Router) {
    this.formGroup = this.fb.group({
      ante_medics: this.fb.array([]),
      ante_familles: this.fb.array([]),
      allergies: this.fb.array([]),
      traitements:this.fb.array([])
    })
  }

  get ante_medics(): FormArray {
    return this.formGroup.get('ante_medics') as FormArray;
  }
  addAnteMedic() {
    const fieldGroup = this.fb.group({
      value: ['']
    });
    this.ante_medics.push(fieldGroup);
  }
  removeAnteMedic(index: number) {
    this.ante_medics.removeAt(index);
  }



  get ante_familles(): FormArray {
    return this.formGroup.get('ante_familles') as FormArray;
  }
  addAnteFamille() {
    const fieldGroup = this.fb.group({
      value: ['']
    });
    this.ante_familles.push(fieldGroup);
  }
  removeAnteFamille(index: number) {
    this.ante_familles.removeAt(index);
  }


  get allergies(): FormArray {
    return this.formGroup.get('allergies') as FormArray;
  }
  addAllergie() {
    const fieldGroup = this.fb.group({
      value: ['']
    });
    this.allergies.push(fieldGroup);
  }
  removeAllergie(index: number) {
    this.allergies.removeAt(index);
  }


  get traitements(): FormArray {
    return this.formGroup.get('traitements') as FormArray;
  }
  addTraitement() {
    const fieldGroup = this.fb.group({
      value: ['']
    });
    this.traitements.push(fieldGroup);
  }
  removeTraitement(index: number) {
    this.traitements.removeAt(index);
  }

  dossierSave() {
    const formValue = this.formGroup.value;
    const result = { ...formValue, id: this.patientService.getLastDossierMedicId(), patient_id:this.patientService.temporaryPatient.id};
    console.log(result);
    this.usersService.addUser(this.usersService.temporaryUser);
    this.patientService.addPatient(this.patientService.temporaryPatient);
    this.patientService.addDossierMedic(result);
    this.router.navigateByUrl('/listePatients');
  }
  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
