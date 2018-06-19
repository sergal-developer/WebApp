import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
selector: 'chart',
  templateUrl: './chart.html',
  styleUrls: ['./chart.scss']
})

export class ChartComponent implements OnInit {
    @Input() showXAxis: Boolean;
    @Input() showYAxis: Boolean;
    @Input() gradient: Boolean;
    @Input() showLegend: Boolean;
    @Input() showXAxisLabel: Boolean;
    @Input() xAxisLabel: string;
    @Input() showYAxisLabel: Boolean;
    @Input() yAxisLabel: string;
    @Input() view: any[];
    @Input() data: Array<any>;
    @Input() colors: Array<string>;
    @Input() type: string;

    private colorScheme: any = {
      domain: []
    };
    // Properties
    constructor(private sanitizer: DomSanitizer) {
      this.showXAxis = this.showXAxis || false;
      this.showYAxis = this.showYAxis || false;
      this.gradient = this.gradient || false;
      this.showLegend = this.showLegend || false;
      this.showXAxisLabel = this.showXAxisLabel || false;
      this.xAxisLabel = this.xAxisLabel || 'Country';
      this.showYAxisLabel = this.showYAxisLabel || false;
      this.yAxisLabel = this.yAxisLabel || 'Population';
      this.view = this.view;
      this.colors = this.colors || ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
      this.colorScheme.domain = this.colors;
    }
    // Functions
    ngOnInit() {
    }

    onSelect(event: any) {
      console.log(event);
    }
}
