import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    PageLoginComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [HeaderComponent, LoginComponent, MenuComponent, PageLoginComponent],
})
export class CoreModule {}
