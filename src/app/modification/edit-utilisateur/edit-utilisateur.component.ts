import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {PatientService} from '../../service/patient.service';
import {PersonnelService} from '../../service/personnel.service';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-edit-utilisateur',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavComponent
  ],
  templateUrl: './edit-utilisateur.component.html',
  standalone: true,
  styleUrl: './edit-utilisateur.component.css'
})
export class EditUtilisateurComponent {
  formGroup: FormGroup;
  sourceUser: any;
  constructor(private fb: FormBuilder, protected authService:AuthService, private patientService: PatientService, private personnelService: PersonnelService, private usersService: UsersService, private router: Router) {
    this.formGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(){
    this.sourceUser = this.usersService.temporaryUser;
    this.formGroup.patchValue(this.sourceUser);
  }
  userEdit() {
    const formValue = this.formGroup.value;
    const result = { ...formValue, id: this.sourceUser.id, role:this.sourceUser.role};
    console.log(result);
    //save
    this.usersService.editUser(this.sourceUser.id, result);
    this.router.navigateByUrl('listeUsers');
  }
  isValid(field:any){
    return this.formGroup.get(field)?.invalid && (!this.formGroup.get(field)?.untouched || this.formGroup.get(field)?.dirty)
  }
}
