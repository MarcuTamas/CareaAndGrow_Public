import { Component } from '@angular/core';
import {Plant} from "../../../../models/plant";
import {ActivatedRoute} from "@angular/router";
import {PlantService} from "../../../../services/plant.service";
import {Location} from "@angular/common";
import {MessagesService} from "../../../../services/messages.service";

@Component({
  selector: 'app-plant-detail-update',
  templateUrl: './plant-detail-update.component.html',
  styleUrls: ['./plant-detail-update.component.scss']
})

export class PlantDetailUpdateComponent {
  plant?: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location,
    private messageService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.getPlant();
  }

  getPlant(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantService.getPlant(id).subscribe((plant) =>
        this.plant = plant);
    });
  }

  onUpdate(): void {
    try {
      this.plantService.updatePlant(this.plant).subscribe(() => {
        this.messageService.add(
          `PlantDetailUpdateComponent: updated ${this.plant?.common_name}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `PlantDetailUpdateComponent: error updating ${this.plant?.common_name}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }
}
