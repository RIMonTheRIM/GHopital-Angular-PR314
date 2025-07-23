import { Injectable } from '@angular/core';
import {UserRole} from './auth.service';
import {PatientService} from './patient.service';
import {PersonnelService} from './personnel.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any[] = [
    {id: 1,
    login:"admin",
    password:"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    role: UserRole.Admin}
  ];
  temporaryUser: any;
  constructor(private patientService: PatientService, private personnelService:PersonnelService) { }
  getAllUsers(){
    return this.users;
  }
  addUser(user: any){
    this.users.push(user);
  }
  getLastUserId() {
    if (this.users.length > 0) {
      const lastUser = this.users[this.users.length - 1];
      return lastUser.id+1;
    }
    return 0;
  }

  addTemporaryUser(result: any) {
    this.temporaryUser = result;
  }

  getUserByUserId(user_id: any) {
    return this.users.find(user => user.id === user_id);
  }

  deleteUserByUserId(user_id: any) {
    const u = this.getUserByUserId(user_id);
    if (u.role === 'patient'){
      let patientIndex = this.patientService.patients.indexOf(this.patientService.getPatientByUserId(u.id));
      this.patientService.deletePatientById(patientIndex);
      console.log("supprésion terminée de patient");
    }
    else if(u.role === 'medecin'){
      this.personnelService.deleteMedecinByUserId(u.id);
      console.log("supprésion terminée de médecin");
    }
    else if(u.role === 'secretaire'){
      this.personnelService.deleteSecretaireByUserId(u.id);
      console.log("supprésion terminée de secrétaire");
    }
    let i = this.users.indexOf(this.getUserByUserId(user_id));
    this.users.splice(i,1);
  }

  editUser(oldUserId: any, newUser: any) {
    const index = this.users.findIndex(user => user.id === oldUserId);
    if (index !== -1) {
      this.users[index] = newUser;
    }
  }
}
