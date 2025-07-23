import { Injectable } from '@angular/core';
import {UsersService} from './users.service';
import CryptoJS from 'crypto-js';
export enum UserRole {
  Admin = 'admin',
  Secretaire = 'secretaire',
  Medecin = 'medecin',
  Patient = 'patient'
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  connectedId: number = -1;
  connectedRole: UserRole = UserRole.Patient;
  connectedLogin: any;
  constructor(private usersService: UsersService) { }
  connexion(login:any,password:any){
    for (const user of this.usersService.users) {
      console.log(user.login);
      const hashedPassword = CryptoJS.SHA256(password).toString();
      console.log("password",password);
      console.log("hashed password",hashedPassword);
        if (user.login == login && user.password == hashedPassword){
          this.connectedId = user.id;
          this.connectedRole = user.role;
          this.connectedLogin = user.login;
          return true;
        }
    }
    return false;
  }

  getConnectedRole(){
    if (this.connectedId >= 0){
      return this.connectedRole;
    }else
      return -1; //TODO: not connected
  }
}
