import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CurriculoService } from '../../core/services/curriculo.service';
import { Curriculo } from '../../model/curriculo.model';

@Component({
  standalone: true,
  selector: 'app-curriculo-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './curriculo-form.html',
  styleUrls: ['./curriculo-form.scss'],
})
export class CurriculoForm implements OnInit {
  public curriculoForm: FormGroup;
  public isEditMode = false;
  public curriculoId?: number;
  private usuarioId = 1;

  constructor(
    private fb: FormBuilder,
    private curriculoService: CurriculoService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.curriculoForm = this.fb.group({
      nome: ['', Validators.required],
      formacao: ['', Validators.required],
      experiencia: ['', Validators.required],
      habilidades: ['', Validators.required],
      linkedin: ['', [Validators.required, Validators.pattern('https?://.+')]],
      resumo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.curriculoId = Number(idParam);
      this.isEditMode = true;
      this.curriculoService.getCurriculoById(this.curriculoId).subscribe((curriculo) => {
        this.curriculoForm.patchValue(curriculo);
      });
    }
  }

  submit(): void {
    if (this.curriculoForm.invalid) {
      window.alert('Preencha todos os campos corretamente antes de salvar.');
      return;
    }

    const curriculo: Curriculo = {
      ...this.curriculoForm.value,
      usuarioId: this.usuarioId,
      id: this.curriculoId,
    };

    const operation = this.isEditMode
      ? this.curriculoService.putCurriculo(curriculo)
      : this.curriculoService.postCurriculo(curriculo);

    operation.subscribe({
      next: () => {
        window.alert('Currículo salvo com sucesso.');
        this.router.navigate(['/meu-curriculo']);
      },
      error: () => {
        window.alert('Não foi possível salvar o currículo. Tente novamente.');
      },
    });
  }
}
