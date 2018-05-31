import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  selectedValue: String = '';
  items = [
    { value: '0', view: 'zero' },
    { value: '1', view: 'one' },
    { value: '2', view: 'Two' }
  ];

  multi = multi;
  showDelayData: Boolean = false;
  showChart: Boolean = false;
  existData: Boolean = false;
  dataLoading = false;
  chart: any = {
    view: null,
    showXAxis: true,
    showYAxis: true,
    gradient: true,
    showLegend: false,
    showXAxisLabel: false,
    xAxisLabel: 'Devices',
    showYAxisLabel: false,
    yAxisLabel: 'Consumption',
    colorScheme: {
      domain: ['#eb925e', '#DEC4A1', '#A9E1BF', '#82B6C7', '#ded61d', '#e06363', '#138098' ]
    },
    autoScale: true,
  };

  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }
}



const multi = [
  {
    'name': 'Temperature',
    'series': [
      { 'value': 11, 'name': '2018-01-01' },
      { 'value': 21, 'name': '2018-01-05' },
      { 'value': 15, 'name': '2018-01-10' },
      { 'value': 18, 'name': '2018-01-15' },
      { 'value': 20, 'name': '2018-01-20' },
      { 'value': 22, 'name': '2018-01-25' },
      { 'value': 25, 'name': '2018-01-28' },
      { 'value': 23, 'name': '2018-02-01' },
      { 'value': 21, 'name': '2018-02-05' },
      { 'value': 17, 'name': '2018-02-10' },
      { 'value': 16, 'name': '2018-02-15' },
      { 'value': 28, 'name': '2018-02-20' },
      { 'value': 29, 'name': '2018-02-25' },
      { 'value': 18, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Light',
    'series': [
      { 'value': 61, 'name': '2018-01-01' },
      { 'value': 51, 'name': '2018-01-05' },
      { 'value': 71, 'name': '2018-01-10' },
      { 'value': 41, 'name': '2018-01-15' },
      { 'value': 61, 'name': '2018-01-20' },
      { 'value': 41, 'name': '2018-01-25' },
      { 'value': 32, 'name': '2018-01-28' },
      { 'value': 56, 'name': '2018-02-01' },
      { 'value': 87, 'name': '2018-02-05' },
      { 'value': 65, 'name': '2018-02-10' },
      { 'value': 75, 'name': '2018-02-15' },
      { 'value': 82, 'name': '2018-02-20' },
      { 'value': 51, 'name': '2018-02-25' },
      { 'value': 10, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Humidity',
    'series': [
      { 'value': 37, 'name': '2018-01-01' },
      { 'value': 47, 'name': '2018-01-05' },
      { 'value': 57, 'name': '2018-01-10' },
      { 'value': 37, 'name': '2018-01-15' },
      { 'value': 17, 'name': '2018-01-20' },
      { 'value': 7, 'name': '2018-01-25' },
      { 'value': 77, 'name': '2018-01-28' },
      { 'value': 17, 'name': '2018-02-01' },
      { 'value': 47, 'name': '2018-02-05' },
      { 'value': 77, 'name': '2018-02-10' },
      { 'value': 27, 'name': '2018-02-15' },
      { 'value': 87, 'name': '2018-02-20' },
      { 'value': 17, 'name': '2018-02-25' },
      { 'value': 2, 'name': '2018-02-28' }
    ]
  },

  {
    'name': 'Preasure',
    'series': [
      { 'value': 100, 'name': '2018-01-01' },
      { 'value': 130, 'name': '2018-01-05' },
      { 'value': 150, 'name': '2018-01-10' },
      { 'value': 180, 'name': '2018-01-15' },
      { 'value': 110, 'name': '2018-01-20' },
      { 'value': 60, 'name': '2018-01-25' },
      { 'value': 70, 'name': '2018-01-28' },
      { 'value': 10, 'name': '2018-02-01' },
      { 'value': 30, 'name': '2018-02-05' },
      { 'value': 70, 'name': '2018-02-10' },
      { 'value': 190, 'name': '2018-02-15' },
      { 'value': 10, 'name': '2018-02-20' },
      { 'value': 109, 'name': '2018-02-25' },
      { 'value': 110, 'name': '2018-02-28' }
    ]
  },
  {
    'name': 'Electricity',
    'series': [
      { 'value': 123, 'name': '2018-01-01' },
      { 'value': 543, 'name': '2018-01-05' },
      { 'value': 612, 'name': '2018-01-10' },
      { 'value': 12, 'name': '2018-01-15' },
      { 'value': 213, 'name': '2018-01-20' },
      { 'value': 123, 'name': '2018-01-25' },
      { 'value': 340, 'name': '2018-01-28' },
      { 'value': 234, 'name': '2018-02-01' },
      { 'value': 65, 'name': '2018-02-05' },
      { 'value': 214, 'name': '2018-02-10' },
      { 'value': 654, 'name': '2018-02-15' },
      { 'value': 173, 'name': '2018-02-20' },
      { 'value': 10, 'name': '2018-02-25' },
      { 'value': 634, 'name': '2018-02-28' }
    ]
  },
  {
    'name': 'Infrared',
    'series': [
      { 'value': 300, 'name': '2018-01-01' },
      { 'value': 123, 'name': '2018-01-05' },
      { 'value': 151, 'name': '2018-01-10' },
      { 'value': 218, 'name': '2018-01-15' },
      { 'value': 240, 'name': '2018-01-20' },
      { 'value': 422, 'name': '2018-01-25' },
      { 'value': 225, 'name': '2018-01-28' },
      { 'value': 213, 'name': '2018-02-01' },
      { 'value': 621, 'name': '2018-02-05' },
      { 'value': 117, 'name': '2018-02-10' },
      { 'value': 316, 'name': '2018-02-15' },
      { 'value': 128, 'name': '2018-02-20' },
      { 'value': 629, 'name': '2018-02-25' },
      { 'value': 118, 'name': '2018-02-28' }
    ]
  },
  {
    'name': 'Water',
    'series': [
      { 'value': 0, 'name': '2018-01-01' },
      { 'value': 26, 'name': '2018-01-05' },
      { 'value': 21, 'name': '2018-01-10' },
      { 'value': 16, 'name': '2018-01-15' },
      { 'value': 99, 'name': '2018-01-20' },
      { 'value': 12, 'name': '2018-01-25' },
      { 'value': 44, 'name': '2018-01-28' },
      { 'value': 65, 'name': '2018-02-01' },
      { 'value': 82, 'name': '2018-02-05' },
      { 'value': 34, 'name': '2018-02-10' },
      { 'value': 27, 'name': '2018-02-15' },
      { 'value': 87, 'name': '2018-02-20' },
      { 'value': 53, 'name': '2018-02-25' },
      { 'value': 65, 'name': '2018-02-28' }
    ]
  }
];
