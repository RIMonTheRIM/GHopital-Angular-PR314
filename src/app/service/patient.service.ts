import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients: any[] = [];
  dossiers_medicaux_list: any[] = [];
  consultations: any[] = [];
  ordonnances: any[] = [];
  rdv_list: any[] = [];
  temporaryPatient: any;
  dossierSearchId: any = -1;
  constructor() { }
  getAllPatients(){
    return this.patients;
  }
  getAllDossiersMedic() {
    return this.dossiers_medicaux_list;
  }
  getAllConsultations(){
    return this.consultations;
  }
  getAllOrdonnances(){
    return this.ordonnances;
  }
  getAllRdvs(){
    return this.rdv_list;
  }
  addPatient(patient: any){
    this.patients.push(patient);
  }
  addDossierMedic(dossier: any){
    this.dossiers_medicaux_list.push(dossier);
  }
  addConsultation(consultation: any){
    this.consultations.push(consultation);
  }
  addOrdonnance(ordonnance: any){
    this.ordonnances.push(ordonnance);
  }
  addRdv(rdv: any){
    this.rdv_list.push(rdv);
  }
  getLastPatientId() {
    if (this.patients.length > 0) {
      const lastPatient = this.patients[this.patients.length - 1];
      return lastPatient.id+1;
    }
    return 0;
  }
  getLastDossierMedicId() {
    if (this.dossiers_medicaux_list.length > 0) {
      const lastDossier = this.dossiers_medicaux_list[this.dossiers_medicaux_list.length - 1];
      return lastDossier.id+1;
    }
    return 0;
  }
  getLastConsultationId() {
    if (this.consultations.length > 0) {
      const lastConsultation = this.consultations[this.consultations.length - 1];
      return lastConsultation.id+1;
    }
    return 0;
  }
  getLastOrdonnanceId() {
    if (this.ordonnances.length > 0) {
      const lastOrdonnance = this.ordonnances[this.ordonnances.length - 1];
      return lastOrdonnance.id+1;
    }
    return 0;
  }
  getLastRdvId() {
    if (this.rdv_list.length > 0) {
      const lastRdv = this.rdv_list[this.rdv_list.length - 1];
      return lastRdv.id+1;
    }
    return 0;
  }

  addTemporaryPatient(result: any) {
    this.temporaryPatient = result;
  }

  getDossierMedicBySearchId() {
    if (this.dossierSearchId !== -1){
      return this.dossiers_medicaux_list.find(dossier => dossier.id === this.dossierSearchId);
    }
    return -1;
  }

  getPatientById(patient_id: any) {
    return this.patients.find(patient => patient.id === patient_id);
  }

  getPatientByUserId(id: any) {
    return this.patients.find(patient => patient.user_id === id);
  }

  deletePatientById(patientIndex: number) {
    const removedPatient = this.patients.splice(patientIndex,1);
    this.deleteDossierByPatientID(removedPatient[0].id);
  }
  deleteDossierByPatientID(patientID: any){
    const index = this.dossiers_medicaux_list.indexOf(this.dossiers_medicaux_list.find(dossier => dossier.patient_id === patientID));
    const deletedDossier = this.dossiers_medicaux_list.splice(index,1);

    this.deleteConsultationsByDossierId(deletedDossier[0].id);
  }

  private deleteConsultationsByDossierId(dossierID: any) {
    const consultationsToDelete = this.consultations.filter(consultation => consultation.dossier_id == dossierID);
    this.consultations = this.consultations.filter(consultation => consultation.dossier_id !== dossierID);
    for(const consultation of consultationsToDelete){
      this.deleteEveryOrdonnanceByConsultationId(consultation.id);
    }
  }

  private deleteEveryOrdonnanceByConsultationId(id: any) {
    this.ordonnances = this.ordonnances.filter(ordonnance => ordonnance.consultation_id !== id);
  }

  getConsultationsByDossierId(id: any) {
    return this.consultations.filter(cons => cons.dossier_id  === id);
  }

  editPatient(oldPatientId: any, newPatient: any) {
    const index = this.patients.findIndex(patient => patient.id === oldPatientId);
    if (index !== -1) {
      this.patients[index] = newPatient;
    }
  }
}
