import { Component } from '@angular/core';
import {PrivacyService} from "../../../../services/privacy.service";
import { NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-privacy-message',
  templateUrl: './privacy-message.component.html',
  styleUrls: ['./privacy-message.component.scss']
})
export class PrivacyMessageComponent {

  isPrivacyPolicy: boolean = false;

  constructor(private privacyService: PrivacyService, private route: Router) {}

  ngOnInit(){
    this.isPrivacyPolicyPage();
  }

  isPrivacyAccepted(): boolean {
    return this.privacyService.isPrivacyAccepted();
  }

  acceptPrivacy(): void {
    this.privacyService.acceptPrivacy();
  }

  isPrivacyPolicyPage(): void {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isPrivacyPolicy = event.url.includes('privacy-policy');
      }
    });
  }

}
