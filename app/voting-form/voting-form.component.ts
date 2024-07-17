import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrl: './voting-form.component.css'
})


export class VotingFormComponent implements OnInit {

  form: FormGroup;

  candidates = ['Candidato 1', 'Candidato 2'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      document: ['', Validators.required],
      candidate: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado', this.form.value);
    }
  }
}
