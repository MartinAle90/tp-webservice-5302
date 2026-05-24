import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars';
import { CarMake, CarModel } from '../../models/car';

@Component({
  selector: 'app-car-maker',
  imports: [],
  templateUrl: './car-maker.html',
  styleUrl: './car-maker.scss',
})
export class CarMakerComponent implements OnInit{
  // Variables para el Maestro (Marcas)
  makesList: CarMake[] = [];
  isLoadingMakes: boolean = true;

  // Variables para el Detalle (Modelos en el Modal)
  selectedMakeName: string = '';
  modelsList: CarModel[] = [];
  isLoadingModels: boolean = false;

  constructor(private carsService: CarsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.carsService.getMakes().subscribe({
      next: (data) => {
        this.makesList = data;
        this.isLoadingMakes = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando marcas:', err);
        this.isLoadingMakes = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Método que se ejecuta al hacer clic en una marca
  seleccionarMarca(make: CarMake): void {
    this.selectedMakeName = make.name;
    this.modelsList = []; // Limpiamos la lista anterior
    this.isLoadingModels = true;
    this.cdr.detectChanges();

    // Llamamos a la API para traer los modelos
    this.carsService.getModelsByMake(make.id).subscribe({
      next: (data) => {
        this.modelsList = data;
        this.isLoadingModels = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando modelos:', err);
        this.isLoadingModels = false;
        this.cdr.detectChanges();
      }
    });
  }
}