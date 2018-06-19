import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})

export class CardComponent implements OnInit {
    @Input() icon: string;
    // Properties
    public title: string;
    constructor(private sanitizer: DomSanitizer) {}
    // Functions
    ngOnInit() {}
}
