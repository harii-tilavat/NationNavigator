import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DompurifyPipe } from './dompurifyPipe/dompurify.pipe';



@NgModule({
  declarations: [
    DompurifyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DompurifyPipe
  ]
})
export class PipesModule { }
