import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import * as Hightcharts from "highcharts";
import { Options } from "highcharts";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnChanges {
  @Input() piedata: any[];
  Highcharts: typeof Hightcharts = Hightcharts;
  chartConstructor = "chart";
  chartOptions: Options;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        styledMode: false,
      },
      title: {
        text: "Presidencial",
      },
      tooltip: {
        pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          showInLegend: true,
        },
      },
      series: [{ type: "pie", data: this.piedata }],
    };
  }
}
