import { Component } from '@angular/core';
import {PrivacyService} from "../../../../services/privacy.service";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  constructor(private privacyService: PrivacyService) {
  }

  currentDate: Date = new Date("05.18.2023");

  clearLocalStorage(): void{
    this.privacyService.clearLocalStorage();
  }

}
