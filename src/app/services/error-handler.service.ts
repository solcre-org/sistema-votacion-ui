import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorHandlerService {

    constructor() { }
  
    handleError(error: HttpErrorResponse): string {
      console.error('Error al procesar la solicitud', error);
  
      if (error.status === 422) {
        return this.handle422Error(error);
      } else if (error.status === 404) {
        return this.handle404Error(error);
      } else if (error.status === 400) {
        return this.handle400Error(error);
      } else {
        return 'Error: Ocurrió un problema al procesar la solicitud.';
      }
    }
  
    private handle422Error(error: HttpErrorResponse): string {
      if (error.error.detail && Array.isArray(error.error.detail)) {
        const errorMessages = error.error.detail.map((d: any) => `${d.loc.join(' -> ')}: ${d.msg}`);
        return 'Error: ' + errorMessages.join(', ');
      } else if (error.error.detail) {
        return 'Error: ' + error.error.detail;
      } else {
        return 'Error: Datos inválidos.';
      }
    }
  
    private handle404Error(error: HttpErrorResponse): string {
      if (error.error.detail === 'Documento no válido.') {
        return 'Documento no válido.';
      } else if (error.error.detail === 'Votante no registrado.') {
        return 'Votante no registrado.';
      } else if (error.error.detail === 'Candidato no encontrado.') {
        return 'Candidato no encontrado.';
      } else {
        return 'Recurso no encontrado.';
      }
    }
  
    private handle400Error(error: HttpErrorResponse): string {
      if (error.error.detail === 'El votante ya ha votado.') {
        return 'El votante ya ha votado.';
      } else {
        return 'Solicitud incorrecta.';
      }
    }
  }