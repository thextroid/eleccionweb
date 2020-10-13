const pieChartLabels = [
  "CREEMOS",
  "ADN",
  "MASIPSP",
  "FPV",
  "PANBOL",
  "LIBRE21",
  "CC",
];
export const barChartOptions = {
  chart: {
    type: "column",
    inverted: true,
  },
  title: {
    text: "Pesidencial",
  },
  subtitle: {
    text: "Vista Columnas",
  },
  xAxis: {
    categories: pieChartLabels,
  },
  yAxis: {
    title: {
      text: "Total Porcentaje",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 5,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}%",
      },
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
  },
};
