import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../core/services/curriculo.service';

@Component({
  standalone: true,
  selector: 'app-curriculo-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './curriculo-detail.html',
  styleUrls: ['./curriculo-detail.scss'],
})
export class CurriculoDetail implements OnInit {
  public curriculo?: Curriculo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private curriculoService: CurriculoService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.curriculoService.getCurriculoById(Number(idParam)).subscribe((data) => {
        this.curriculo = data;
      });
    }
  }

  back(): void {
    this.router.navigate(['/curriculos']);
  }
}
