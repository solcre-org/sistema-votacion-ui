import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import { ErrorHandlerService } from '../../services/error-handler.service';


@Component({
  selector: 'app-add-voter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css']
})

export class AddVoterComponent implements OnInit{

  form: FormGroup;
  message: string = '';
  success: boolean = false;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      document: ['', Validators.required],
      dob: ['', [Validators.required, this.dateValidator]],
      is_candidate: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.addNewVoter(this.form.value).subscribe({
        next: (response) => {
          this.success = true;
          this.message = 'Votante creado con éxito';
          this.form.reset();
        },
        error: (error) => {
          this.success = false;
          this.message = this.errorHandlerService.handleError(error);
        },
        complete: () => { }
      });
    } else {
      this.success = false;
      this.message = 'Por favor, complete todos los campos requeridos.';
    }
  }

  

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return { 'dateInvalid': true };
    }
    return null;
  }
}