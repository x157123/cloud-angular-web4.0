import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormCustomizationComponent} from "./form-customization.component";

const routes: Routes = [{
  path: '',
  component: FormCustomizationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormCustomizationRoutingModule { }
