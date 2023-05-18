import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PlantCare} from "../../../models/plantCare";
import {PlantCareService} from "../../../services/plant-care.service";
import {Plant} from "../../../models/plant";

@Component({
  selector: 'app-transaction-care-detail',
  templateUrl: './plant-care-detail.component.html',
  styleUrls: ['./plant-care-detail.component.scss'],
})
export class PlantCareDetailComponent {
  plantCare?: PlantCare;
  plantCommon_name?: string;
  plantScientific_name?: string;
  plantDefault_imageThumbnail?: string;

  constructor(
    private route: ActivatedRoute,
    private plantCareService: PlantCareService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPlantCare();
    this.getPlantDetails();
  }

  getPlantCare(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantCareService.getPlantCare(id).subscribe((plantCare) =>
        this.plantCare = plantCare);
    });
  }

  getPlantDetails(): void {
    if(this.plantCare){
      this.plantCareService.getPlantDetails(this.plantCare).subscribe((plant: Plant) => {
         this.plantCommon_name = plant.common_name;
         this.plantScientific_name = plant.scientific_name;
         this.plantDefault_imageThumbnail = plant.default_image.thumbnail;
        });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
