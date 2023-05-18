import { Component } from '@angular/core';
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-messages-preview',
  templateUrl: './messages-preview.component.html',
  styleUrls: ['./messages-preview.component.scss']
})
export class MessagesPreviewComponent {
  constructor(public messagesService: MessagesService) {}
}
