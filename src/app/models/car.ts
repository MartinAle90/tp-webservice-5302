export interface CarMake {
  id: string | number; // Algunas APIs usan números, otras strings
  name: string;
}

export interface CarModel {
  id: string | number;
  make_id: string | number;
  name: string;
}