import { Component } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ghopital';
}
