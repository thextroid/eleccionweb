import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import { barChartOptions } from "../templateChartOptions/barChartOptions";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnChanges {
  @Input() bardata: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "chart";
  chartOptions: Highcharts.Options;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.bardata);
    this.chartOptions = {
      ...barChartOptions,
      series: [
        {
          type: "column",
          colorByPoint: true,
          data: this.bardata,
        },
      ],
    };
  }
}
