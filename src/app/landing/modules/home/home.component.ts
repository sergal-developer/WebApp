import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/services.data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
  public labelButtonLogin: String = 'Enter the app';
  public showAutentication: boolean;
    constructor() { }
    // Functions
    ngOnInit() { }

    toggleAuteticationPop() {
      this.showAutentication = this.showAutentication ? false : true;
      this.labelButtonLogin = this.showAutentication ? 'Cancel' : 'Enter the app';
    }
}
