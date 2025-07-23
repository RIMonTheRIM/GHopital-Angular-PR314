import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../../service/patient.service';
import {PersonnelService} from '../../service/personnel.service';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-personnel',
  imports: [
    ReactiveFormsModule,
    NavComponent,
    NgIf
  ],
  templateUrl: './edit-personnel.component.html',
  standalone: true,
  styleUrl: './edit-personnel.component.css'
})
export class EditPersonnelComponent {
  formGroup: FormGroup;
  sourcePersonnel: any;
  sourceRole: any;
  constructor(private fb: FormBuilder, private patientService: PatientService, private personnelService: PersonnelService, protected usersService: UsersService, private router: Router) {
    this.formGroup = this.fb.group({
      nom: ['', [Validators.required]],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', [Validators.required]],
      specialite: ['']
    })
  }
  ngOnInit(){
    this.sourcePersonnel = this.personnelService.temporaryPersonnel;
    this.sourceRole = this.personnelService.temporaryEditRole;
    this.formGroup.patchValue(this.sourcePersonnel);
  }
  personnelEdit() {
    console.log("this is personnel edit, sourcePersonnel is: ", this.sourcePersonnel);
    let result: any;
    if (this.sourceRole === 'medecin'){
      result = {
        nom: this.formGroup.get("nom")?.value,
        prenom: this.formGroup.get("prenom")?.value,
        specialite: this.formGroup.get("specialite")?.value,
        tel: this.formGroup.get("tel")?.value,
        email: this.formGroup.get("email")?.value,
        id: this.sourcePersonnel.id,
        user_id: this.sourcePersonnel.user_id
      };
      //save
      this.personnelService.editMedecin(this.sourcePersonnel.id, result);
      this.router.navigateByUrl('listeMedecins');
    }
    else if(this.sourceRole === 'secretaire'){
      result = {
        nom: this.formGroup.get("nom")?.value,
        prenom: this.formGroup.get("prenom")?.value,
        tel: this.formGroup.get("tel")?.value,
        email: this.formGroup.get("email")?.value,
        id: this.sourcePersonnel.id,
        user_id: this.sourcePersonnel.user_id
      };
      //save
      this.personnelService.editSecretaire(this.sourcePersonnel.id, result);
      this.router.navigateByUrl('listeMedecins');
    }
    else{
      console.log("edit personnel role system not working");
    }
  }

  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
