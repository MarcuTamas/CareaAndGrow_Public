import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MessagesService} from 'src/app/services/messages.service';
import {Plant} from "../../../models/plant";
import {PlantService} from "../../../services/plant.service";

@Component({
  selector: 'app-plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss'],
})
export class PlantAddComponent {
  plant?: Plant = {
    id: 1,
    name: "",
    common_name: "",
    scientific_name: "",
    family: "",
    watering: "",
    sunlight: [],
    propagation: [],
    flowers: false,
    care_level: "",
    growth_rate: "",

    default_image: {
      license: 0,
      license_name: "",
      license_url: "",
      original_url: "",
      regular_url: "",
      medium_url: "",
      small_url: "",
      thumbnail: "",
    },

    amount: 1,
    inFamilySince: new Date(),
  };

  queryWord: string = "";
  foundedPlantsFromAPI: Plant[] = [];
  notFoundMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private messageService: MessagesService,
    private location: Location
  ) {
  }

  onAdd(): void {
    try {
      this.plantService.addPlant(this.plant).subscribe(() => {
        this.messageService.add(
          `PlantAddComponent: added ${this.plant?.common_name}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `PlantAddComponent: error adding ${this.plant?.common_name}`
      );
    }
  }

  onSearchAdd(): void {
    try {
      this.plantService.searchPlantAPI(this.queryWord).subscribe((plants: Plant[]) => {
        this.foundedPlantsFromAPI = plants;

        if (this.foundedPlantsFromAPI.length > 0) {
          this.messageService.add(
            `PlantAddComponent: found ${this.foundedPlantsFromAPI.length} plants in the API.`
          );
        } else {
          this.notFoundMessage = "🔮No plants with given query word were found in the API.";
          this.messageService.add(
            `PlantAddComponent: No plants with given query word were found in the API.`
          );
        }
      });
    } catch (error) {
      `PlantAddComponent: error finding plants in the API.`
    }
  }

  onBack(): void {
    this.location.back();
  }

  /**
   * Preconditions:
   *      @param selectedPlant is a valid plant object from the API, selected by the user from the dropdown.
   *      The plant onSearchAdd() method must be called before, in order to have some plants with valid id to choose from.
   *
   * Postcondition:
   *      The method will set this.plant to all details got from the API. But, the API won't give as the date and the
   *     amount, and for that we will set them by default to current date, instigating a new Date and the amount to 1.
   */
  onSelect(selectedPlant: Plant): void {
    this.plantService.getAllPlantDetailsFromAPI(selectedPlant.id).subscribe((plantFromAPI) => {
      this.plant = plantFromAPI;
      this.plant.inFamilySince = new Date();
      this.plant.amount = 1;
    });
  }

  resetQueryAndMessage() {
    this.queryWord = "";
    this.notFoundMessage = "";
  }

  resetFoundedPlantsFromAPI() {
    this.foundedPlantsFromAPI = [];
  }

}
