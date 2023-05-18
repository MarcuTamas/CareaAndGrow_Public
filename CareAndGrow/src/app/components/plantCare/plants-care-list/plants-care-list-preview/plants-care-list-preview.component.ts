import {Component, Input} from '@angular/core';
import {PlantCare} from "../../../../models/plantCare";
import {PlantCareService} from "../../../../services/plant-care.service";

@Component({
  selector: 'app-plants-care-list-preview',
  templateUrl: './plants-care-list-preview.component.html',
  styleUrls: ['./plants-care-list-preview.component.scss']
})
export class PlantsCareListPreviewComponent {
  plantsCare: PlantCare[] = [];

  //The input decorator helps us to get the value or the path from the navbar, when we call the component.
  @Input()  relativeRoutePath?: string;

  constructor(private plantCareService: PlantCareService) {

  }

  ngOnInit(){
    this.getPlantsCare();
  }

  getPlantsCare(): void {
    this.plantCareService.getPlantsCare().subscribe((plantsCare) => {
      this.plantsCare = plantsCare;
    });
  }
}
