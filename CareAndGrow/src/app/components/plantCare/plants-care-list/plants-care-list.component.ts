import { Component } from '@angular/core';
import {PlantCare} from "../../../models/plantCare";
import {PlantCareService} from "../../../services/plant-care.service";


@Component({
  selector: 'app-plantsCare-list',
  templateUrl: './plants-care-list.component.html',
  styleUrls: ['./plants-care-list.component.scss']
})
export class PlantsCareListComponent {

  selectedPlantCare?: PlantCare;
  plantsCare: PlantCare[] = [];

  constructor(private plantCareService: PlantCareService) {

  }

  ngOnInit(): void {
    this.getPlantsCare();
  }

  getPlantsCare(): void {
    this.plantCareService.getPlantsCare().subscribe((plantsCare) => {
      this.plantsCare = plantsCare
    });
  }

  onSelect(plantCare: PlantCare): void {
    this.selectedPlantCare = plantCare;
    this.plantCareService.getPlantCare(plantCare.id);
  }
}
