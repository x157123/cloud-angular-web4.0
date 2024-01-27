import {Component} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'input-error-state-matcher-example',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})

export class UserComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}
