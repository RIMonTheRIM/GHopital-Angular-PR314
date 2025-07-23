import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {authGuard} from './guard/auth.guard';
import {SavePersonnelComponent} from './enregistrement/save-personnel/save-personnel.component';
import {SavePatientComponent} from './enregistrement/save-patient/save-patient.component';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {ListeSecretairesComponent} from './liste/liste-secretaires/liste-secretaires.component';
import {ListeMedecinsComponent} from './liste/liste-medecins/liste-medecins.component';
import {SaveDossierMedicalComponent} from './enregistrement/save-patient/save-dossier-medical/save-dossier-medical.component';
import {ListeUtilisateursComponent} from './liste/liste-utilisateurs/liste-utilisateurs.component';
import {ListePatientsComponent} from './liste/liste-patients/liste-patients.component';
import {DossierMedicalComponent} from './dossier-medical/dossier-medical.component';
import {EditUtilisateurComponent} from './modification/edit-utilisateur/edit-utilisateur.component';
import {EditPersonnelComponent} from './modification/edit-personnel/edit-personnel.component';
import {EditPatientComponent} from './modification/edit-patient/edit-patient.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path: '', component: HomeComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'saveUsers', component: EnregistrementComponent, children:[
      {path: 'savePersonnel', component: SavePersonnelComponent, canActivate:[authGuard]},
      {path: 'savePatient', component: SavePatientComponent, children:[
          {path: 'saveDossierMedical', component: SaveDossierMedicalComponent, canActivate:[authGuard]}
        ], canActivate:[authGuard]},
    ], canActivate:[authGuard]},
  {path: 'listeSecretaires', component: ListeSecretairesComponent, canActivate:[authGuard]},
  {path: 'listeMedecins', component: ListeMedecinsComponent, canActivate:[authGuard]},
  {path: 'listeUsers', component: ListeUtilisateursComponent, canActivate:[authGuard]},
  {path: 'listePatients', component: ListePatientsComponent, canActivate:[authGuard]},
  {path: 'editPatient', component: EditPatientComponent, canActivate:[authGuard]},
  {path: 'editPersonnel', component: EditPersonnelComponent, canActivate:[authGuard]},
  {path: 'editUtilisateur', component: EditUtilisateurComponent, canActivate:[authGuard]},
  {path: 'resultSearchDossierMedic', component: DossierMedicalComponent, canActivate:[authGuard]},
  {path: '**', component: NotfoundComponent, canActivate:[authGuard]},
];
