import { Component } from '@angular/core';
import {Plant} from "../../../models/plant";
import {PlantService} from "../../../services/plant.service";
@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent {

  selectedPlant?: Plant;
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {

  }

  ngOnInit(): void {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants
    });
  }

  onSelect(plant: Plant): void {
    this.selectedPlant = plant;
    this.plantService.getPlant(plant.id)
  }
  
}
