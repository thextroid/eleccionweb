export const piePresidencial = {
  setDataPie: function setDataPie(dataChart: any) {
    this.piedata = dataChart;
    this.bardata = dataChart;
  },
  pieLabel: function pieLabel(response) {
    return (label) => {
      return {
        name: label,
        y: response[label],
      };
    };
  },
  presidencialData: function presidencialData(
    setData,
    labelCharts,
    election,
    mathRoud
  ) {
    return (response) => {
      if (!response || !response.length) return "Datos vacios";
      this.headerChart = {
        porcentajeActaMesa: mathRoud(
          response[0].actasValidas / response[0].mesas
        ),
        election,
      };
      const chartdata = this.pieChartLabels.map(labelCharts(response[0]));
      setData(chartdata);
    };
  },
};
