export interface PlantCare {
  id: number;
  plantID: number;

  isWatered: boolean;
  isFertilized: boolean;
  hasSpecialTreatment: boolean;

  careDate: Date;
}
