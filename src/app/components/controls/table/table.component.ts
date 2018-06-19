import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})

export class TableComponent implements OnInit {
    @Input() icon: string;
    // Properties
    public title: string;
    constructor(private sanitizer: DomSanitizer) {}
    // Functions
    ngOnInit() {}
}
