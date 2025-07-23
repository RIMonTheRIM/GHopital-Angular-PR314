import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {PatientService} from '../../service/patient.service';
import {PersonnelService} from '../../service/personnel.service';
import {NavComponent} from '../../nav/nav.component';
import {UsersService} from '../../service/users.service';
import {NgIf} from "@angular/common";
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-liste-secretaires',
    imports: [
        NavComponent,
        NgIf
    ],
  templateUrl: './liste-secretaires.component.html',
  standalone: true,
  styleUrl: './liste-secretaires.component.css'
})
export class ListeSecretairesComponent {
secretaires: any[] = [];

  constructor( private personnelService: PersonnelService,  private router: Router,protected authService:AuthService, private userService: UsersService) {
  }
  ngOnInit(): void{
    this.secretaires = this.personnelService.getAllSecretaires();
  }

  deleteSecretaireById(id: any) {
      this.secretaires = this.secretaires.filter(sec => sec.id !== id);
      this.personnelService.secretaires = this.personnelService.secretaires.filter(sec => sec.id !== id);
  }

  deleteSecretaireUserById(user_id: any) {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce secrétaire ?");
    if(confirmed){
      this.userService.deleteUserByUserId(user_id);
    }
  }

  editSecretaire(s: any) {
    this.personnelService.temporaryPersonnel = s;
    this.personnelService.temporaryEditRole = "secretaire";
    this.router.navigateByUrl('/editPersonnel');
  }
}
