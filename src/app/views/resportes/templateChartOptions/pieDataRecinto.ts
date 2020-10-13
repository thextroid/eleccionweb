import { piePresidencial } from "./piePresidencial";
export const pieDataRecinto = Object.assign(Object.create(piePresidencial), {
  setDataPie(dataChart: any) {
    this.pieRecintoData = dataChart;
  },
});
