import { piePresidencial } from "./piePresidencial";
export const pieDataMunicipio = Object.assign(Object.create(piePresidencial), {
  setDataPie(dataChart: any) {
    this.pieMunicipioData = dataChart;
  },
});
