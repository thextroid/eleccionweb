import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import * as Highcharts from "highcharts";
import { Options } from "highcharts";
import { pieChartOptions } from "../templateChartOptions/pieChartOptions";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements AfterContentInit {
  @Input() piedata: any[];
  @Input() headerChart: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "chart";
  chartOptions: Highcharts.Options;
  updateButton: any;
  updateFlag = true;
  chart: any;
  chartCallback = this.callBackChart.bind(this);
  constructor() {}
  ngAfterContentInit() {
    this.loadOptions();
  }
  loadOptions() {
    // console.log(this.piedata);
    this.chartOptions = {
      ...pieChartOptions,
      series: [
        {
          type: "pie",
          data: this.piedata,
        },
      ],
    };
  }
  updateChart() {
    console.log("button... ");
  }
  callBackChart(chart) {
    if (this.headerChart) {
      const { porcentajeActaMesa, election } = this.headerChart;
      chart.setTitle({ text: `${election} al ${porcentajeActaMesa}%` });
    }
    chart.renderer
      .button("Actualizar", 10, 10, () => {
        // if (chart.series[0].type == "pie") {
        //   chart.update({
        //   });
        //   // chart.series[0].remove();
        // }
      })
      .add();
  }
}
