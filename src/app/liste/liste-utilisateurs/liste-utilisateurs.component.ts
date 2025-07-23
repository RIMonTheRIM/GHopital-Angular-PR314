import { Component } from '@angular/core';
import {UsersService} from '../../service/users.service';
import {NavComponent} from '../../nav/nav.component';
import {PatientService} from '../../service/patient.service';
import {PersonnelService} from '../../service/personnel.service';
import {NgIf} from "@angular/common";
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-utilisateurs',
    imports: [
        NavComponent,
        NgIf
    ],
  templateUrl: './liste-utilisateurs.component.html',
  standalone: true,
  styleUrl: './liste-utilisateurs.component.css'
})
export class ListeUtilisateursComponent {
  users: any[] = [];
  constructor(private userService: UsersService, protected authService:AuthService,  private router: Router, private patientService: PatientService, private personnelService: PersonnelService) {
  }
  ngOnInit(): void{
    this.users = this.userService.getAllUsers();
  }

  deleteUser(user_id: any) {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if(confirmed){
      let i = this.users.indexOf(this.userService.getUserByUserId(user_id));
      this.users.splice(i,1);
      this.userService.deleteUserByUserId(user_id);
      console.log("supprésion terminée de l'utilisateur");
    }
  }

  editRole(u: any) {
    this.userService.temporaryUser = u;
    this.router.navigateByUrl('/editUtilisateur');
  }
}
