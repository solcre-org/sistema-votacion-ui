import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})

export class UpdateAdminComponent implements OnInit {

  form: FormGroup;
  message: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const admin_id = this.form.get('id')?.value;
      const data = this.form.value;
      delete data.id;
      this.apiService.update_admin(admin_id, data).subscribe({
        next: (response) => {
          this.success = true;
          this.message = 'Datos modificados con éxito';
          this.form.reset();
        },
        error: (error) => {
          this.success = false;
          this.message = this.errorHandlerService.handleError(error);
        },
        complete: () => {}
      });
    } else {
      this.success = false;
      this.message = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
