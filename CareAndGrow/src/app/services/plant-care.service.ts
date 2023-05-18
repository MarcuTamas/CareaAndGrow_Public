import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessagesService} from "./messages.service";
// import {CARES} from "../../mockObject/mock-plantCare";
import {PlantCare} from "../models/plantCare";
import {PlantService} from "./plant.service";
import {Plant} from "../models/plant";
import {PLANTS} from "../../mockObject/mock-plants";
import {CARES} from "../../mockObject/mock-plantCare";
import {PrivacyService} from "./privacy.service";

@Injectable({
  providedIn: 'root'
})
export class PlantCareService {

  private plantsCareKey = 'plantsCare';
  private plantsCare: PlantCare[] = [];
  private privacyConsent: boolean = this.privacyService.getPrivacyConsent();


  constructor(private messagesService: MessagesService, private privacyService: PrivacyService, private plantService: PlantService) {
    if (this.privacyConsent) {
      this.getPlantsCareFromLocalStorage();
      this.initializeMockPlantsCare();
    }
  }


  private getPlantsCareFromLocalStorage() {
    const plantsCare = localStorage.getItem(this.plantsCareKey)

    if (plantsCare) {
      this.plantsCare = JSON.parse(plantsCare);
    }
  }

  private setPlantsCareFromLocalStorage() {
    if(this.privacyConsent){
      localStorage.setItem(this.plantsCareKey, JSON.stringify(this.plantsCare));
    }
  }

  private initializeMockPlantsCare() {
    const plantsCareFromLocalStorage = localStorage.getItem(this.plantsCareKey);
    if (plantsCareFromLocalStorage) {
      this.plantsCare = JSON.parse(plantsCareFromLocalStorage);
    } else {
      // Populate plants array with mock plants
      this.plantsCare = CARES;

      // Store plants in local storage
      localStorage.setItem(this.plantsCareKey, JSON.stringify(this.plantsCare));
    }
  }

  getPlantsCare(): Observable<PlantCare[]> {
    const plantsCare = of(this.plantsCare);
    return plantsCare;
  }

  getPlantCare(id: number): Observable<PlantCare> {
    const plantCare = this.plantsCare.find((h) => h.id === id) as PlantCare;
    this.messagesService.add(
      `PlantCareService: fetched plant care id=${id} - ${Date.now()}`
    );
    return of(plantCare);
  }

  addPlantCare(plantCare?: PlantCare): Observable<PlantCare> {
    if (!plantCare || !plantCare.id) {
      this.messagesService.add(
        `PlantCareService: plant care is undefined - ${Date.now()}`
      );
      throw new Error('Plant is undefined');
    }

    plantCare.id = +plantCare.id;
    plantCare.plantID = +plantCare.plantID;

    if (this.plantsCare.find((h) => h.id === plantCare.id)) {
      this.messagesService.add(
        `PlantCareService: plant care with id=${plantCare.id} already exists - ${Date.now()}`
      );
      throw new Error('Plant care with this id already exists');
    }

    //Checking if any plant with given ID exist or not.
    if (!this.getAllPlantsID().find((n) => n === plantCare.plantID)) {
      this.messagesService.add(
        `PlantCareService: plant to be care with id ${plantCare.id} dose not exists - ${Date.now()}`
      );
      throw new Error('Plant to be care dose not exit');
    }

    this.plantsCare.push(plantCare);
    this.setPlantsCareFromLocalStorage();
    this.messagesService.add(
      `PlantCareService: added plant care id=${plantCare.id} - ${Date.now()}`
    );
    return of(plantCare);
  }

  updatePlantCare(plantCareToBeUpdated?: PlantCare): Observable<PlantCare> {

    //We had to check if plant is undefined first.
    if (!plantCareToBeUpdated) {
      this.messagesService.add(
        `PlantCareService: plant care is undefined - ${Date.now()}`
      );
      throw new Error('Plant care is undefined');
    }

    plantCareToBeUpdated.id = +plantCareToBeUpdated.id;
    plantCareToBeUpdated.plantID = +plantCareToBeUpdated.plantID;

    const plantCareIndex = this.plantsCare.findIndex((foundedPlantCare) =>
      foundedPlantCare.id === plantCareToBeUpdated.id);

    //Check if the plantCare exist in the array.
    if (plantCareIndex === -1) {
      this.messagesService.add(
        `PlantCareService: plant care with id ${plantCareToBeUpdated.id} does not exist - ${Date.now()}`
      );
      throw new Error('Plant care with this id does not exist');
    }

    //Checking if any plant with given ID exist or not.
    if (!this.getAllPlantsID().find((n) => n === plantCareToBeUpdated.plantID)) {
      this.messagesService.add(
        `PlantCareService: plant to be care with id ${plantCareToBeUpdated.id} dose not exists - ${Date.now()}`
      );
      throw new Error('Plant to be care dose not exit');
    }

    this.plantsCare[plantCareIndex] = plantCareToBeUpdated;
    this.setPlantsCareFromLocalStorage();
    this.messagesService.add(
      `PlantCareService: updated plant care with id ${plantCareToBeUpdated.id} - ${Date.now()}`
    );

    return of(plantCareToBeUpdated);
  }

  deletePlantCare(plantID: number): Observable<void> {
    const plantCareIndex = this.plantsCare.findIndex((h) => h.id === plantID);
    if (plantCareIndex === -1) {
      this.messagesService.add(
        `PlantCareService: plant care with id=${plantID} does not exist - ${Date.now()}`
      );
      throw new Error('Plant care with this id does not exist');
    }

    this.plantsCare.splice(plantCareIndex, 1);
    this.setPlantsCareFromLocalStorage();
    this.messagesService.add(
      `PlantCareService: deleted plant care id=${plantID} - ${Date.now()}`
    );

    return of(undefined);
  }

  getPlantDetails(plantCare: PlantCare): Observable<Plant> {
    return this.plantService.getPlant(plantCare.plantID);
  }

  getPlantsCareNumber(): number {
    return this.plantsCare.length;
  }

  getAllPlantsID(): number[] {
    const plantsID = this.plantService.getPlantsID();

    if (plantsID) {
      return plantsID;
    }

    this.messagesService.add(
      `PlantCareService:  error fetching any plant id - ${Date.now()}`
    );

    throw Error('PlantCareService: error fetching any plant id.')
  }
}
