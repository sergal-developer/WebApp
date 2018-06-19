import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss']
})

export class BreadcrumbComponent implements OnInit {
    @Input() icon: string;
    // Properties
    public title: string;
    constructor(private sanitizer: DomSanitizer) {}
    // Functions
    ngOnInit() {}
}
