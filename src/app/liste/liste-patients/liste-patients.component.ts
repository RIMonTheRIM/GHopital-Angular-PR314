import { Component } from '@angular/core';
import {UsersService} from '../../service/users.service';
import {PatientService} from '../../service/patient.service';
import {Router, RouterLink} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {NgIf} from "@angular/common";
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-liste-patients',
    imports: [
        NavComponent,
        NgIf
    ],
  templateUrl: './liste-patients.component.html',
  standalone: true,
  styleUrl: './liste-patients.component.css'
})
export class ListePatientsComponent {
  patients: any[] = [];
  constructor(private patientService: PatientService, private router: Router,protected authService:AuthService, private userService:UsersService) {
  }
  ngOnInit(): void{
    this.patients = this.patientService.getAllPatients();
  }

  navigateToDossierMedical(id: number) {
    this.patientService.dossierSearchId = id;
    this.router.navigateByUrl('/resultSearchDossierMedic');
  }

  // deletePatientById(patient: any) {
  //   const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce patient et son dossier médical ?");
  //   if(confirmed){
  //     this.patients = this.patients.filter(patient => patient.id !== patient.id);
  //     this.patientService.deletePatientById(this.patientService.getPatientById(patient.id));
  //   }
  // }

  deletePatientUserById(user_id: any) {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce patient et son dossier médical ?");
    if(confirmed){
    this.userService.deleteUserByUserId(user_id);
    }
  }

  editPatient(p: any) {
    this.patientService.temporaryPatient = p;
    this.router.navigateByUrl('/editPatient');
  }
}
