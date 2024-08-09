import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor() { }

    handleError(error: HttpErrorResponse): string {
      if (error.error && typeof error.error.detail === 'string') {
        return `Error: ${error.error.detail}`;
      }
      switch (error.status) {
        case 400:
          return 'Solicitud incorrecta.';
        case 401:
          return 'Usuario o contraseña incorrectos.';
        case 403:
          return 'No tiene permiso para realizar esta acción.';
        case 404:
          return 'Recurso no encontrado.';
        case 422:
          return this.handle422Error(error);
        case 500:
          return 'Error interno del servidor. Por favor, intente nuevamente más tarde.';
        case 503:
          return 'Servicio no disponible. Por favor, intente nuevamente más tarde.';
        case 0:
          return 'Error de red. Por favor, revise su conexión a internet.';
        default:
          console.warn('Unhandled status code:', error.status);
          return 'Error: Ocurrió un problema al procesar la solicitud.';
      }
    }


    private handle422Error(error: HttpErrorResponse): string {
      if (error.error.detail && Array.isArray(error.error.detail)) {
        const errorMessages = error.error.detail.map((d: any) => d.msg);
        return 'Error de validación: ' + errorMessages.join(', ');
      } else if (error.error.detail) {
        return 'Error: ' + error.error.detail;
      } else {
        return 'Error: Datos inválidos.';
      }
    }
}