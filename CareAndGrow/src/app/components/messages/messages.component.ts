import {Component} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(
    public messagesService: MessagesService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  onBack() {
    this.location.back();
  }
}
