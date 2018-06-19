import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  // tslint:disable-next-line:component-selector
selector: 'panel',
  templateUrl: './panel.html',
  styleUrls: ['./panel.scss']
})

export class PanelComponent implements OnInit {
   // Properties
   @Input() show: Boolean;
   @Input() type: string;
   @Input() title: string;
   @Input() subtitle: string;
   @Input() size: string;
   @Input() showHeader: Boolean = true;
   @Input() showFooter: Boolean = true;
   @Input() showCloseHeader: Boolean = true;

   @Output() doClose: EventEmitter<any> = new EventEmitter();

   private enableOverlay: Boolean = false;
   private types = types;
   private sizes = sizes;

    constructor(private sanitizer: DomSanitizer) {}

    // Functions
    ngOnInit() {
      this.show = this.show || false;
      this.type = this.type || 'basic';
      this.size = this.size || 'small';
      this.setupType();
    }

    onClose(event: any) {
      event.stopPropagation();
      this.enableOverlay = false;
      this.show = false;
      this.doClose.emit(this.show);
      console.log('onClose');
    }

    private setupType() {
      if ( this.type === types[0]) {
        this.showHeader = false;
        this.showFooter = false;
        this.showCloseHeader = false;
        this.enableOverlay = false;
      }
      if ( this.type === types[1]) {
        this.showHeader = true;
        this.showFooter = true;
        this.showCloseHeader = true;
        this.enableOverlay = false;
      }
      if ( this.type === types[2] || this.type === types[3] || this.type === types[4]) {
        this.showHeader = true;
        this.showFooter = false;
        this.showCloseHeader = true;
        this.enableOverlay = true;
      }
    }

}

const types = ['basic', 'modal', 'panel-float', 'panel-float left', 'panel-float right'];
const sizes = ['small', 'medium', 'large', 'full'];
