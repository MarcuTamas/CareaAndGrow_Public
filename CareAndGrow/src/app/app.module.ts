 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PlantAddComponent } from './components/plants/plant-add/plant-add.component';
import { PlantDetailComponent } from './components/plants/plant-detail/plant-detail.component';
import { PlantsListComponent } from './components/plants/plants-list/plants-list.component';
import {PlantDeleteComponent} from "./components/plants/plant-delete/plant-delete.component";
import {FormsModule} from "@angular/forms";
import { PlantCareAddComponent } from './components/plantCare/plant-care-add/plant-care-add.component';
import { PlantCareDeleteComponent } from './components/plantCare/plant-care-delete/plant-care-delete.component';
import { PlantCareDetailComponent } from './components/plantCare/plant-care-detail/plant-care-detail.component';
import { PlantsCareListComponent } from './components/plantCare/plants-care-list/plants-care-list.component';
import {TransactionDetailComponent} from "./components/transactions/transaction-detail/transaction-detail.component";
import {TransactionAddComponent} from "./components/transactions/transaction-add/transaction-add.component";
import {TransactionDeleteComponent} from "./components/transactions/transaction-delete/transaction-delete.component";
import {TransactionsListComponent} from "./components/transactions/transactions-list/tranasactions-list.component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {NgOptimizedImage} from "@angular/common";
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import {MessagesPreviewComponent} from "./components/messages/messages-preview/messages-preview.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlantsListPreviewComponent } from './components/plants/plants-list/plants-list-preview/plants-list-preview.component';
import { PlantsAPIComponent } from './components/plants-api/plants-api.component';
import {HttpClientModule} from "@angular/common/http";
import { PlantDetailUpdateComponent } from './components/plants/plant-detail/plant-detail-update/plant-detail-update.component';
import { PlantsCareListPreviewComponent } from './components/plantCare/plants-care-list/plants-care-list-preview/plants-care-list-preview.component';
import { PlantCareDetailUpdateComponent } from './components/plantCare/plant-care-detail/plant-care-detail-update/plant-care-detail-update.component';
import { TransactionDetailUpdateComponent } from './components/transactions/transaction-detail/transaction-detail-update/transaction-detail-update.component';
import { TransactionsListPreviewComponent } from './components/transactions/transactions-list/transactions-list-preview/transactions-list-preview.component';
import { PrivacyMessageComponent } from './components/app-footer/privacy/privacy-message/privacy-message.component';
import { PrivacyPolicyComponent } from './components/app-footer/privacy/privacy-policy/privacy-policy.component';

 @NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    PlantAddComponent,
    PlantDeleteComponent,
    PlantDetailComponent,
    PlantsListComponent,
    PlantCareAddComponent,
    PlantCareDeleteComponent,
    PlantCareDetailComponent,
    PlantsCareListComponent,
    TransactionAddComponent,
    TransactionDeleteComponent,
    TransactionDetailComponent,
    TransactionsListComponent,
    NavigationBarComponent,
    WelcomeComponent,
    AppFooterComponent,
    MessagesPreviewComponent,
    PlantsListPreviewComponent,
    PlantsAPIComponent,
    PlantDetailUpdateComponent,
    PlantsCareListPreviewComponent,
    PlantCareDetailUpdateComponent,
    TransactionDetailUpdateComponent,
    TransactionsListPreviewComponent,
    PrivacyMessageComponent,
    PrivacyPolicyComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgOptimizedImage,
        NgbModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
