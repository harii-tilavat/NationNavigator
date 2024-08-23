import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdIconComponent } from './tmd-icon.component';
import { IconsRegistry } from './icon-registry';



@NgModule({
  declarations: [
    TmdIconComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [IconsRegistry],
  exports: [TmdIconComponent]
})
export class IconsModule { }
