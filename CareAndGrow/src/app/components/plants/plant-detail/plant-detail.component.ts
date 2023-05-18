import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plant } from "../../../models/plant";
import { PlantService } from "../../../services/plant.service";

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss'],
})
export class PlantDetailComponent {
  plant?: Plant;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPlant();
  }

  // getPlant(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.plantService.getPlant(id).subscribe((plant) => (this.plant = plant));
  // }

  /**
   * This method helps to observe the paraMap (the id from the link) and it will update automatically the page view
   * with the deserved plant id details. Before if I tried the old method without observing the paraMap too, only the
   * link (path) was updating but the actual page view not.
   */
  getPlant(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantService.getPlant(id).subscribe((plant) =>
        this.plant = plant);
    });
  }

  onBack(): void {
    this.location.back();
  }

}
