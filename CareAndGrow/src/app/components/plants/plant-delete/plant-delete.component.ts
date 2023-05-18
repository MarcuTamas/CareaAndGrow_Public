import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PlantService} from "../../../services/plant.service";
import {Plant} from "../../../models/plant";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-plant-delete',
  templateUrl: './plant-delete.component.html',
  styleUrls: ['./plant-delete.component.scss'],
})
export class PlantDeleteComponent {
  // id?: number;
  plant?: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getPlant();
  }

  /**
   * This method helps to observe the paraMap (the id from the link) and it will update automatically the page view
   * with the deserved plant id details. Before if I tried the old method without observing the paraMap too, only the
   * link (path) was updating but the actual page view not.
   *
   *It is the same method from plant-detail component, so it will get the plant too.
   */
  getPlant(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantService.getPlant(id).subscribe((plant) =>
        this.plant = plant);
    });
  }

  onConfirm(): void {
    if (this.plant) {
      this.plantService.deletePlant(this.plant.id).subscribe(() => {
        this.messageService.add('PlantDeleteComponent: deleted plant with id ' + this.plant?.id)
        this.location.back();
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
