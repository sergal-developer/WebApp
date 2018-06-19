import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'svg-item',
  templateUrl: './svg-item.html',
  styleUrls: ['./svg-item.scss']
})

export class SvgItemComponent implements OnInit, OnChanges {
    @Input() icon: string;
    @Input() style: string;
    @Input() width: string;
    @Input() height: string;
    @Input() size: string;
    @Input() path?: string;
    @Input() isImage?: boolean;
    // Properties
    public symbolDefinitionPath = '/app/resources/svg/symbol-defs.svg';
    public description: string;
    public title: string;
    public href: string;
    public show: boolean;
    public className: string;
    public imageStyle: any;

    constructor(private sanitizer: DomSanitizer) {}

    // Functions
    ngOnInit() {
      if (this.size) {
        this.width = this.height = this.size;
      }
      if ( this.path ) {
        this.href = this.path;
        this.imageStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${ this.width }; height:${ this.height }`);
        console.log('this.imageStyle: ', this.imageStyle);
     } else if (this.icon) {
        this.className = this.style || 'icon-black';
        this.href = `${this.symbolDefinitionPath}#${this.icon}`;
      }
    }

    ngOnChanges(changes: any) {
        if (changes) {
            if (changes.path) {
                this.path = changes['path'].currentValue;
                this.href = this.path;
            }
        }
    }
}
