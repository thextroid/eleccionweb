import { piePresidencial } from "./piePresidencial";
export const lineDataWiner = Object.assign(Object.create(piePresidencial), {
  setDataLine: function setDataLine(dataChart: any) {
    this.linedata.partidos = dataChart;
  },
  lineLabel: function lineLabel(response) {
    this.linedata.mesas = response.listMesas;
    return (label) => {
      return {
        name: label,
        data: response[label],
        type: undefined,
      };
    };
  },
});
