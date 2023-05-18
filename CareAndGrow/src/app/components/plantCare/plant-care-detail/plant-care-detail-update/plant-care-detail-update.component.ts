import { Component } from '@angular/core';
import {PlantCare} from "../../../../models/plantCare";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MessagesService} from "../../../../services/messages.service";
import {PlantCareService} from "../../../../services/plant-care.service";

@Component({
  selector: 'app-plant-care-detail-update',
  templateUrl: './plant-care-detail-update.component.html',
  styleUrls: ['./plant-care-detail-update.component.scss']
})
export class PlantCareDetailUpdateComponent {
  plantCare?: PlantCare;
  plantsID?: number[];

  constructor(
    private route: ActivatedRoute,
    private plantCareService: PlantCareService,
    private location: Location,
    private messageService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.getPlantCare();
    this.getAllPlantsID();
  }

  getPlantCare(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantCareService.getPlantCare(id).subscribe((plantCare) =>
        this.plantCare = plantCare);
    });
  }

  getAllPlantsID(): void{
    this.plantsID = this.plantCareService.getAllPlantsID();
  }

  onUpdate(): void {
    try {
      this.plantCareService.updatePlantCare(this.plantCare).subscribe(() => {
        this.messageService.add(
          `PlantCareDetailUpdateComponent: updated ${this.plantCare?.id}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `PlantCareDetailUpdateComponent: error updating ${this.plantCare?.id}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }
}
