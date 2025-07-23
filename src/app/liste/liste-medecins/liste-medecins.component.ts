import { Component } from '@angular/core';
import {PersonnelService} from '../../service/personnel.service';
import {Router, RouterLink} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {UsersService} from '../../service/users.service';
import {NgIf} from "@angular/common";
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-liste-medecins',
    imports: [NavComponent, NgIf],
  templateUrl: './liste-medecins.component.html',
  standalone: true,
  styleUrl: './liste-medecins.component.css'
})
export class ListeMedecinsComponent {
  medecins: any[] = [];
  constructor( private personnelService: PersonnelService,private router: Router, protected authService:AuthService,private userService:UsersService) {
  }
  ngOnInit(): void{
    this.medecins = this.personnelService.getAllMedecins();
  }

  // deleteMedecinById(id: any) {
  //   const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?");
  //
  //   if (confirmed) {
  //     this.medecins = this.medecins.filter(med => med.id !== id);
  //     this.personnelService.medecins = this.personnelService.secretaires.filter(med => med.id !== id);
  //   }
  // }

  deleteMedecinUserById(user_id: any) {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?");

    if (confirmed) {
    this.userService.deleteUserByUserId(user_id);
    }
  }

  editMedecin(m: any) {
    this.personnelService.temporaryPersonnel = m;
    this.personnelService.temporaryEditRole = "medecin";
    this.router.navigateByUrl('/editPersonnel');
  }
}
