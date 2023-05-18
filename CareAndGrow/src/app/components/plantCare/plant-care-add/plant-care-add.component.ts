import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessagesService } from 'src/app/services/messages.service';
import {PlantCareService} from "../../../services/plant-care.service";
import {PlantCare} from "../../../models/plantCare";

@Component({
  selector: 'app-transaction-care-add',
  templateUrl: './plant-care-add.component.html',
  styleUrls: ['./plant-care-add.component.scss'],
})
export class PlantCareAddComponent {
  plantCare?: PlantCare = {
    id: 1,
    plantID: 1,

    isWatered: false,
    isFertilized: false,
    hasSpecialTreatment: false,

    careDate: new Date(),
  };

  plantsID?: number[];

  constructor(
    private route: ActivatedRoute,
    private plantCareService: PlantCareService,
    private messageService: MessagesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllPlantsID();
  }

  getAllPlantsID(): void{
    this.plantsID = this.plantCareService.getAllPlantsID();
  }

  onAdd(): void {
    try {
      this.plantCareService.addPlantCare(this.plantCare).subscribe(() => {
        this.messageService.add(
          `PlantCareAddComponent: added ${this.plantCare?.id}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `PlantCareAddComponent: error adding ${this.plantCare?.id}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }
}
