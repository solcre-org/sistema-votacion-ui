import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorHandlerService {

    constructor() { }
  
    handleError(error: HttpErrorResponse): string {
  
      switch (error.status) {
        case 400:
          return this.handle400Error(error);
        case 401:
          return this.handle401Error();
        case 403:
          return this.handle403Error();
        case 404:
          return this.handle404Error();
        case 409:
          return this.handle409Error();
        case 422:
          return this.handle422Error(error);
        case 500:
          return this.handle500Error();
        case 503:
          return this.handle503Error();
        case 0:
          return this.handleNetworkError();
        default:
          return 'Error: Ocurrió un problema al procesar la solicitud.';
      }
    }
  
    private handle400Error(error: HttpErrorResponse): string {
      return error.error.detail || 'Solicitud incorrecta.';
    }
  
    private handle401Error(): string {
      return 'No autorizado. Por favor, inicie sesión.';
    }
  
    private handle403Error(): string {
      return 'No tiene permiso para realizar esta acción.';
    }
  
    private handle404Error(): string {
      return 'Recurso no encontrado.';
    }
  
    private handle409Error(): string {
      return 'Ha habido un conflicto';
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
  
    private handle500Error(): string {
      return 'Error interno del servidor. Por favor, intente nuevamente más tarde.';
    }
  
    private handle503Error(): string {
      return 'Servicio no disponible. Por favor, intente nuevamente más tarde.';
    }
  
    private handleNetworkError(): string {
      return 'Error de red. Por favor, revise su conexión a internet.';
    }
  }