import { piePresidencial } from "./piePresidencial";
export const barPresidencial = Object.assign(Object.create(piePresidencial), {
  setDataPie(dataChart: any) {
    this.bardata = dataChart;
  },
});
