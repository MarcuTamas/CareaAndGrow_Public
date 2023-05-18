import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
favIconClicked: boolean = false;
appIconClicked: boolean = false;

onClickFavIcon() {
  this.favIconClicked = true;
  this.appIconClicked = false;
}

onClickAppIcon(){
  this.appIconClicked = true;
  this.favIconClicked = false;
}

}
