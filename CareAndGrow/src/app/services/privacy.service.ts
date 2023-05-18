import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {
  private privacyAcceptedKey = 'privacyAccepted';
  isPrivacyConsent: boolean = this.isPrivacyAccepted();

  constructor() {

  }

  isPrivacyAccepted(): boolean {
    return localStorage.getItem(this.privacyAcceptedKey) === 'true';
  }

  acceptPrivacy(): void {
    localStorage.setItem(this.privacyAcceptedKey, 'true');
    window.location.reload();
  }

  clearLocalStorage(): void{
    localStorage.clear();
    window.location.reload();
  }

  getPrivacyConsent(): boolean{
    return this.isPrivacyConsent;
  }
}
