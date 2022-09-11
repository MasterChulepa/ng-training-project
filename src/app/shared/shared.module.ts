import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdawnDirective } from "./dropdawn.directive";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [
    ErrorPageComponent,
    SpinnerComponent,
    DropdawnDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPageComponent, 
    SpinnerComponent,  
    CommonModule,
    DropdawnDirective
  ]
})
export class SharedModule{}