import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PlantCareService} from "../../../services/plant-care.service";
import {MessagesService} from "../../../services/messages.service";
import {PlantCare} from "../../../models/plantCare";

@Component({
  selector: 'app-transaction-care-delete',
  templateUrl: './plant-care-delete.component.html',
  styleUrls: ['./plant-care-delete.component.scss'],
})
export class PlantCareDeleteComponent {
  // id?: number;
  plantCare?: PlantCare;

  constructor(
    private route: ActivatedRoute,
    private plantCareService: PlantCareService,
    private location: Location,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPlantCare();
  }

  getPlantCare(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.plantCareService.getPlantCare(id).subscribe((plantCare) =>
        this.plantCare = plantCare);
    });
  }

  onConfirm(): void {
    if (this.plantCare) {
      this.plantCareService.deletePlantCare(this.plantCare.id).subscribe(() => {
        this.messageService.add('PlantCareDeleteComponent: deleted plant care with id ' + this.plantCare?.id)
        this.location.back();
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
