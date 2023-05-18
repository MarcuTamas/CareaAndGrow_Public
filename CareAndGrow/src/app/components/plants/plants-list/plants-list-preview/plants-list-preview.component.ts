import {Component, Input} from '@angular/core';
import {PlantService} from "../../../../services/plant.service";
import {Plant} from "../../../../models/plant";

@Component({
  selector: 'app-plants-list-preview',
  templateUrl: './plants-list-preview.component.html',
  styleUrls: ['./plants-list-preview.component.scss']
})
export class PlantsListPreviewComponent {
  plants: Plant[] = [];

  //The input decorator helps us to get the value or the path from the navbar, when we call the component.
  @Input()  relativeRoutePath?: string;

  constructor(private plantService: PlantService) {

  }

  ngOnInit(){
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
    });
  }

}
