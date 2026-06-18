import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './view/fragmentos/header/header';
import { Footer } from './view/fragmentos/footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('sa-rh-completo');
}
