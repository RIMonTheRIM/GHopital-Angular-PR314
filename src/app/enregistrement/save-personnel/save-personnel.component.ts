import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PatientService} from '../../service/patient.service';
import {PersonnelService} from '../../service/personnel.service';
import {UsersService} from '../../service/users.service';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-save-personnel',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './save-personnel.component.html',
  standalone: true,
  styleUrl: './save-personnel.component.css'
})
export class SavePersonnelComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService, private personnelService: PersonnelService, protected usersService: UsersService, private router: Router) {
    this.formGroup = this.fb.group({
      nom: ['', [Validators.required]],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', [Validators.required]],
      specialite: ['']
    })
  }

  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }

  personnelSave() {
    let result: any;
    if (this.usersService.temporaryUser.role === "medecin"){
      result = {
        nom: this.formGroup.get("nom")?.value,
        prenom: this.formGroup.get("prenom")?.value,
        specialite: this.formGroup.get("specialite")?.value,
        tel: this.formGroup.get("tel")?.value,
        email: this.formGroup.get("email")?.value,
        id: this.personnelService.getLastMedecinId(),
        user_id: this.usersService.temporaryUser.id
      };
      this.usersService.addUser(this.usersService.temporaryUser);
      this.personnelService.addMedecin(result);
      this.router.navigateByUrl('/listeMedecins');
    }
    else if (this.usersService.temporaryUser.role === "secretaire"){
      result = {
        nom: this.formGroup.get("nom")?.value,
        prenom: this.formGroup.get("prenom")?.value,
        tel: this.formGroup.get("tel")?.value,
        email: this.formGroup.get("email")?.value,
        id: this.personnelService.getLastSecretaireId(),
        user_id: this.usersService.temporaryUser.id
      };
      this.usersService.addUser(this.usersService.temporaryUser);
      this.personnelService.addSecretaire(result);
      this.router.navigateByUrl('/listeSecretaires');

    }
    else
      console.log("wrong role for personnel save");
  }
}
