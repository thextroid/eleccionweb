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
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnChanges {
  @Input() linedata: any;
  Highcharts: typeof Hightcharts = Hightcharts;
  chartConstructor = "chart";
  chartOptions: Options;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.linedata.mesas);
    this.chartOptions = {
      chart: {
        type: "line",
      },
      title: {
        text: "Mesas/Partidos",
      },
      xAxis: [
        {
          categories: this.linedata.mesas,
          crosshair: true,
        },
      ],
      series: this.linedata.partidos,
    };
  }
}
