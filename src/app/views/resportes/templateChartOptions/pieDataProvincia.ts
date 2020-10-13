import { piePresidencial } from "./piePresidencial";
export const pieDataProvincia = Object.assign(Object.create(piePresidencial), {
  setDataPie(dataChart: any) {
    this.pieProvinciaData = dataChart;
  },
});
