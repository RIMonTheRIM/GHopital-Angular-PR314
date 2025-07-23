import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  medecins: any[] = [];
  secretaires: any[] = [];
  temporaryPersonnel: any;
  temporaryEditRole: any;
  constructor() { }
  getAllMedecins(){
    return this.medecins;
  }
  getAllSecretaires(){
    return this.secretaires;
  }
  addMedecin(patient: any){
    this.medecins.push(patient);
  }
  addSecretaire(patient: any){
    this.secretaires.push(patient);
  }
  getLastSecretaireId() {
    if (this.secretaires.length > 0) {
      const lastSecretaire = this.secretaires[this.secretaires.length - 1];
      return lastSecretaire.id+1;
    }
    return 0;
  }
  getLastMedecinId() {
    if (this.medecins.length > 0) {
      const lastMedecin = this.medecins[this.medecins.length - 1];
      return lastMedecin.id+1;
    }
    return 0;
  }

  deleteMedecinByUserId(id: any) {
    this.medecins = this.medecins.filter(med => med.user_id !== id);
  }

  deleteSecretaireByUserId(id: any) {
    this.secretaires = this.secretaires.filter(sec => sec.user_id !== id);
  }

  getMedecinByUserId(connectedId: number) {
    return this.medecins.find(med => med.user_id === connectedId);
  }

  editMedecin(oldMedecinId: any, newMedecin: any) {
    const index = this.medecins.findIndex(med => med.id === oldMedecinId);
    if (index !== -1) {
      this.medecins[index] = newMedecin;
    }
  }

  editSecretaire(oldSecretaireId: any, newSecretaire: any) {
    const index = this.secretaires.findIndex(sec => sec.id === oldSecretaireId);
    if (index !== -1) {
      this.secretaires[index] = newSecretaire;
    }
  }
}
