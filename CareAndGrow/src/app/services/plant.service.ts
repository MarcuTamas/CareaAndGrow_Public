import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessagesService} from "./messages.service";
import {Plant} from "../models/plant";
import {HttpClient} from "@angular/common/http";
import {PLANTS} from "../../mockObject/mock-plants";
import {PrivacyService} from "./privacy.service";

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plantsKey = 'plants';
  private plants: Plant[] = [];
  private privacyConsent: boolean = this.privacyService.getPrivacyConsent();

  constructor(private messagesService: MessagesService, private privacyService: PrivacyService, private httpClient: HttpClient) {

    console.log(this.privacyConsent)

    if(this.privacyConsent){
      this.getPlantsFromLocalStorage();
      this.initializeMockPlants();
    }

  }

  private getPlantsFromLocalStorage(){
    const plants = localStorage.getItem(this.plantsKey)
    if(plants){
      this.plants = JSON.parse(plants);
    }
  }

  private setPlantsFromLocalStorage(){
    if(this.privacyConsent){
      localStorage.setItem(this.plantsKey, JSON.stringify(this.plants));
    }
  }

  private initializeMockPlants() {
    const plantsFromLocalStorage = localStorage.getItem(this.plantsKey);
    if (plantsFromLocalStorage) {
      this.plants = JSON.parse(plantsFromLocalStorage);
    } else {
      // Populate plants array with mock plants
      this.plants = PLANTS;

      // Store plants in local storage
      localStorage.setItem(this.plantsKey, JSON.stringify(this.plants));
    }
  }

  getPlants(): Observable<Plant[]> {
    const plants = of(this.plants);
    return plants;
  }

  getPlant(id: number): Observable<Plant> {
    const plant = this.plants.find((h) => h.id === id) as Plant;
    this.messagesService.add(
      `PlantService: fetched plant id=${id} - ${Date.now()}`
    );
    return of(plant);
  }

  addPlant(plant?: Plant): Observable<Plant> {

    if (!plant || !plant.id || plant.id <= 0) {
      this.messagesService.add(
        `PlantService: plant is undefined - ${Date.now()}`
      );
      throw new Error('Plant is undefined');
    }

    //Converting the id to a number, in case it is a string.
        //It is very helpful because the API could send us a string gormat.
    plant.id = +plant.id;

    //ID check to be unique.
    if (this.plants.find((h) => h.id === plant.id)) {
      this.messagesService.add(
        `PlantService: plant with id=${plant.id} already exists - ${Date.now()}`
      );
      throw new Error('Plant with this id already exists');
    }

    this.plants.push(plant);
    this.setPlantsFromLocalStorage();


    this.messagesService.add(
      `PlantService: added plant id=${plant.id} - ${Date.now()}`
    );

    return of(plant);
  }

  /**
   * Preconditions:
   *  PlantToBeUpdated is a valid plant to pass through the updated method, even at the first sight it could be undefined,
   * because in the method uth the first if we will check not to be undefined. We had to do this, because plant-details
   * method is based on plant-details which can have at first an undefined plant. But how the app it is now, the updated
   * method will not be called before the plant-detail-update component have got a valid plant. Mor exactly, by default
   * the use will choose an existing plant to be updated.
   *
   * @param plantToBeUpdated it is a valid plant.
   *
   * Postconditions:
   *  The method will search for the plant index which will be updated, and will pass there the modified plant. It will
   * return an observable of plant too.
   *
   * {Personal notice: I used the delete and add methods (from add only to check the plant not to be undefined) to make
   * the update}.
   *
   */
  updatePlant(plantToBeUpdated?: Plant): Observable<Plant> {

    //We had to check if plant is unified first.
    if (!plantToBeUpdated) {
      this.messagesService.add(
        `PlantService: plant is undefined - ${Date.now()}`
      );
      throw new Error('Plant is undefined');
    }

    plantToBeUpdated.id = +plantToBeUpdated.id;

    const plantIndex = this.plants.findIndex((foundedPlant) => foundedPlant.id === plantToBeUpdated.id);
    console.log("Plant index:" + plantIndex);

    //Check if the plant exist in the array.
    if (plantIndex === -1) {
      this.messagesService.add(
        `PlantService: plant with id=${plantToBeUpdated.id} does not exist - ${Date.now()}`
      );
      throw new Error('Plant with this id does not exist');
    }

    this.plants[plantIndex] = plantToBeUpdated;
    this.setPlantsFromLocalStorage();

    this.messagesService.add(
      `PlantService: updated plant with id ${plantToBeUpdated.id} - ${Date.now()}`
    );

    return of(plantToBeUpdated);
  }

  deletePlant(plantID: number): Observable<void> {
    const plantIndex = this.plants.findIndex((h) => h.id === plantID);
    if (plantIndex === -1) {
      this.messagesService.add(
        `PlantService: plant with id=${plantID} does not exist - ${Date.now()}`
      );
      throw new Error('Plant with this id does not exist');
    }
    this.plants.splice(plantIndex, 1);
    this.setPlantsFromLocalStorage();

    this.messagesService.add(
      `PlantService: deleted plant id=${plantID} - ${Date.now()}`
    );

    return of(undefined);
  }

  /**
   * Precondition:
   * @param queryWord is a valid string used to search in the rest API.
   * Postcondition:
   * The function will return on observable of (that emits) an array of Plant[] objects, found by the query word in
   * the rest API. If the array is 0 it presumes that no plants with given query word were found.
   *      We have to use observe.next(data.data) because the API will return an array of objects.
   *      !!!The plants will not be returned will all needed details and because of this we made another method, that
   *      will get all of them from the API by the ID.
   */
  searchPlantAPI(queryWord: string): Observable<Plant[]> {
    return new Observable<Plant[]>((observer) => {
      this.httpClient
        .get<Plant[]>('https://perenual.com/api/species-list?#ApiKey' + queryWord)
        .subscribe((data: any) => {
          observer.next(data.data);
          observer.complete();
          console.log(data)
          this.messagesService.add(
            `PlantService: fetched ${data.data.length} plants in rest API. - ${Date.now()}`
          );
        });
    });
  }

  /**
   * Precondition:
   * @param plantID is a valid plant id number from the API. The condition will be always true in our case, because
   * we will get the id directly from plants which were searched before in the API. More exactly, in the plan-add
   * component we will call this method on the selected plant from a list of founded plants in the API.
   *
   * Postcondition:
   * This method will return an observable of plant founded by the plant ID.
   */
  getAllPlantDetailsFromAPI(plantID: number): Observable<Plant>{
    return new Observable<Plant>((observer) => {
      this.httpClient
        .get<Plant>('https://perenual.com/api/species/details/'+ plantID +'#ApiKey')
        .subscribe((data: any) => {
          observer.next(data);
          observer.complete();
          console.log(data)
          this.messagesService.add(
            `PlantService: fetched plant with id ${data.id} in rest API. - ${Date.now()}`
          );
        });
    });
  }

  getPlantsNumber(): number{
    return this.plants.length;
  }

  getPlantsID(): number[] {
    let plantsID: number[] = [];

    this.plants.forEach((plant: Plant) => {
      plantsID.push(plant.id);
    });

    if(plantsID.length > 0){
      return plantsID;
    }

    this.messagesService.add(
      `PlantService: plants id array is empty - ${Date.now()}`
    );

    throw Error(`PlantService: plants id array is empty - ${Date.now()}`);
  }

}
