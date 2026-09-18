import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  titulo = 'Talleres disponibles';
  readonly MAX_TALLERES = 2;

  talleres = [
    { id: 1, nombre: 'Introduccion a HTML', duracion: '2 horas' },
    { id: 2, nombre: 'CSS Basico', duracion: '3 horas' },
    { id: 3, nombre: 'JavaScript', duracion: '4 horas' },
    { id: 4, nombre: 'Angular', duracion: '4 horas' },
    { id: 5, nombre: 'React', duracion: '5 horas' },
  ];

  inscritos = signal<number[]>([]);

  talleresInscritos = computed(() =>
    this.talleres.filter(t => this.inscritos().includes(t.id))
  );

  limiteAlcanzado = computed(() => this.inscritos().length >= this.MAX_TALLERES);

  inscribirse(id: number): void {
    if (this.inscritos().includes(id)) {
      return;
    }

    if (this.limiteAlcanzado()) {
      return;
    }

    this.inscritos.update(actuales => [...actuales, id]);
  }

  cancelarInscripcion(id: number): void {
    this.inscritos.update(actuales => actuales.filter(x => x !== id));
  }

  cancelarTodas(): void {
    this.inscritos.set([]);
  }
}