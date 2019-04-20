import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpResponsivePullComponent } from './http-responsive-pull.component';

@NgModule({
  declarations: [
    HttpResponsivePullComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HttpResponsivePullComponent]
})
export class HttpResponsivePullModule { }
