import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../core/services/curriculo.service';

@Component({
  standalone: true,
  selector: 'app-curriculo-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './curriculo-list.html',
  styleUrls: ['./curriculo-list.scss'],
})
export class CurriculoList implements OnInit {
  public curriculos: Curriculo[] = [];
  public meuCurriculo?: Curriculo;
  private usuarioId = 1;

  constructor(private curriculoService: CurriculoService, public router: Router) {}

  ngOnInit(): void {
    this.loadCurriculos();
    this.loadMeuCurriculo();
  }

  private loadCurriculos(): void {
    this.curriculoService.getCurriculos().subscribe((data) => {
      this.curriculos = data;
    });
  }

  private loadMeuCurriculo(): void {
    this.curriculoService.getCurriculoByUsuarioId(this.usuarioId).subscribe((data) => {
      this.meuCurriculo = data.length ? data[0] : undefined;
    });
  }

  editCurriculo(curriculo: Curriculo): void {
    this.router.navigate(['/curriculos/editar', curriculo.id]);
  }

  viewCurriculo(curriculo: Curriculo): void {
    if (curriculo.id) this.router.navigate(['/curriculos', curriculo.id]);
  }

  deleteCurriculo(id?: number | string): void {
    if (id === undefined || id === null) return;
    if (!window.confirm('Deseja remover este currículo?')) {
      return;
    }
    this.curriculoService.deleteCurriculo(id).subscribe(() => {
      window.alert('Currículo removido com sucesso.');
      this.loadCurriculos();
      this.loadMeuCurriculo();
    });
  }
}
