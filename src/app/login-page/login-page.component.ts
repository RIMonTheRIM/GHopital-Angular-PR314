import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Route, Router} from '@angular/router';
import {PatientService} from '../service/patient.service';
import {PersonnelService} from '../service/personnel.service';
import {UsersService} from '../service/users.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private auth: AuthService, private router: Router, private patientService: PatientService, private personnelService: PersonnelService, private userService: UsersService) {
  }
  formGroup = inject(FormBuilder);
  loginForm = this.formGroup.group({
    login: ['', Validators.required],
    password:['', Validators.required]
  })
  ngOnInit(){
    console.log(this.userService.users);
  }
  connexion() {
    console.log(this.loginForm.value);
    if (this.auth.connexion(this.loginForm.value.login,this.loginForm.value.password)){
      if(this.auth.connectedRole == "patient"){
        this.patientService.dossierSearchId = this.patientService.getPatientByUserId(this.auth.connectedId).id;
        this.router.navigateByUrl("/resultSearchDossierMedic");
      }
      else if(this.auth.connectedRole == "medecin"){
        this.router.navigateByUrl("/listePatients");
      }
      else if(this.auth.connectedRole == "secretaire"){
        this.router.navigateByUrl("/listePatients");
      }
      else if(this.auth.connectedRole == "admin"){
        this.router.navigateByUrl("/listeUsers");
      }
    }else{
      console.log("false")
    }
  }
}
