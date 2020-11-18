import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PetsService } from './services/pets.service';
import { AddPetComponent } from './property/add-pet/add-pet.component';
import { PetDetailComponent } from './property/pet-detail/pet-detail.component';
import { PageNotFoundComponent } from './property/page-not-found/page-not-found.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { OauthService } from './services/oauth.service';
import { PropertyDetailResolverService } from './services/property-detail-resolver.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';



const appRoutes: Routes = [
  {path : '', component : PropertyListComponent},
  {path : 'add-pet', component : AddPetComponent},
  {path : 'pet-detail/:id', component : PetDetailComponent, resolve: {prp: PropertyDetailResolverService}},
  {path : 'user/register', component : UserRegisterComponent},
  {path : 'user/login', component : UserLoginComponent},
  {path : '**', component : PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPetComponent,
    PetDetailComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    PetsService,
    UserService,
    AlertifyService,
    OauthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
