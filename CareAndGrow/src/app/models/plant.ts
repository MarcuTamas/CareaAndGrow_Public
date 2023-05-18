export interface Plant {
  id: number;
  name?: string;
  common_name: string;
  scientific_name: string;
  family?: string;
  watering: string;
  sunlight: string[];
  propagation: string[];
  flowers?: boolean;
  care_level?: string;
  growth_rate: string;

  //Object field.
  default_image: {
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };

  amount: number;
  inFamilySince: Date;
}
