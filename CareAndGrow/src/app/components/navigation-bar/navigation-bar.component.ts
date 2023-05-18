/**We must import several services like we had to do in main file of Java in order to work with them.
 *  As example, we had to import the messagesService in order to use the messages[] length. We do as well for the
 *  other services in order to show in the pill exact number of elements in the list.
 */

import {Component, Injectable} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {PlantService} from "../../services/plant.service";
// import {Plant} from "../../models/plant";
import {PlantCareService} from "../../services/plant-care.service";
import {TransactionService} from "../../services/tranasaction.service";
// import {Plant} from "../../models/plant";
import {PrivacyService} from "../../services/privacy.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent {
  messagesService: MessagesService;
  privacyService: PrivacyService;
  plantService: PlantService;
  plantCareService: PlantCareService;
  transactionService: TransactionService;
  path: string = "";
  theClickedButton?: string;

  constructor(messagesService: MessagesService, privacyService: PrivacyService, plantService: PlantService, plantCareService: PlantCareService, transactionService: TransactionService) {
    this.messagesService = messagesService;
    this.privacyService = privacyService;
    this.plantService = plantService;
    this.plantCareService = plantCareService;
    this.transactionService = transactionService;
  }

  ngOnInit() {
  }

  setPath(path: string) {
    this.path = path;
  }

  getPath(): string {
    return this.path;
  }

  clickedButton(theClickedButton: string) {
    this.theClickedButton = theClickedButton;
  }

  clearLocalStorage(): void{
    this.privacyService.clearLocalStorage();
  }

}
