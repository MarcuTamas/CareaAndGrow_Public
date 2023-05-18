import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PlantsListComponent} from "./components/plants/plants-list/plants-list.component";
import {PlantsListPreviewComponent} from "./components/plants/plants-list/plants-list-preview/plants-list-preview.component";
import {PlantDetailComponent} from "./components/plants/plant-detail/plant-detail.component";
import {PlantDeleteComponent} from "./components/plants/plant-delete/plant-delete.component";
import {PlantAddComponent} from "./components/plants/plant-add/plant-add.component";
import {PlantsCareListComponent} from "./components/plantCare/plants-care-list/plants-care-list.component";
import {PlantCareDetailComponent} from "./components/plantCare/plant-care-detail/plant-care-detail.component";
import {PlantCareDeleteComponent} from "./components/plantCare/plant-care-delete/plant-care-delete.component";
import {PlantCareAddComponent} from "./components/plantCare/plant-care-add/plant-care-add.component";
import {TransactionAddComponent} from "./components/transactions/transaction-add/transaction-add.component";
import {TransactionsListComponent} from "./components/transactions/transactions-list/tranasactions-list.component";
import {TransactionDetailComponent} from "./components/transactions/transaction-detail/transaction-detail.component";
import {TransactionDeleteComponent} from "./components/transactions/transaction-delete/transaction-delete.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {MessagesComponent} from "./components/messages/messages.component";
// import {PlantsAPIComponent} from "./components/plants-api/plants-api.component";
import {
  PlantDetailUpdateComponent
} from "./components/plants/plant-detail/plant-detail-update/plant-detail-update.component";
import {
  PlantCareDetailUpdateComponent
} from "./components/plantCare/plant-care-detail/plant-care-detail-update/plant-care-detail-update.component";
import {
  PlantsCareListPreviewComponent
} from "./components/plantCare/plants-care-list/plants-care-list-preview/plants-care-list-preview.component";
import {
  TransactionDetailUpdateComponent
} from "./components/transactions/transaction-detail/transaction-detail-update/transaction-detail-update.component";

import {PrivacyPolicyComponent} from "./components/app-footer/privacy/privacy-policy/privacy-policy.component";

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'plants', component: PlantsListComponent },
  { path: 'plants/preview', component: PlantsListPreviewComponent },
  { path: 'plants/detail/:id', component: PlantDetailComponent },
  { path: 'plants/detail/update/:id', component: PlantDetailUpdateComponent },
  { path: 'plants/delete/:id', component: PlantDeleteComponent },
  { path: 'plants/add', component: PlantAddComponent },

  // { path: 'plantsAPI', component: PlantsAPIComponent },

  { path: 'plantCare', component: PlantsCareListComponent },
  { path: 'plantCare/preview', component: PlantsCareListPreviewComponent },
  { path: 'plantCare/detail/:id', component: PlantCareDetailComponent },
  { path: 'plantCare/detail/update/:id', component: PlantCareDetailUpdateComponent },
  { path: 'plantCare/delete/:id', component: PlantCareDeleteComponent },
  { path: 'plantCare/add', component: PlantCareAddComponent },

  { path: 'transactions', component: TransactionsListComponent },
  { path: 'transactions/detail/:id', component: TransactionDetailComponent },
  { path: 'transactions/detail/update/:id', component: TransactionDetailUpdateComponent },
  { path: 'transactions/delete/:id', component: TransactionDeleteComponent },
  { path: 'transactions/add', component: TransactionAddComponent },

  { path: 'welcome', component: WelcomeComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'messages', component: MessagesComponent },

  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
